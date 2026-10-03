import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast, language } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    showToast('Your message has been sent to PakPattan Hub support team. We will reply within 30 minutes.');
    setName('');
    setPhone('');
    setMessage('');
  };

  const faqs = [
    {
      q: 'Is posting a task free for customers in Pakpattan & Arifwala?',
      a: 'Yes, posting a task is 100% free with zero booking fee. You negotiate and pay the service technician directly for labor and materials.'
    },
    {
      q: 'How do providers register their multiple village service areas?',
      a: 'After registering with your CNIC, access the Provider Portal → "Service Areas & Villages" tab to check off every chak or union council you are willing to visit.'
    },
    {
      q: 'How does the platform protect customer privacy?',
      a: 'We provide an internal chat system so you can clarify the fault, inspect photos, and discuss price estimates before publicly exposing your personal contact number.'
    },
    {
      q: 'How do I pay for provider subscriptions?',
      a: 'Provider packages can be paid via EasyPaisa, JazzCash, or bank transfer directly through our automated dashboard.'
    }
  ];

  return (
    <div className="bg-[#F7F8FC] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5865F2] uppercase tracking-wider mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Community Support</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight">
            Contact PakPattan Services Hub
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500">
            Have questions or need assistance finding a technician? Our local team in Pakpattan is here to help.
          </p>
        </div>

        {/* 2-Column Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 bg-[#111A4A] text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5865F2]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  District Headquarters & Helpline
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Serving residents and agricultural communities across Pakpattan, Arifwala, and surrounding union councils.
                </p>
              </div>

              <div className="space-y-4 text-xs text-gray-200">
                {/* Official Admin Profile Banner */}
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5A623]">Platform Administrator</span>
                    <span className="text-[10px] bg-[#18B88A] text-white px-2 py-0.5 rounded-md font-bold">Official Admin</span>
                  </div>
                  <p className="text-sm font-bold text-white mb-2">Omar Draz Gill</p>
                  <div className="space-y-1.5 text-xs text-gray-200">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#18B88A]" />
                      <a href="tel:03107217253" className="hover:text-white font-medium">Contact: 03107217253</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#18B88A] text-white text-[9px] font-bold flex items-center justify-center">W</span>
                      <a href="https://wa.me/923107217253" target="_blank" rel="noreferrer" className="text-[#18B88A] hover:underline font-bold">
                        WhatsApp: 03107217253
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#F5A623]" />
                      <a href="mailto:umarcome347@gmail.com" className="hover:text-white font-medium">Email: umarcome347@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#5865F2] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Central Operations Office:</strong>
                    <span>Near DHQ Hospital Road, Pakpattan, Punjab, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Operating Hours:</strong>
                    <span>Monday - Sunday: 8:00 AM - 10:00 PM (Emergency 24/7)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 text-xs text-gray-300">
              <span className="text-[#18B88A] font-bold">Fast Response Promise:</span> All inquiries answered within 30 minutes.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm">
            <h3 className="font-heading font-bold text-xl text-[#111A4A] mb-2">
              Send Us a Message
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Fill in the form below and our helpline representative will follow up promptly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Haji Aslam"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0300 7861122"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Message or Inquiry</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with local service providers in Pakpattan or Arifwala?"
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2]"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold shadow-md transition active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm max-w-4xl mx-auto">
          <h3 className="font-heading font-bold text-xl text-[#111A4A] mb-6 text-center">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-100 bg-[#F7F8FC] overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-bold text-[#111A4A]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-200/60 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
