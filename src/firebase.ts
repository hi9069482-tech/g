import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot,
  serverTimestamp,
  Firestore,
  Unsubscribe
} from 'firebase/firestore';

/**
 * Firebase configuration using Vite environment variables (VITE_ prefix for client side).
 * Supports Netlify environment variables or local fallback.
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForPakpattanServices",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pakpattan-services-hub.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pakpattan-services-hub",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pakpattan-services-hub.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456"
};

// Initialize Firebase App singleton
export const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore database instance
export const db: Firestore = getFirestore(app);

// Collection name
export const PROVIDERS_COLLECTION = 'providers';

/**
 * Standardize phone number for unique constraints (digits only)
 */
export function normalizePhone(phone: string): string {
  if (!phone) return '';
  return String(phone).replace(/\D/g, '');
}

/**
 * Check if a provider with the given phone or email already exists in Firestore.
 * Prevents duplicate registrations.
 */
export async function checkProviderExists(phone: string, email?: string): Promise<{ exists: boolean; reason?: string }> {
  try {
    const cleanPhone = normalizePhone(phone);
    if (!cleanPhone) return { exists: false };

    const providersRef = collection(db, PROVIDERS_COLLECTION);

    // 1. Direct check by docId (phone as ID)
    const directDoc = await getDoc(doc(db, PROVIDERS_COLLECTION, cleanPhone));
    if (directDoc.exists()) {
      return { exists: true, reason: 'phone' };
    }

    // 2. Query check by raw phone
    const phoneQuery = query(providersRef, where('phone', '==', phone));
    const phoneSnapshot = await getDocs(phoneQuery);
    if (!phoneSnapshot.empty) {
      return { exists: true, reason: 'phone' };
    }

    // 3. Query check by normalized phone
    const cleanPhoneQuery = query(providersRef, where('normalizedPhone', '==', cleanPhone));
    const cleanPhoneSnapshot = await getDocs(cleanPhoneQuery);
    if (!cleanPhoneSnapshot.empty) {
      return { exists: true, reason: 'phone' };
    }

    // 4. Query check by email if provided
    if (email && String(email).trim()) {
      const emailQuery = query(providersRef, where('email', '==', String(email).trim().toLowerCase()));
      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        return { exists: true, reason: 'email' };
      }
    }

    return { exists: false };
  } catch (error) {
    console.warn('Firestore duplicate check error, checking local fallback storage:', error);
    // Local fallback check if Firestore is temporarily offline
    const local = localStorage.getItem('pakpattan_firebase_providers');
    if (local) {
      try {
        const list = JSON.parse(local);
        const cleanPhone = normalizePhone(phone);
        const found = list.find((p: any) => 
          normalizePhone(p.phone) === cleanPhone || 
          (email && p.email && p.email.toLowerCase() === String(email).trim().toLowerCase())
        );
        if (found) return { exists: true, reason: 'phone' };
      } catch (e) {
        console.error(e);
      }
    }
    return { exists: false };
  }
}

/**
 * Save a new provider to Firestore collection 'providers' with status = 'pending'.
 * Uses normalized phone as document ID for unique constraint.
 */
export async function saveProviderToFirestore(providerData: any): Promise<string> {
  const cleanPhone = normalizePhone(providerData.phone);
  const docId = cleanPhone || `provider_${Date.now()}`;
  
  const payload = {
    ...providerData,
    id: docId,
    normalizedPhone: cleanPhone,
    phone: providerData.phone,
    email: providerData.email ? String(providerData.email).trim().toLowerCase() : '',
    status: 'pending', // REQUIRED: status = "pending"
    applicationStatus: 'pending',
    isPublic: false,
    createdAt: serverTimestamp(),
    submittedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  };

  try {
    const docRef = doc(db, PROVIDERS_COLLECTION, docId);
    await setDoc(docRef, payload, { merge: true });
    console.log('Provider successfully saved to Firestore:', docId);
  } catch (error) {
    console.warn('Firestore write failed, saving to local fallback storage:', error);
    const local = localStorage.getItem('pakpattan_firebase_providers');
    const list = local ? JSON.parse(local) : [];
    const filtered = list.filter((p: any) => p.id !== docId && normalizePhone(p.phone) !== cleanPhone);
    filtered.unshift({ ...payload, createdAt: new Date().toISOString() });
    localStorage.setItem('pakpattan_firebase_providers', JSON.stringify(filtered));
  }

  return docId;
}

