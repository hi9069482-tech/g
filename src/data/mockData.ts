import { 
  Category, 
  Village, 
  Provider, 
  SubscriptionPlan, 
  BlogPost, 
  Testimonial,
  AdminProfile,
  ProviderApplication,
  AppNotification
} from '../types';

import plumberImg from '../assets/images/hero_plumber_pakpattan_1790877900146.jpg';
import electricianImg from '../assets/images/hero_electrician_pakpattan_1790877915687.jpg';
import acTechImg from '../assets/images/hero_ac_technician_1790877928397.jpg';
import carpenterImg from '../assets/images/hero_carpenter_pakpattan_1790877942545.jpg';

export const ADMIN_PROFILE: AdminProfile = {
  name: 'Omar Draz Gill',
  contact: '03107217253',
  whatsapp: '03107217253',
  email: 'umarcome347@gmail.com',
  role: 'Super Administrator & Regional Verification Officer',
  office: 'PakPattan Services Hub Central Operations, DHQ Hospital Road, Pakpattan'
};

export const HERO_IMAGES = [
  { id: '1', title: 'Plumbing Services', titleUrdu: 'پلمبنگ سروسز', image: plumberImg, category: 'Plumber' },
  { id: '2', title: 'Certified Electrician', titleUrdu: 'ماہر الیکٹریشن', image: electricianImg, category: 'Electrician' },
  { id: '3', title: 'AC & Cooling Repair', titleUrdu: 'اے سی و ریفریجریٹر', image: acTechImg, category: 'AC & Refrigerator' },
  { id: '4', title: 'Master Carpenter', titleUrdu: 'ماسٹر کارپینٹر', image: carpenterImg, category: 'Carpenter' },
];

export const CATEGORIES: Category[] = [
  {
    id: 'plumber',
    name: 'Plumber',
    nameUrdu: 'پلمبر',
    iconName: 'Wrench',
    providerCount: 38,
    description: 'Pipe fittings, sanitary works, water tanks, leak fixes, motors & borings.',
    descriptionUrdu: 'پائپ فٹنگ، سینیٹری، واٹر ٹینکی، لیکج کی مرمت اور موٹر بورنگ۔',
    popular: true,
  },
  {
    id: 'electrician',
    name: 'Electrician',
    nameUrdu: 'الیکٹریشن',
    iconName: 'Zap',
    providerCount: 46,
    description: 'Wiring, circuit breakers, UPS, solar panels, tube well panels & appliances.',
    descriptionUrdu: 'گھریلو و کمرشل وائرنگ، یو پی ایس، سولر پینل، ٹیوب ویل اور فالٹ درستگی۔',
    popular: true,
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    nameUrdu: 'کارپینٹر',
    iconName: 'Hammer',
    providerCount: 29,
    description: 'Furniture design, door fittings, wooden cabinets, beds, repair & polish.',
    descriptionUrdu: 'لکڑی کا فرنیچر، دروازے، کھڑکیاں، الماریاں اور پالش کا کام۔',
    popular: true,
  },
  {
    id: 'painter',
    name: 'Painter',
    nameUrdu: 'پینٹر',
    iconName: 'Paintbrush',
    providerCount: 24,
    description: 'Interior & exterior wall painting, rockwall, distemper, texture & deco polish.',
    descriptionUrdu: 'گھروں و دکانوں کے لیے اعلیٰ کوالٹی پینٹ، ڈسٹیمپر، راک وال اور ڈیکو پالش۔',
    popular: true,
  },
  {
    id: 'ac-refrigerator',
    name: 'AC & Refrigerator',
    nameUrdu: 'اے سی و فریج',
    iconName: 'Wind',
    providerCount: 32,
    description: 'Inverter AC repair, gas refilling, compressor change, deep freezer servicing.',
    descriptionUrdu: 'انورٹر اے سی، فریزر سروس، گیس چارجنگ، کمپریسر فٹنگ و مینٹیننس۔',
    popular: true,
  },
  {
    id: 'computer-mobile',
    name: 'Computer & Mobile',
    nameUrdu: 'کمپیوٹر و موبائل',
    iconName: 'Smartphone',
    providerCount: 27,
    description: 'Screen replacement, flashing, motherboard chip repair, laptop upgrade.',
    descriptionUrdu: 'موبائل سکرین، سافٹ ویئر فلیشنگ، لیپ ٹاپ ریپئرنگ اور ہارڈ ویئر اپ گریڈ۔',
    popular: true,
  },
  {
    id: 'auto-mechanic',
    name: 'Auto Mechanic',
    nameUrdu: 'آٹو مکینک',
    iconName: 'Car',
    providerCount: 35,
    description: 'Car, bike, loader rickshaw & agricultural tractor engine tuning & overhaul.',
    descriptionUrdu: 'موٹر سائیکل، کار، لوڈر رکشہ اور ٹریکٹر کی مکمل ٹیوننگ و انجن ورک۔',
    popular: true,
  },
  {
    id: 'home-cleaning',
    name: 'Home Cleaning',
    nameUrdu: 'گھریلو صفائی',
    iconName: 'Sparkles',
    providerCount: 19,
    description: 'Deep house cleaning, carpet washing, water tank sanitation & fumigation.',
    descriptionUrdu: 'گھر کی گہری صفائی، قالین کی دھلائی، پانی ٹینکی صفائی اور سپرے سروس۔',
    popular: true,
  },
  {
    id: 'property-dealer',
    name: 'Property Dealer',
    nameUrdu: 'پراپرٹی ڈیلر',
    iconName: 'Building',
    providerCount: 22,
    description: 'Agricultural land, residential plots, shops & rental houses in Pakpattan & Arifwala.',
    descriptionUrdu: 'زرعی رقبہ جات، رہائشی پلاٹ، کمرشل دکانیں اور کرایہ کے مکانات۔',
  },
  {
    id: 'construction',
    name: 'Construction',
    nameUrdu: 'تعمیراتی کام',
    iconName: 'HardHat',
    providerCount: 31,
    description: 'Masonry, plaster, tile-marble fitting, RCC roof slab laying & contracting.',
    descriptionUrdu: 'راج مستری، ماربل ٹائل فٹنگ، سیمنٹ پلاسٹر اور مکمل مکان ٹھیکیداری۔',
  },
  {
    id: 'beauty-personal',
    name: 'Beauty & Personal Care',
    nameUrdu: 'بیوٹی و گرومنگ',
    iconName: 'Scissors',
    providerCount: 26,
    description: 'Bridal makeup, hair styling, men salon, skin treatments & home parlour visits.',
    descriptionUrdu: 'برائیڈل میک اپ، پارٹی میک اپ، مردانہ ہیئر ڈریسنگ اور سکن کیئر۔',
  },
  {
    id: 'restaurant',
    name: 'Restaurant & Food',
    nameUrdu: 'ریسٹورنٹ و فوڈ',
    iconName: 'UtensilsCrossed',
    providerCount: 41,
    description: 'Traditional Punjabi handi, biryani, daig cooking, catering for events.',
    descriptionUrdu: 'دیسی کھانے، دیگیں، شادی بیاہ کی کیٹرنگ اور فاسٹ فوڈ۔',
  },
  {
    id: 'delivery',
    name: 'Delivery Services',
    nameUrdu: 'ڈلیوری سروس',
    iconName: 'Package',
    providerCount: 18,
    description: 'Same-day parcels, grocery pickup, medicine drop & inter-village dispatch.',
    descriptionUrdu: 'شہر سے دیہات تک پارسل ترسیل، ادویات اور گروسری کی بروقت ڈلیوری۔',
  },
  {
    id: 'transport',
    name: 'Transport & Loader',
    nameUrdu: 'ٹرانسپورٹ و رکشہ',
    iconName: 'Truck',
    providerCount: 34,
    description: 'Suzuki pickup, loader rickshaws, grain haulage, tractor trolley & cabs.',
    descriptionUrdu: 'سامان کی منتقلی، لوڈر رکشہ، پک اپ، ٹریکٹر ٹرالی اور رینٹ اے کار۔',
  },
  {
    id: 'event-services',
    name: 'Event Services',
    nameUrdu: 'ایونٹ و شادی ہال',
    iconName: 'CalendarCheck',
    providerCount: 20,
    description: 'Tent service, lighting, sound system, catering equipment & event stages.',
    descriptionUrdu: 'ٹینٹ سروس، ساؤنڈ سسٹم، سجاوٹ، شامیانے اور تقریب کا مکمل انتظام۔',
  },
  {
    id: 'education-tutors',
    name: 'Education & Tutors',
    nameUrdu: 'ٹیوشن و اساتذہ',
    iconName: 'GraduationCap',
    providerCount: 28,
    description: 'Matric, F.Sc, entry test preparation, Quran tutors & science home tuition.',
    descriptionUrdu: 'میٹرک، ایف ایس سی سائنس مضامین، حفظ و ناظرہ قرآن اور انگلش ٹیوٹرز۔',
  },
];

