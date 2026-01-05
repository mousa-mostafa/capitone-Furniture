
import React from 'react';

const ShippingServicesPage: React.FC = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto text-right">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black gold-text mb-4">خدمات الشحن والتوصيل</h2>
        <p className="text-gray-400">نصل بمنتجاتنا من قلب دمياط إلى منزلك أينما كنت</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* International Export */}
        <div className="bg-[#023b3b] p-8 rounded-3xl border border-[#d4af37]/30 shadow-2xl space-y-4">
          <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center text-[#d4af37] text-3xl mb-4">
            <i className="fas fa-globe-americas"></i>
          </div>
          <h3 className="text-2xl font-bold text-white">التصدير خارج البلاد</h3>
          <p className="text-gray-400 leading-relaxed">
            نقدم خدمة التصدير الدولي لجميع دول العالم عبر شركات شحن دولية موثوقة. نضمن لك تغليفاً احترافياً (تغليف تصدير) لحماية الأثاث من الرطوبة والخدوش أثناء الرحلة الطويلة.
          </p>
          <ul className="text-[#d4af37] text-sm space-y-2">
            <li><i className="fas fa-check-circle ml-2"></i> شحن بحري وجوي</li>
            <li><i className="fas fa-check-circle ml-2"></i> تخليص جمركي احترافي</li>
            <li><i className="fas fa-check-circle ml-2"></i> تأمين شامل على الشحنة</li>
          </ul>
        </div>

        {/* Domestic Shipping */}
        <div className="bg-[#023b3b] p-8 rounded-3xl border border-[#d4af37]/30 shadow-2xl space-y-4">
          <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center text-[#d4af37] text-3xl mb-4">
            <i className="fas fa-truck"></i>
          </div>
          <h3 className="text-2xl font-bold text-white">التوصيل داخل مصر</h3>
          <p className="text-gray-400 leading-relaxed">
            نوفر خيارات مرنة للشحن الداخلي لكافة المحافظات لضمان وصول الصالون في أبهى صورة.
          </p>
          <div className="space-y-4 mt-4">
            <div className="bg-black/20 p-4 rounded-xl">
              <h4 className="font-bold text-[#d4af37]">1. سيارات خاصة بالمصنع</h4>
              <p className="text-xs text-gray-500">توصيل مباشر وباب لباب مع فنيين تركيب محترفين.</p>
            </div>
            <div className="bg-black/20 p-4 rounded-xl">
              <h4 className="font-bold text-[#d4af37]">2. شركات الشحن الداخلية</h4>
              <p className="text-xs text-gray-500">للمحافظات البعيدة بأسعار تنافسية.</p>
            </div>
            <div className="bg-black/20 p-4 rounded-xl">
              <h4 className="font-bold text-[#d4af37]">3. عربة الشحن المجمعة (الاقتصادية)</h4>
              <p className="text-xs text-gray-400">يتم تجميع عدة طلبات في سيارة واحدة لتوزيع التكلفة، وتتحرك السيارة بموعد مسبق حسب ترتيب العناوين.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingServicesPage;
