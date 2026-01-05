
import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black gold-text mb-4">اتصل بنا</h2>
        <p className="text-gray-400">يسعدنا تواصلكم لزيارة معرضنا أو الاستفسار عن خدمات التصدير</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-[#023b3b] p-8 rounded-3xl border border-[#d4af37]/30 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6 text-right">
            <div>
              <label className="block text-[#d4af37] font-bold mb-2">الاسم بالكامل</label>
              <input 
                required
                type="text" 
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#d4af37] font-bold mb-2">البريد الإلكتروني</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[#d4af37] font-bold mb-2">رقم الهاتف</label>
                <input 
                  required
                  type="tel" 
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-[#d4af37] font-bold mb-2">رسالتك</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button className="w-full py-4 gold-gradient text-[#012b2b] rounded-xl font-bold text-xl hover:scale-105 transition-all">
              {sent ? 'تم الإرسال بنجاح!' : 'إرسال الرسالة'}
            </button>
          </form>
        </div>

        {/* Map & Info */}
        <div className="space-y-8">
          <div className="h-[400px] rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-2xl">
            {/* Embed Google Map for Damietta, Al Sha'ra'a */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13636.576024976451!2d31.8153406!3d31.4164808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f99d985a97491d%3A0x6b2e9d2f33c3a9d3!2z2KfZhNi02LnYsdin2KY!5e0!3m2!1sar!2seg!4v1710000000000!5m2!1sar!2seg" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/20 p-6 rounded-2xl border border-white/5 text-center">
              <i className="fas fa-map-marker-alt text-3xl text-[#d4af37] mb-3"></i>
              <h4 className="font-bold text-white">العنوان</h4>
              <p className="text-sm text-gray-400">{CONTACT_INFO.address}</p>
            </div>
            <div className="bg-black/20 p-6 rounded-2xl border border-white/5 text-center">
              <i className="fas fa-shipping-fast text-3xl text-[#d4af37] mb-3"></i>
              <h4 className="font-bold text-white">خدمات الشحن</h4>
              <p className="text-sm text-gray-400">توصيل محلي وتصدير دولي</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
