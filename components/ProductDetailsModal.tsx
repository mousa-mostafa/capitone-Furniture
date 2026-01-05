
import React, { useState } from 'react';
import { Product } from '../types';
import { checkCustomizationAvailability } from '../services/geminiService';

interface Props {
  product: Product;
  onClose: () => void;
  onConfirmOrder: (custom: { fabric: string, paint: string, installment: 0 | 3 | 6 }) => void;
  currency: string;
  rate: number;
}

const FIXED_PAINTS = ['أبيض', 'فضي', 'شامبين', 'ذهبي جولد'];

const ProductDetailsModal: React.FC<Props> = ({ product, onClose, onConfirmOrder, currency, rate }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [fabricColor, setFabricColor] = useState('');
  const [paintColor, setPaintColor] = useState(FIXED_PAINTS[0]);
  const [checking, setChecking] = useState(false);
  const [aiResponse, setAiResponse] = useState<{ available: boolean, message: string } | null>(null);

  const price = product.price * rate;
  const threeMonthsTotal = price * 1.1;
  const sixMonthsTotal = price * 1.2;

  const handleCheckAvailability = async () => {
    if (!fabricColor) {
      alert('يرجى كتابة لون القماش المطلوب أولاً');
      return;
    }
    setChecking(true);
    const result = await checkCustomizationAvailability(product.name, fabricColor, paintColor);
    setAiResponse(result);
    setChecking(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#012b2b] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#d4af37] relative shadow-2xl flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#d4af37] hover:text-white z-10 text-2xl">
          <i className="fas fa-times"></i>
        </button>

        <div className="md:w-1/2 p-4">
          <div className="h-[400px] mb-4 rounded-xl overflow-hidden border border-[#d4af37]/30">
            <img src={product.images[activeImg]} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImg(idx)}
                className={`h-20 rounded-lg overflow-hidden border-2 transition-all ${idx === activeImg ? 'border-[#d4af37]' : 'border-transparent'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 p-8 text-right">
          <h2 className="text-3xl font-extrabold mb-4 gold-text">{product.name}</h2>
          <p className="text-gray-400 mb-2 font-bold">عدد القطع: {product.piecesCount}</p>
          <p className="text-gray-300 mb-6 leading-relaxed text-sm">{product.description}</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[#d4af37] font-bold mb-2">لون القماش المطلوب:</label>
              <input 
                type="text"
                value={fabricColor}
                onChange={(e) => { setFabricColor(e.target.value); setAiResponse(null); }}
                placeholder="اكتب اللون المفضل..."
                className="w-full bg-black/30 border border-[#d4af37]/40 rounded-lg px-4 py-2 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#d4af37] font-bold mb-2">لون دهان الخشب:</label>
              <div className="flex flex-wrap gap-2">
                {FIXED_PAINTS.map(p => (
                  <button 
                    key={p}
                    onClick={() => { setPaintColor(p); setAiResponse(null); }}
                    className={`px-3 py-1 rounded-full border text-xs transition-all ${paintColor === p ? 'bg-[#d4af37] text-[#012b2b]' : 'border-[#d4af37] text-[#d4af37]'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-black/40 rounded-xl border border-[#d4af37]/20">
              <h4 className="text-sm font-bold text-[#d4af37] mb-3">نظام التقسيط:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-2 border border-white/5 rounded-lg">
                  <p className="text-[10px] text-gray-400">3 أشهر (+10%)</p>
                  <p className="text-sm font-bold">{(threeMonthsTotal / 3).toFixed(2)} {currency}/ش</p>
                </div>
                <div className="text-center p-2 border border-white/5 rounded-lg">
                  <p className="text-[10px] text-gray-400">6 أشهر (+20%)</p>
                  <p className="text-sm font-bold">{(sixMonthsTotal / 6).toFixed(2)} {currency}/ش</p>
                </div>
              </div>
            </div>

            {aiResponse && (
              <div className={`p-4 rounded-lg border text-xs ${aiResponse.available ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'}`}>
                {aiResponse.message}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleCheckAvailability}
                disabled={checking}
                className="flex-1 py-3 bg-white/5 border border-[#d4af37] text-[#d4af37] rounded-xl font-bold text-sm"
              >
                {checking ? 'جاري التأكد...' : 'تأكيد توفر اللون'}
              </button>
              <button 
                onClick={() => onConfirmOrder({ fabric: fabricColor, paint: paintColor, installment: 0 })}
                className="flex-1 py-3 gold-gradient text-[#012b2b] rounded-xl font-bold text-sm"
              >
                إضافة للسلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