/**
 * Approve a provider: update doc status to 'approved' in Firestore
 */
export async function approveProviderInFirestore(docId: string): Promise<void> {
  try {
    const docRef = doc(db, PROVIDERS_COLLECTION, docId);
    await updateDoc(docRef, {
      status: 'approved',
      applicationStatus: 'approved',
      isPublic: true,
      verified: true,
      approvedAt: serverTimestamp()
    });
    console.log('Provider approved in Firestore:', docId);
  } catch (error) {
    console.warn('Firestore updateDoc failed, updating local fallback:', error);
    const local = localStorage.getItem('pakpattan_firebase_providers');
    if (local) {
      const list = JSON.parse(local);
      const updated = list.map((p: any) => p.id === docId ? { ...p, status: 'approved', applicationStatus: 'approved', isPublic: true, verified: true } : p);
      localStorage.setItem('pakpattan_firebase_providers', JSON.stringify(updated));
    }
  }
}

/**
 * Reject a provider: permanently DELETE the document from Firebase Firestore using deleteDoc().
 * Never just hide it from the UI!
 */
export async function rejectProviderFromFirestore(docId: string): Promise<void> {
  try {
    const docRef = doc(db, PROVIDERS_COLLECTION, docId);
    await deleteDoc(docRef);
    console.log('Provider permanently deleted from Firestore:', docId);
  } catch (error) {
    console.warn('Firestore deleteDoc failed:', error);
  }

  // Also remove from local fallback storage
  try {
    const local = localStorage.getItem('pakpattan_firebase_providers');
    if (local) {
      const list = JSON.parse(local);
      const updated = list.filter((p: any) => p.id !== docId && normalizePhone(p.phone) !== normalizePhone(docId));
      localStorage.setItem('pakpattan_firebase_providers', JSON.stringify(updated));
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * Real-time listener for ALL providers (for Admin Dashboard) using onSnapshot.
 * When rejected, it instantly triggers and removes from UI.
 */
export function subscribeAllProviders(callback: (providers: any[]) => void): Unsubscribe {
  try {
    const providersRef = collection(db, PROVIDERS_COLLECTION);
    return onSnapshot(providersRef, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      callback(list);
    }, (error) => {
      console.warn('onSnapshot error on providers collection:', error);
      const local = localStorage.getItem('pakpattan_firebase_providers');
      if (local) {
        try {
          callback(JSON.parse(local));
        } catch (e) {
          callback([]);
        }
      }
    });
  } catch (error) {
    console.warn('subscribeAllProviders error:', error);
    const local = localStorage.getItem('pakpattan_firebase_providers');
    callback(local ? JSON.parse(local) : []);
    return () => {};
  }
}

/**
 * Real-time listener for APPROVED providers (for Home Page & Public Marketplace) using onSnapshot.
 * Fetches all providers from Firebase where status == 'approved'.
 */
export function subscribeApprovedProviders(callback: (providers: any[]) => void): Unsubscribe {
  try {
    const providersRef = collection(db, PROVIDERS_COLLECTION);
    const q = query(providersRef, where('status', '==', 'approved'));
    return onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      callback(list);
    }, (error) => {
      console.warn('onSnapshot error on approved providers:', error);
      const local = localStorage.getItem('pakpattan_firebase_providers');
      if (local) {
        try {
          const list = JSON.parse(local).filter((p: any) => p.status === 'approved');
          callback(list);
        } catch (e) {
          callback([]);
        }
      }
    });
  } catch (error) {
    console.warn('subscribeApprovedProviders error:', error);
    const local = localStorage.getItem('pakpattan_firebase_providers');
    if (local) {
      try {
        const list = JSON.parse(local).filter((p: any) => p.status === 'approved');
        callback(list);
      } catch (e) {
        callback([]);
      }
    } else {
      callback([]);
    }
    return () => {};
  }
}

export default {
  db,
  app,
  firebaseConfig,
  PROVIDERS_COLLECTION,
  normalizePhone,
  checkProviderExists,
  saveProviderToFirestore,
  approveProviderInFirestore,
  rejectProviderFromFirestore,
  subscribeAllProviders,
  subscribeApprovedProviders
};