export const VILLAGES: Village[] = [
  { id: 'v1', name: 'Pakpattan City (Urban)', nameUrdu: 'پاکپتن سٹی', tehsil: 'Pakpattan', unionCouncil: 'UC-01 to 08', distanceKm: 0, providerCount: 142, featured: true },
  { id: 'v2', name: 'Arifwala City (Urban)', nameUrdu: 'عارف والا سٹی', tehsil: 'Arifwala', unionCouncil: 'UC-01 to 06', distanceKm: 26, providerCount: 118, featured: true },
  { id: 'v3', name: 'Malka Hans', nameUrdu: 'ملکہ ہانس', tehsil: 'Pakpattan', unionCouncil: 'UC Malka Hans', distanceKm: 14, providerCount: 26, featured: true },
  { id: 'v4', name: 'Chak 19/SP', nameUrdu: 'چک 19 ایس پی', tehsil: 'Pakpattan', unionCouncil: 'UC 19/SP', distanceKm: 8, providerCount: 16, featured: true },
  { id: 'v5', name: 'Chak 23/EB', nameUrdu: 'چک 23 ای بی', tehsil: 'Arifwala', unionCouncil: 'UC 23/EB', distanceKm: 12, providerCount: 19, featured: true },
  { id: 'v6', name: 'Chak 69/D', nameUrdu: 'چک 69 ڈی', tehsil: 'Pakpattan', unionCouncil: 'UC 69/D', distanceKm: 16, providerCount: 14, featured: true },
  { id: 'v7', name: 'Chak 21/SP', nameUrdu: 'چک 21 ایس پی', tehsil: 'Pakpattan', unionCouncil: 'UC 21/SP', distanceKm: 10, providerCount: 12 },
  { id: 'v8', name: 'Chak 35/EB', nameUrdu: 'چک 35 ای بی', tehsil: 'Arifwala', unionCouncil: 'UC 35/EB', distanceKm: 18, providerCount: 15 },
  { id: 'v9', name: 'Tibba Shah Bahisht', nameUrdu: 'ٹبہ شاہ بہشت', tehsil: 'Pakpattan', unionCouncil: 'UC Tibba', distanceKm: 7, providerCount: 11 },
  { id: 'v10', name: 'Kalyana', nameUrdu: 'کلیانہ', tehsil: 'Pakpattan', unionCouncil: 'UC Kalyana', distanceKm: 22, providerCount: 9 },
  { id: 'v11', name: 'Noorpur', nameUrdu: 'نورپور', tehsil: 'Pakpattan', unionCouncil: 'UC Noorpur', distanceKm: 19, providerCount: 13 },
  { id: 'v12', name: 'Pir Ghani', nameUrdu: 'پیر غنی', tehsil: 'Pakpattan', unionCouncil: 'UC Pir Ghani', distanceKm: 25, providerCount: 8 },
  { id: 'v13', name: 'Bonga Hayat', nameUrdu: 'بونگہ حیات', tehsil: 'Pakpattan', unionCouncil: 'UC Bonga Hayat', distanceKm: 32, providerCount: 17, featured: true },
  { id: 'v14', name: 'Hota', nameUrdu: 'ہوتا', tehsil: 'Pakpattan', unionCouncil: 'UC Hota', distanceKm: 21, providerCount: 10 },
  { id: 'v15', name: 'Chak Shafi', nameUrdu: 'چک شفیع', tehsil: 'Arifwala', unionCouncil: 'UC Chak Shafi', distanceKm: 15, providerCount: 14 },
  { id: 'v16', name: 'Qaboola', nameUrdu: 'قبولہ', tehsil: 'Arifwala', unionCouncil: 'UC Qaboola', distanceKm: 36, providerCount: 22, featured: true },
  { id: 'v17', name: 'Malam', nameUrdu: 'مالم', tehsil: 'Pakpattan', unionCouncil: 'UC Malam', distanceKm: 17, providerCount: 7 },
  { id: 'v18', name: 'Chak 87/D', nameUrdu: 'چک 87 ڈی', tehsil: 'Pakpattan', unionCouncil: 'UC 87/D', distanceKm: 28, providerCount: 12 },
  { id: 'v19', name: 'Chak 54/EB', nameUrdu: 'چک 54 ای بی', tehsil: 'Arifwala', unionCouncil: 'UC 54/EB', distanceKm: 20, providerCount: 11 },
];

