
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onCompare: (p: Product) => void;
  isComparing: boolean;
  rate: number;
  symbol: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onViewDetails, 
  onAddToCart, 
  onCompare,
  isComparing,
  rate,
  symbol
}) => {
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const convertedPrice = (product.price * rate).toFixed(2);

  return (
    <div className="bg-[#023b3b] rounded-xl overflow-hidden shadow-2xl border border-[#d4af37]/20 group transition-all duration-300 hover:border-[#d4af37] relative">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[#d4af37] text-xs font-bold border border-[#d4af37]">
          {convertedPrice} {symbol}
        </div>
        <button 
          onClick={() => onCompare(product)}
          className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-md border transition-colors ${
            isComparing ? 'bg-[#d4af37] text-white border-white' : 'bg-black/60 text-[#d4af37] border-[#d4af37]'
          }`}
        >
          <i className="fas fa-columns text-xs"></i>
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-white">{product.name}</h3>
            <span className="text-[10px] text-[#d4af37] font-bold">عدد القطع: {product.piecesCount}</span>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[#d4af37] font-extrabold text-lg">{product.rating}</span>
             <span className="text-[8px] text-gray-400 uppercase">التقييم الكلي</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 text-[10px] text-gray-300">
            <span>قيم المنتج:</span>
            <span className="text-[#d4af37] font-bold">{userRating > 0 ? `${userRating} / 10` : ''}</span>
          </div>
          <div className="flex gap-1 h-2">
            {[...Array(10)].map((_, i) => {
              const ratingValue = i + 1;
              const isActive = ratingValue <= (hoverRating || userRating);
              return (
                <button
                  key={i}
                  className={`flex-1 rounded-sm transition-all duration-200 ${
                    isActive ? 'gold-gradient' : 'bg-black/40'
                  }`}
                  onMouseEnter={() => setHoverRating(ratingValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setUserRating(ratingValue)}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button 
            onClick={() => onViewDetails(product)}
            className="w-full py-2 bg-transparent border border-[#d4af37] text-[#d4af37] rounded-lg hover:bg-[#d4af37] hover:text-[#012b2b] transition-all font-semibold text-xs"
          >
            التفاصيل والمعاينة
          </button>
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full py-2 gold-gradient text-[#012b2b] rounded-lg hover:brightness-110 transition-all font-bold text-xs"
          >
            إضافة للسلة <i className="fas fa-shopping-cart mr-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