export const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 'p-1',
    userId: 'u-101',
    applicationId: 'APP-2024-001',
    businessName: 'Umar Home Services & Sanitary Works',
    businessNameUrdu: 'عمر ہوم سروسز و سینیٹری ورکس',
    ownerName: 'Muhammad Umar',
    category: 'plumber',
    categoryName: 'Plumber',
    rating: 4.9,
    reviewCount: 78,
    verified: true,
    identityVerified: true,
    badgeType: 'verified',
    primaryLocation: 'Pakpattan City (Urban)',
    tehsil: 'Pakpattan',
    serviceAreas: ['Pakpattan City (Urban)', 'Chak 19/SP', 'Chak 21/SP', 'Tibba Shah Bahisht', 'Malka Hans'],
    description: 'Over 12 years of professional plumbing & sanitary repair in Pakpattan district. Specialist in overhead water tank installation, PPRC hot/cold pipe fittings, boring motors, and emergency bathroom leakage troubleshooting.',
    descriptionUrdu: 'پاکپتن اور ملحقہ چکوک میں 12 سال سے پلمبنگ اور سینیٹری کے کاموں کا بھروسہ مند نام۔ واٹر ٹینکی، پی پی آر سی فٹنگ اور ایمرجنسی لیکج حل۔',
    startingPrice: 600,
    priceUnit: 'Visit & Inspection',
    profileImage: plumberImg,
    phone: '+92 300 7861122',
    whatsapp: '+92 300 7861122',
    workingHours: '8:00 AM - 9:00 PM (Emergency 24/7)',
    completedJobs: 342,
    memberSince: 'March 2024',
    featured: true,
    approved: true,
    applicationStatus: 'approved',
    isPublic: true,
    approvalDate: '2024-03-12',
    experienceYears: 12,
    workingDays: 'Monday - Sunday',
    services: [
      { id: 's1', title: 'Tap & Mixer Leakage Repair', price: 600, unit: 'per tap', description: 'Complete sealing, washer change, and valve replacement.' },
      { id: 's2', title: 'Overhead Water Tank Clean & Pipe Fitting', price: 2500, unit: 'per setup', description: 'Anti-bacterial chemical scrub and PVC inflow/overflow connection.' },
      { id: 's3', title: 'Complete Washroom Sanitary Piping (New House)', price: 14000, unit: 'per bathroom', description: 'Underground concealed piping, drain slope, geyser & commode installation.' },
      { id: 's4', title: 'Submersible Water Motor Troubleshooting', price: 1800, unit: 'per visit', description: 'Boring motor checking, capacitor upgrade, and pressure testing.' }
    ],
    portfolio: [
      { id: 'pf1', title: 'Modern Bath Concealed PPRC Piping in Model Town Pakpattan', image: plumberImg, tag: 'Sanitary' },
      { id: 'pf2', title: 'Solar Tube Well Pressure Valve Fitting at Chak 19/SP', image: plumberImg, tag: 'Boring' },
    ],
    reviews: [
      { id: 'r1', author: 'Haji Aslam Cheema', village: 'Chak 19/SP', rating: 5, date: '2 days ago', comment: 'Umar arrived within 40 minutes at our dera in Chak 19/SP. Solved the main motor line leakage quickly and charged very reasonable rates. Highly recommended!' },
      { id: 'r2', author: 'Tariq Mehmood', village: 'Pakpattan City (Urban)', rating: 5, date: '1 week ago', comment: 'Very respectful and skilled technician. Completed all sanitary piping in our newly constructed double storey house without any fault.' },
      { id: 'r3', author: 'Chaudhry Naeem', village: 'Malka Hans', rating: 4.8, date: '3 weeks ago', comment: 'Excellent water tank and boring setup. Clean work and honest advice.' }
    ]
  },
  {
    id: 'p-2',
    userId: 'u-102',
    applicationId: 'APP-2024-002',
    businessName: 'Rashid Electric & Solar Energy Solutions',
    businessNameUrdu: 'راشد الیکٹرک و سولر انرجی سلوشنز',
    ownerName: 'Muhammad Rashid',
    category: 'electrician',
    categoryName: 'Electrician',
    rating: 4.9,
    reviewCount: 94,
    verified: true,
    identityVerified: true,
    badgeType: 'top_rated',
    primaryLocation: 'Pakpattan City (Urban)',
    tehsil: 'Pakpattan',
    serviceAreas: ['Pakpattan City (Urban)', 'Chak 69/D', 'Noorpur', 'Tibba Shah Bahisht', 'Arifwala City (Urban)'],
    description: 'Certified electrical technician specializing in Hybrid Solar System setups, net metering wiring, agricultural tubewell breaker panels, UPS wiring, and residential fault detection.',
    descriptionUrdu: 'سولر پینل، ہائبرڈ انورٹر، ٹیوب ویل پینل اور گھروں کی محفوظ وائرنگ کے ماہر۔ جدید ٹیسٹنگ آلات کے ساتھ فوری سروس۔',
    startingPrice: 800,
    priceUnit: 'Inspection',
    profileImage: electricianImg,
    phone: '+92 301 6549988',
    whatsapp: '+92 301 6549988',
    workingHours: '7:30 AM - 8:30 PM',
    completedJobs: 419,
    memberSince: 'January 2024',
    featured: true,
    approved: true,
    applicationStatus: 'approved',
    isPublic: true,
    approvalDate: '2024-01-15',
    experienceYears: 10,
    workingDays: 'Monday - Saturday',
    services: [
      { id: 's5', title: 'Hybrid Solar Inverter Installation (5kW - 10kW)', price: 18000, unit: 'system', description: 'Complete AC/DC distribution box, earthing boring, and surge protector installation.' },
      { id: 's6', title: 'Main Distribution Box (DB) & Breaker Balancing', price: 2500, unit: 'box', description: 'Load distribution across phases, earth leakage breaker testing.' },
      { id: 's7', title: 'Emergency Short-Circuit Fault Detection', price: 1200, unit: 'callout', description: 'Megger & digital multimeter scanning for concealed wall wires.' }
    ],
    portfolio: [
      { id: 'pf3', title: '10kW Hybrid Solar Setup with Lithium Storage in Pakpattan', image: electricianImg, tag: 'Solar' },
    ],
    reviews: [
      { id: 'r4', author: 'Dr. Shahzad Gill', village: 'Pakpattan City (Urban)', rating: 5, date: '4 days ago', comment: 'Installed our 6kW solar system with complete grounding. Our electricity bill has plummeted. Very technical and courteous team.' },
      { id: 'r5', author: 'Malik Zafar', village: 'Chak 69/D', rating: 5, date: '2 weeks ago', comment: 'Diagnosed a dangerous phase burning problem in our flour mill (chaki) within 20 minutes.' }
    ]
  },
  {
    id: 'p-3',
    userId: 'u-103',
    applicationId: 'APP-2024-003',
    businessName: 'Al-Madina AC & Inverter Specialist',
    businessNameUrdu: 'المدینہ اے سی و انورٹر سپیشلسٹ',
    ownerName: 'Tahir Abbas',
    category: 'ac-refrigerator',
    categoryName: 'AC & Refrigerator',
    rating: 4.8,
    reviewCount: 63,
    verified: true,
    identityVerified: true,
    badgeType: 'verified',
    primaryLocation: 'Arifwala City (Urban)',
    tehsil: 'Arifwala',
    serviceAreas: ['Arifwala City (Urban)', 'Chak 23/EB', 'Chak 35/EB', 'Chak Shafi', 'Qaboola'],
    description: 'Expert diagnostics for DC inverter air conditioners (Haier, Gree, Dawlance, Pel). Master in leak soldering, R32/R410a genuine gas recharging, motherboard PCB repair, and deep chemical wash.',
    descriptionUrdu: 'ڈی سی انورٹر اے سی، ڈیپ فریزر اور ریفریجریٹر کی تسلی بخش مرمت۔ جینون گیس چارجنگ اور پی سی بی کٹ ریپئر۔',
    startingPrice: 1200,
    priceUnit: 'Chemical Service',
    profileImage: acTechImg,
    phone: '+92 302 9114433',
    whatsapp: '+92 302 9114433',
    workingHours: '8:00 AM - 10:00 PM',
    completedJobs: 285,
    memberSince: 'April 2024',
    featured: true,
    approved: true,
    applicationStatus: 'approved',
    isPublic: true,
    approvalDate: '2024-04-18',
    experienceYears: 8,
    workingDays: 'Monday - Sunday',
    services: [
      { id: 's8', title: 'High-Pressure Hydro Chemical AC Wash (Indoor + Outdoor)', price: 1500, unit: 'per split AC', description: 'Foam cleaning, blower descaling, coil jet washing.' },
      { id: 's9', title: 'R410A / R32 Refrigerant Gas Refill (100% Pure)', price: 3800, unit: 'full charge', description: 'Vacuum pump leak check, genuine factory weighed refrigerant charge.' }
    ],
    portfolio: [
      { id: 'pf4', title: 'Deep Wash and Installation at Gulshan-e-Iqbal Arifwala', image: acTechImg, tag: 'HVAC' }
    ],
    reviews: [
      { id: 'r6', author: 'Waqas Bhatti', village: 'Arifwala City (Urban)', rating: 5, date: '1 day ago', comment: 'My inverter AC was throwing an F3 error and not cooling. Tahir Bhai arrived with proper tools, fixed the coil sensor and vacuumed the system. Excellent!' }
    ]
  },
  {
    id: 'p-4',
    userId: 'u-104',
    applicationId: 'APP-2024-004',
    businessName: 'Chaudhry Woodworks & Custom Interiors',
    businessNameUrdu: 'چوہدری ووڈ ورکس و کسٹم انٹیریئرز',
    ownerName: 'Muhammad Akram Chaudhry',
    category: 'carpenter',
    categoryName: 'Carpenter',
    rating: 4.9,
    reviewCount: 52,
    verified: true,
    identityVerified: true,
    badgeType: 'local_certified',
    primaryLocation: 'Arifwala City (Urban)',
    tehsil: 'Arifwala',
    serviceAreas: ['Arifwala City (Urban)', 'Chak 23/EB', 'Chak 35/EB', 'Pakpattan City (Urban)', 'Bonga Hayat'],
    description: 'Generations of fine woodworking craftsmanship. Bespoke Sheesham and solid pine bridal bedroom furniture, modern kitchen UV sheet cabinets, and solid door installations across Arifwala & Pakpattan.',
    descriptionUrdu: 'خالص شیشم فرنیچر، ماڈرن کچن کیبنٹس، دروازے اور الماریاں تیار کرنے کے ماہر کاریگر۔ پائیدار کام، مناسب دام۔',
    startingPrice: 1000,
    priceUnit: 'Consultation & Measurement',
    profileImage: carpenterImg,
    phone: '+92 303 5556677',
    whatsapp: '+92 303 5556677',
    workingHours: '8:30 AM - 7:30 PM',
    completedJobs: 198,
    memberSince: 'February 2024',
    featured: true,
    approved: true,
    applicationStatus: 'approved',
    isPublic: true,
    approvalDate: '2024-02-20',
    experienceYears: 18,
    workingDays: 'Monday - Saturday',
    services: [
      { id: 's11', title: 'Custom Solid Sheesham Door Framing & Hanging', price: 3500, unit: 'per door', description: 'Precision hinge chiseled mortise fitting and lock installation.' },
      { id: 's12', title: 'UV / Acrylic Sheet Modular Kitchen Cabinets', price: 1800, unit: 'per sq ft', description: 'Hydraulic soft-close hinges, moisture-resistant carcass boards.' }
    ],
    portfolio: [
      { id: 'pf5', title: 'Sheesham Bridal Bed Set crafted for client in Chak 35/EB', image: carpenterImg, tag: 'Furniture' }
    ],
    reviews: [
      { id: 'r8', author: 'Rana Naveed', village: 'Chak 35/EB', rating: 5, date: '3 days ago', comment: 'The finish on our kitchen cabinets is showroom standard. Solid materials used and delivered right on the promised date.' }
    ]
  },
  // DEMO PENDING PROVIDER (Must NOT appear in public catalog until approved by Admin Omar Draz Gill!)
  {
    id: 'p-pending-1',
    userId: 'u-pending-1',
    applicationId: 'APP-2026-104',
    businessName: 'Chaudhry Solar & Tubewell Boring Works',
    businessNameUrdu: 'چوہدری سولر و ٹیوب ویل بورنگ ورکس',
    ownerName: 'Muhammad Asif Gill',
    category: 'electrician',
    categoryName: 'Electrician',
    rating: 0,
    reviewCount: 0,
    verified: false,
    identityVerified: false,
    badgeType: 'verified',
    primaryLocation: 'Chak 19/SP',
    tehsil: 'Pakpattan',
    serviceAreas: ['Chak 19/SP', 'Chak 21/SP', 'Pakpattan City (Urban)', 'Tibba Shah Bahisht'],
    description: 'Agricultural solar tube well motor installation, 20HP to 40HP control panel setup, deep boring wiring, and inverter repair.',
    descriptionUrdu: 'زرعی ٹیوب ویل سولر موٹر انسٹالیشن، کنٹرول پینل اور گہرے بورنگ کی وائرنگ۔',
    startingPrice: 1500,
    priceUnit: 'Visit',
    profileImage: electricianImg,
    phone: '0304 1122334',
    whatsapp: '0304 1122334',
    workingHours: '7:00 AM - 7:00 PM',
    completedJobs: 0,
    memberSince: 'October 2026',
    featured: false,
    approved: false,
    applicationStatus: 'pending',
    isPublic: false,
    experienceYears: 7,
    workingDays: 'Monday - Sunday',
    services: [
      { id: 's-pend-1', title: '25HP Solar Tube Well Inverter Parameter Tuning', price: 3000, unit: 'job', description: 'Frequency and voltage calibration for low sunshine hours.' }
    ],
    portfolio: [],
    reviews: []
  },
  // DEMO UNDER REVIEW PROVIDER
  {
    id: 'p-review-1',
    userId: 'u-review-1',
    applicationId: 'APP-2026-105',
    businessName: 'Farid Paint & Rockwall Textures',
    businessNameUrdu: 'فرید پینٹ و راک وال ٹیکسچرز',
    ownerName: 'Ghulam Farid',
    category: 'painter',
    categoryName: 'Painter',
    rating: 0,
    reviewCount: 0,
    verified: false,
    identityVerified: false,
    badgeType: 'verified',
    primaryLocation: 'Arifwala City (Urban)',
    tehsil: 'Arifwala',
    serviceAreas: ['Arifwala City (Urban)', 'Chak 23/EB', 'Qaboola'],
    description: 'Interior emulsion painting, exterior rockwall silicone protection, and door deco polishing.',
    descriptionUrdu: 'اندرونی پینٹ، راک وال اور ڈیکو پالش کے ماہر کاریگر۔',
    startingPrice: 20,
    priceUnit: 'per sq ft',
    profileImage: plumberImg,
    phone: '0305 9988776',
    whatsapp: '0305 9988776',
    workingHours: '8:00 AM - 6:00 PM',
    completedJobs: 0,
    memberSince: 'October 2026',
    featured: false,
    approved: false,
    applicationStatus: 'under_review',
    isPublic: false,
    experienceYears: 9,
    workingDays: 'Monday - Saturday',
    services: [],
    portfolio: [],
    reviews: []
  }
];

export const INITIAL_APPLICATIONS: ProviderApplication[] = [
  {
    id: 'APP-2026-104',
    userId: 'u-pending-1',
    personalInfo: {
      fullName: 'Muhammad Asif Gill',
      fatherName: 'Chaudhry Riaz Ahmad Gill',
      mobileNumber: '03041122334',
      whatsappNumber: '03041122334',
      email: 'asif.gill.solar@gmail.com',
      profilePicture: electricianImg
    },
    businessInfo: {
      businessName: 'Chaudhry Solar & Tubewell Boring Works',
      businessNameUrdu: 'چوہدری سولر و ٹیوب ویل بورنگ ورکس',
      providerType: 'Business',
      mainCategory: 'electrician',
      mainCategoryName: 'Electrician',
      additionalCategories: ['construction'],
      servicesOffered: 'Solar Tube Well Motors, Inverter Calibration, Industrial Breakers, 3-Phase Grounding',
      experienceYears: 7,
      businessDescription: 'Agricultural solar tube well motor installation, 20HP to 40HP control panel setup, deep boring wiring, and inverter repair in Pakpattan chaks.',
      startingPrice: 1500,
      priceUnit: 'Visit',
      workingDays: 'Monday - Sunday',
      workingHours: '7:00 AM - 7:00 PM'
    },
    locationInfo: {
      district: 'Pakpattan',
      tehsil: 'Pakpattan',
      unionCouncil: 'UC 19/SP',
      village: 'Chak 19/SP',
      completeAddress: 'Main Dera Chaudhry Riaz, Chak 19/SP, Tehsil Pakpattan',
      selectedServiceAreas: ['Chak 19/SP', 'Chak 21/SP', 'Pakpattan City (Urban)', 'Tibba Shah Bahisht'],
      googleMapsLocation: 'https://maps.google.com/?q=30.34,73.38'
    },
    documents: {
      cnicNumber: '35302-8947261-3',
      cnicFrontImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      cnicBackImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      businessLicense: 'Pakpattan District Trade Chamber Member No. 4410',
      portfolioImages: [electricianImg]
    },
    status: 'pending',
    submittedAt: 'Today at 09:45 AM',
    approvalLogs: [
      {
        id: 'log-1',
        adminId: 'admin-1',
        adminName: 'System Gateway',
        action: 'Application Submitted',
        previousStatus: 'pending',
        newStatus: 'pending',
        remarks: 'New application registered by Muhammad Asif Gill.',
        timestamp: 'Today at 09:45 AM'
      }
    ]
  },
  {
    id: 'APP-2026-105',
    userId: 'u-review-1',
    personalInfo: {
      fullName: 'Ghulam Farid',
      fatherName: 'Khadim Hussain',
      mobileNumber: '03059988776',
      whatsappNumber: '03059988776',
      email: 'farid.painter786@gmail.com',
      profilePicture: plumberImg
    },
    businessInfo: {
      businessName: 'Farid Paint & Rockwall Textures',
      businessNameUrdu: 'فرید پینٹ و راک وال ٹیکسچرز',
      providerType: 'Individual',
      mainCategory: 'painter',
      mainCategoryName: 'Painter',
      additionalCategories: ['home-cleaning'],
      servicesOffered: 'Interior Paint, Exterior Rockwall, Waterproof Wall Putty, Wood Deco Polish',
      experienceYears: 9,
      businessDescription: 'Interior emulsion painting, exterior rockwall silicone protection, and door deco polishing for houses in Arifwala and Pakpattan.',
      startingPrice: 20,
      priceUnit: 'per sq ft',
      workingDays: 'Monday - Saturday',
      workingHours: '8:00 AM - 6:00 PM'
    },
    locationInfo: {
      district: 'Pakpattan',
      tehsil: 'Arifwala',
      unionCouncil: 'UC-04 Arifwala',
      village: 'Arifwala City (Urban)',
      completeAddress: 'Shop # 12, Paint Market, Qaboola Road, Arifwala',
      selectedServiceAreas: ['Arifwala City (Urban)', 'Chak 23/EB', 'Qaboola'],
      googleMapsLocation: ''
    },
    documents: {
      cnicNumber: '35301-4458921-7',
      cnicFrontImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      cnicBackImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      portfolioImages: []
    },
    status: 'under_review',
    submittedAt: 'Yesterday at 04:30 PM',
    reviewedAt: 'Today at 08:30 AM',
    reviewedBy: 'Omar Draz Gill',
    approvalLogs: [
      {
        id: 'log-2',
        adminId: 'admin-omar',
        adminName: 'Omar Draz Gill',
        action: 'Marked Under Review',
        previousStatus: 'pending',
        newStatus: 'under_review',
        remarks: 'CNIC scanned. Checking workshop physical verification in Arifwala.',
        timestamp: 'Today at 08:30 AM'
      }
    ]
  },
  {
    id: 'APP-2026-102',
    userId: 'u-resub-1',
    personalInfo: {
      fullName: 'Tariq Jameel',
      fatherName: 'Muhammad Jameel',
      mobileNumber: '03028889900',
      whatsappNumber: '03028889900',
      email: 'tariq.agritech@gmail.com',
      profilePicture: acTechImg
    },
    businessInfo: {
      businessName: 'Sahiwal & Pakpattan Harvester Repairs',
      businessNameUrdu: 'ہارویسٹر و زرعی مشینری مرمت',
      providerType: 'Business',
      mainCategory: 'auto-mechanic',
      mainCategoryName: 'Auto Mechanic',
      additionalCategories: ['transport'],
      servicesOffered: 'Combine Harvester Hydraulics, Kubota Engine Overhaul, Thresher Belts',
      experienceYears: 14,
      businessDescription: 'Wheat and maize harvester maintenance and urgent breakdown roadside service in rural Punjab.',
      startingPrice: 3500,
      priceUnit: 'Service Call',
      workingDays: 'Monday - Sunday',
      workingHours: '24 Hours Emergency'
    },
    locationInfo: {
      district: 'Pakpattan',
      tehsil: 'Arifwala',
      unionCouncil: 'UC Chak Shafi',
      village: 'Chak Shafi',
      completeAddress: 'Pull 14, Main Arifwala Bypass',
      selectedServiceAreas: ['Chak Shafi', 'Qaboola', 'Chak 35/EB', 'Bonga Hayat'],
    },
    documents: {
      cnicNumber: '35301-1239845-1',
      cnicFrontImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      cnicBackImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      portfolioImages: []
    },
    status: 'resubmission_required',
    rejectionReason: '',
    resubmissionNotes: 'Please upload a clearer high-resolution photo of your CNIC back side (expiry date was blurry) and specify workshop shop number.',
    submittedAt: 'Sep 30, 2026',
    reviewedAt: 'Oct 01, 2026',
    reviewedBy: 'Omar Draz Gill',
    approvalLogs: [
      {
        id: 'log-3',
        adminId: 'admin-omar',
        adminName: 'Omar Draz Gill',
        action: 'Resubmission Requested',
        previousStatus: 'pending',
        newStatus: 'resubmission_required',
        remarks: 'CNIC back blur. Requested re-upload from applicant.',
        timestamp: 'Oct 01, 2026'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    recipientId: 'admin',
    recipientRole: 'admin',
    type: 'alert',
    title: 'New Provider Registration',
    message: 'Muhammad Asif Gill submitted application APP-2026-104 for "Chaudhry Solar & Tubewell Boring Works".',
    read: false,
    createdAt: '15 mins ago',
    actionLink: 'admin'
  },
  {
    id: 'notif-2',
    recipientId: 'admin',
    recipientRole: 'admin',
    type: 'info',
    title: 'Application Under Review',
    message: 'Omar Draz Gill placed Ghulam Farid (APP-2026-105) under review.',
    read: true,
    createdAt: '2 hours ago',
    actionLink: 'admin'
  },
  {
    id: 'notif-3',
    recipientId: 'u-101',
    recipientRole: 'provider',
    type: 'success',
    title: 'Account Approved & Active',
    message: 'Your business profile for Umar Home Services is live and visible across 5 villages in Pakpattan.',
    read: true,
    createdAt: 'Yesterday',
    actionLink: 'provider-dashboard'
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'daily',
    name: 'Daily Pass',
    nameUrdu: 'روزانہ پاس',
    price: 100,
    interval: 'day',
    intervalUrdu: 'یومیہ',
    description: 'Perfect for urgent short-term jobs or testing the platform with minimal commitment.',
    features: [
      'Active listing in selected category',
      'Appear in 2 village searches',
      'Direct customer chat access',
      'Basic SMS inquiry alerts',
      'Standard support'
    ]
  },
  {
    id: 'weekly',
    name: 'Weekly Growth',
    nameUrdu: 'ہفتہ وار پیکج',
    price: 500,
    interval: 'week',
    intervalUrdu: 'ہفتہ وار',
    badge: 'Popular',
    description: 'Most popular among independent technicians and mobile service pros.',
    features: [
      'Priority placement in search results',
      'Coverage in up to 5 villages/chaks',
      'Verified Badge eligibility',
      'Real-time WhatsApp inquiry forward',
      'Customer review collection tool',
      'Priority support response'
    ]
  },
  {
    id: 'monthly',
    name: 'Monthly Pro Business',
    nameUrdu: 'ماہانہ بزنس پیکج',
    price: 2000,
    interval: 'month',
    intervalUrdu: 'ماہانہ',
    badge: 'Best Value',
    description: 'Designed for established local businesses, workshops, and multi-team contractors.',
    features: [
      'Top-of-page Featured Badge',
      'Unlimited village & rural coverage',
      'Identity Verified trust checkmark',
      'Dedicated business profile & gallery',
      'Admin promotional banner spotlight',
      'Full monthly lead analytics report',
      'Direct VIP manager assistance'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Haji Aslam Cheema',
    nameUrdu: 'حاجی اسلم چیمہ',
    village: 'Chak 19/SP, Pakpattan',
    role: 'Farmer & Landowner',
    rating: 5,
    avatar: 'AC',
    serviceTaken: 'Solar Tubewell Wiring',
    comment: 'Living 8 kilometers from the main city, getting a certified electrician out to our farm used to take days. Through PakPattan Services Hub, Rashid arrived within two hours with proper testing tools. Saved our tubewell during peak irrigation!'
  },
  {
    id: 't2',
    name: 'Shamim Akhtar',
    nameUrdu: 'شمیم اختر',
    village: 'Gulshan-e-Iqbal, Arifwala',
    role: 'School Teacher',
    rating: 5,
    avatar: 'SA',
    serviceTaken: 'AC Chemical Jet Wash',
    comment: 'I really appreciate that the platform allows in-app chat so we can discuss the problem and price before sharing personal phone numbers. The technician was polite, clean, and did not leave a single drop of water on our floor.'
  },
  {
    id: 't3',
    name: 'Dr. Shahzad Gill',
    nameUrdu: 'ڈاکٹر شہزاد گل',
    village: 'Farid Town, Pakpattan',
    role: 'Clinic Director',
    rating: 5,
    avatar: 'SG',
    serviceTaken: 'Full Plumbing & Water Tank Service',
    comment: 'A true blessing for Pakpattan district. Transparent pricing, verified badges, and real reviews from people in our own neighborhoods. Highly recommended to everyone.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Top 5 Signs Your Underground Water Tank in Pakpattan Needs Immediate Cleaning',
    titleUrdu: 'پاکپتن میں زیرِ زمین واٹر ٹینکی کی صفائی کب ضروری ہوتی ہے؟ 5 اہم نشانیاں',
    slug: 'water-tank-cleaning-pakpattan',
    category: 'Home Maintenance',
    author: 'Engr. M. Umar',
    date: 'September 28, 2026',
    readTime: '4 min read',
    image: plumberImg,
    excerpt: 'With ground mineral hardness and sediment accumulation in rural Punjab, regular water tank sanitation prevents pipe choking and bacterial illness.',
    content: `Underground and rooftop water tanks in Pakpattan and surrounding chaks face heavy silt build-up due to the specific mineral density of the local water table. Over 6 to 8 months, fine clay settles at the bottom of concrete and fiber tanks, creating an ideal breeding ground for algae and coliform bacteria.

Key indicators you need a certified cleaning service:
1. Low water pressure in geysers and shower mixers caused by silt blocking the PPRC filter screen.
2. Faint earthy or sulfurous odor when opening hot water taps in the morning.
3. Brownish ring staining around toilet bowls and washbasins.
4. Increased frequency of boring motor trips due to back-pressure.

Professional cleaning using chlorine scrub, high-pressure washer, and sludge suction pump ensures your family drinks safe water without damaging the waterproof lining of your tank.`
  },
  {
    id: 'b2',
    title: 'Hybrid Solar Inverter Optimization for Rural Punjab Load-Shedding',
    titleUrdu: 'دیہی علاقوں میں سولر انورٹر اور بیٹریوں کی لمبی عمر کے لیے ضروری رہنمائی',
    slug: 'solar-inverter-tips-punjab',
    category: 'Solar & Electrical',
    author: 'Rashid Electrician',
    date: 'September 22, 2026',
    readTime: '5 min read',
    image: electricianImg,
    excerpt: 'Practical guidelines for maintaining tubular and lithium battery banks during high summer temperatures in Pakpattan and Arifwala.',
    content: `During peak summer months, ambient temperatures in Pakpattan district often cross 44°C. Excessive heat directly degrades battery electrolyte water levels and triggers inverter thermal throttling.

Top maintenance tips from local certified technicians:
1. Check distilled water level in lead-acid and tall tubular batteries every 15 days using a hydrometer. Never top up with tap or tube well water.
2. Ensure at least 12 inches of cross-ventilation space on both sides of your hybrid inverter.
3. Clean solar panel glass at dawn before the panels heat up. Spraying cold water on blistering midday glass can cause micro-cracks in the photovoltaic cells.
4. Have your copper earthing rod resistance checked with an Earth Tester before the monsoon thunder season.`
  },
  {
    id: 'b3',
    title: 'Choosing Between Sheesham and Commercial Board for Bridal Furniture in Arifwala',
    titleUrdu: 'عارف والا میں بیٹیوں کے جہیز کے لیے لکڑی کے فرنیچر کا درست انتخاب کیسے کریں؟',
    slug: 'sheesham-furniture-guide-arifwala',
    category: 'Carpentry & Interiors',
    author: 'Chaudhry Akram',
    date: 'September 15, 2026',
    readTime: '6 min read',
    image: carpenterImg,
    excerpt: 'A master carpenter explains wood seasoning, termite vulnerabilities, and how to verify authentic Sheesham heartwood.',
    content: `Bridal furniture is a lifetime investment for families in Arifwala and Pakpattan. However, raw, unseasoned wood often warps and cracks when winter humidity shifts to dry summer heat.

Always inspect the core frame:
1. Authentic Sheesham has high natural oil content that naturally repels termites (deemak). The heartwood ranges from golden brown to deep chestnut with dark streaks.
2. Avoid low-grade chipboard in bottom bed boxes and kitchen undersinks where moisture will make it swell irreversibly.
3. Require your carpenter to apply a penetrating anti-termite oil primer before the final PU deco polish or lacquer finish.`
  }
];

export const INITIAL_TASKS = [
  {
    id: 't-101',
    customerName: 'Khurram Shehzad',
    customerPhone: '+92 300 1234567',
    category: 'plumber',
    title: 'Install 1000 Gallon Water Tank on 2nd Floor',
    description: 'Need master plumber to install new Dura water tank on roof, connect to 1-inch main PPRC line, and install float ball valve with overflow drain.',
    budget: 3500,
    location: 'Pakpattan City (Urban)',
    village: 'Pakpattan City (Urban)',
    preferredDate: 'Tomorrow Morning',
    preferredTime: '9:00 AM',
    status: 'pending' as const,
    createdAt: 'Today, 10:15 AM',
    proposalsCount: 3,
  },
  {
    id: 't-102',
    customerName: 'Naveed Akhtar',
    customerPhone: '+92 301 9876543',
    category: 'ac-refrigerator',
    title: '1.5 Ton Inverter AC Gas Check and Jet Service',
    description: 'Haier 1.5 ton inverter not cooling properly. Outdoor unit making light buzzing sound. Need complete chemical jet wash and pressure test.',
    budget: 2500,
    location: 'Arifwala City (Urban)',
    village: 'Chak 23/EB',
    preferredDate: 'Saturday',
    preferredTime: 'Afternoon',
    status: 'in_progress' as const,
    createdAt: 'Yesterday',
    proposalsCount: 4,
  }
];

export const INITIAL_CONVERSATIONS = [
  {
    id: 'c-1',
    providerId: 'p-1',
    providerName: 'Umar Home Services & Sanitary Works',
    providerImage: plumberImg,
    providerCategory: 'Plumber',
    unreadCount: 1,
    lastMessage: 'Ji bhai, main Chak 19/SP me 30 minute me pohanch sakta hoon. Boring motor ka switch off rakhein.',
    lastTimestamp: '10:45 AM',
    messages: [
      { id: 'm1', sender: 'user' as const, text: 'Assalam-o-Alaikum Umar Bhai, hamaray dera par motor ka pipe burst ho gya hai, kya aap Chak 19/SP aa sakte hain?', timestamp: '10:30 AM' },
      { id: 'm2', sender: 'provider' as const, text: 'Walaikum Assalam! Haan bilkul, main abhi Chowk par hoon aur nikal raha hoon.', timestamp: '10:35 AM' },
      { id: 'm3', sender: 'provider' as const, text: 'Ji bhai, main Chak 19/SP me 30 minute me pohanch sakta hoon. Boring motor ka switch off rakhein.', timestamp: '10:45 AM' }
    ]
  },
  {
    id: 'c-2',
    providerId: 'p-2',
    providerName: 'Rashid Electric & Solar Energy',
    providerImage: electricianImg,
    providerCategory: 'Electrician',
    unreadCount: 0,
    lastMessage: 'Bohat shukriya sir! Solar inverter load bilkul balanced hai.',
    lastTimestamp: 'Yesterday',
    messages: [
      { id: 'm4', sender: 'user' as const, text: 'Rashid Bhai, 5kW solar ka breaker test kar lia aap ne?', timestamp: 'Yesterday 3:15 PM' },
      { id: 'm5', sender: 'provider' as const, text: 'Bohat shukriya sir! Solar inverter load bilkul balanced hai.', timestamp: 'Yesterday 3:30 PM' }
    ]
  }
];
