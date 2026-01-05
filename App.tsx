
import React, { useState, useMemo } from 'react';
import { Product, CartItem, ShippingType, User, PaymentMethod } from './types';
import { CONTACT_INFO } from './constants';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import ContactPage from './components/ContactPage';
import ShippingServicesPage from './components/ShippingServicesPage';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'صالون الملكي الكلاسيكي',
    price: 85000,
    rating: 9.5,
    images: ['https://picsum.photos/seed/salon1/800/600', 'https://picsum.photos/seed/salon1-2/800/600'],
    description: 'صالون فاخر من الخشب الزان الأحمر الروماني بنقوش يدوية.',
    features: ['خشب زان أحمر', 'ضمان 10 سنوات'],
    colors: ['ذهبي', 'نبيتي'],
    woodPaints: ['ذهبي'],
    piecesCount: 5
  },
  {
    id: '2',
    name: 'صالون مودرن جولد',
    price: 62000,
    rating: 8.8,
    images: ['https://picsum.photos/seed/salon2/800/600', 'https://picsum.photos/seed/salon2-2/800/600'],
    description: 'تصميم عصري يجمع بين البساطة والفخامة.',
    features: ['إسفنج سوبر سوفت'],
    colors: ['رمادي', 'أبيض'],
    woodPaints: ['شامبين'],
    piecesCount: 6
  },
  {
    id: '3',
    name: 'صالون القصر الدمياطي',
    price: 110000,
    rating: 9.9,
    images: ['https://picsum.photos/seed/salon3/800/600', 'https://picsum.photos/seed/salon3-2/800/600'],
    description: 'أرقى أنواع الصالونات الدمياطية المحفورة يدوياً.',
    features: ['حفر يدوي بارز'],
    colors: ['بيج'],
    woodPaints: ['بني مطعم بذهب'],
    piecesCount: 7
  }
];

const CURRENCY_RATES: Record<string, { rate: number, symbol: string }> = {
  'مصر': { rate: 1, symbol: 'ج.م' },
  'السعودية': { rate: 0.076, symbol: 'ر.س' },
  'الإمارات': { rate: 0.074, symbol: 'د.إ' },
  'أمريكا': { rate: 0.020, symbol: '$' },
  'أخرى': { rate: 0.020, symbol: '$' }
};

const App: React.FC = () => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'contact' | 'shipping' | 'auth' | 'admin'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [comparingIds, setComparingIds] = useState<string[]>([]);
  
  const [shippingMethod, setShippingMethod] = useState<ShippingType>(ShippingType.SHARED_TRUCK);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.DEPOSIT_AND_COD);

  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(200000);
  const [selectedPieces, setSelectedPieces] = useState<number | null>(null);

  const minPriceAvailable = useMemo(() => Math.min(...products.map(p => p.price)), [products]);

  const currentRate = currentUser ? CURRENCY_RATES[currentUser.country]?.rate || 1 : 1;
  const currentSymbol = currentUser ? CURRENCY_RATES[currentUser.country]?.symbol || 'ج.م' : 'ج.م';

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.includes(searchQuery) || p.description.includes(searchQuery);
      const matchesPrice = p.price <= maxPrice;
      const matchesPieces = selectedPieces ? p.piecesCount === selectedPieces : true;
      return matchesSearch && matchesPrice && matchesPieces;
    });
  }, [searchQuery, maxPrice, selectedPieces, products]);

  const addToCart = (product: Product, custom: any) => {
    const item: CartItem = { ...product, ...custom, quantity: 1 };
    setCart(prev => [...prev, item]);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (idx: number) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0) * currentRate;

  const getShippingMessage = () => {
    switch (shippingMethod) {
      case ShippingType.DOMESTIC_PRIVATE:
        return { text: "يتوقع أن تبلغ تكلفة الشحن من 1000 جنيه إلى 5000 جنيه مصري حسب مكان التوصيل.", type: 'info' };
      case ShippingType.SHARED_TRUCK:
        return { text: "تكلفة الشحن المجمعة تتراوح من 500 إلى 3000 جنيه حسب المكان وتوافر الطلبات في منطقتك.", type: 'info' };
      case ShippingType.EXPORT:
        return { text: "سيتم التواصل معكم قريباً عن طريق مكتب الشحن الدولي المناسب لبلدكم لتحديد التكاليف والمواعيد.", type: 'success' };
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-capitone flex flex-col">
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-[#d4af37]/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-10 h-10 border border-[#d4af37] rounded flex items-center justify-center bg-black/20 overflow-hidden">
                <i className="fas fa-couch text-[#d4af37] text-lg"></i>
              </div>
              <h1 className="text-xl font-black gold-text">CAPITONE</h1>
            </div>
            
            <div className="flex gap-3 text-sm font-bold">
              <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'text-[#d4af37]' : 'text-gray-400'}>الرئيسية</button>
              <button onClick={() => setCurrentPage('shipping')} className={currentPage === 'shipping' ? 'text-[#d4af37]' : 'text-gray-400'}>الشحن</button>
              <button onClick={() => setCurrentPage('contact')} className={currentPage === 'contact' ? 'text-[#d4af37]' : 'text-gray-400'}>تواصل</button>
            </div>
          </div>

          <div className="relative w-full md:max-w-md">
            <input 
              type="text" 
              placeholder="ابحث عن صالون..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-[#d4af37]/30 rounded-full py-2 px-10 text-sm text-white focus:border-[#d4af37] outline-none"
            />
            <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-[#d4af37]"></i>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsCartOpen(true)} className="relative text-[#d4af37]">
              <i className="fas fa-shopping-basket text-xl"></i>
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
            </button>
            <button 
              onClick={() => currentUser ? setCurrentUser(null) : setCurrentPage('auth')}
              className="text-xs font-bold border border-[#d4af37] px-3 py-1 rounded-full text-[#d4af37]"
            >
              {currentUser ? `أهلاً، ${currentUser.firstName}` : 'تسجيل دخول'}
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-grow">
        {currentPage === 'home' && (
          <>
            <header className="relative h-[65vh] flex flex-col items-center justify-center text-center overflow-hidden border-b-4 border-[#d4af37]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-[#012b2b]/80 backdrop-brightness-75"></div>
              
              <div className="relative z-10 px-4 flex flex-col items-center gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-[#d4af37] flex items-center justify-center rounded-sm bg-black/40">
                    <i className="fas fa-couch text-[#d4af37] text-4xl md:text-6xl"></i>
                  </div>
                  <div className="text-right">
                    <h1 className="text-4xl md:text-7xl font-black gold-text tracking-wider uppercase leading-none">CAPITONE</h1>
                    <h2 className="text-xl md:text-3xl font-light text-[#d4af37] tracking-[0.2em] mt-2">FURNITURE FACTORY</h2>
                  </div>
                </div>

                <div className="w-full max-w-2xl h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-2"></div>
                
                <p className="text-gray-300 text-sm md:text-lg font-medium opacity-90">
                  مصنع كابتونيه للأثاث (صالون & أنتريه)
                </p>

                <div className="mt-4 bg-[#d4af37] text-[#012b2b] px-8 py-3 rounded-full font-black text-lg md:text-2xl shadow-[0_0_20px_rgba(212,175,55,0.4)] transform hover:scale-105 transition-transform duration-300">
                  من المصنع للعميل مباشرة بسعر التاجر
                </div>
              </div>
              
              <div className="absolute bottom-0 w-full h-8 bg-[repeating-linear-gradient(45deg,#d4af37,#d4af37_10px,#012b2b_10px,#012b2b_20px)] opacity-20"></div>
            </header>

            <main className="max-w-7xl mx-auto py-12 px-4">
              <div className="bg-white/5 p-6 rounded-2xl mb-8 border border-white/10 flex flex-wrap items-end gap-8">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs text-[#d4af37] mb-2 font-bold">تصفية حسب السعر (حتى: {maxPrice.toLocaleString()} ج.م)</label>
                  <input 
                    type="range" 
                    min={minPriceAvailable} 
                    max={200000} 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full accent-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#d4af37] mb-2 font-bold">عدد القطع:</label>
                  <div className="flex gap-2">
                    {[5, 6, 7].map(n => (
                      <button 
                        key={n}
                        onClick={() => setSelectedPieces(selectedPieces === n ? null : n)}
                        className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all ${selectedPieces === n ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-white/10 text-gray-400'}`}
                      >
                        {n} قطع
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {filteredProducts.map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onViewDetails={setSelectedProduct} 
                    onAddToCart={() => setSelectedProduct(p)} 
                    onCompare={(prod) => setComparingIds(prev => prev.includes(prod.id) ? prev.filter(i => i !== prod.id) : [...prev, prod.id])}
                    isComparing={comparingIds.includes(p.id)}
                    rate={currentRate}
                    symbol={currentSymbol}
                  />
                ))}
              </div>
            </main>
          </>
        )}

        {currentPage === 'auth' && <AuthComponent onLogin={(user) => { setCurrentUser(user); setCurrentPage('home'); }} />}
        {currentPage === 'shipping' && <ShippingServicesPage />}
        {currentPage === 'contact' && <ContactPage />}
      </div>

      <footer className="bg-black/60 border-t border-[#d4af37]/30 pt-16 pb-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-right">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-3xl font-black gold-text tracking-tighter uppercase leading-none">CAPITONE FURNITURE</h3>
            <p className="text-gray-400 leading-relaxed text-sm max-w-md">
              من قلب مدينة دمياط العريقة، نُقدم لكم فخامة الأثاث اليدوي المصنوع بأجود أنواع الخشب الزان. متحصصون في أطقم الصالون والأنتريه بخدمة تفصيل حسب الطلب.
            </p>
            <div className="flex gap-4">
              <a href={CONTACT_INFO.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all border border-white/10 shadow-lg">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all border border-white/10 shadow-lg">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href={`tel:${CONTACT_INFO.phone}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all border border-white/10 shadow-lg">
                <i className="fas fa-phone"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[#d4af37] font-bold mb-6 text-lg border-b border-[#d4af37]/20 pb-2">روابط سريعة</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-[#d4af37] transition-colors">المعرض الرئيسي</button></li>
              <li><button onClick={() => setCurrentPage('shipping')} className="hover:text-[#d4af37] transition-colors">خدمات الشحن المجمعة</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-[#d4af37] transition-colors">تواصل مع الإدارة</button></li>
              <li><button onClick={() => setIsCartOpen(true)} className="hover:text-[#d4af37] transition-colors">سلة المشتريات</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#d4af37] font-bold mb-6 text-lg border-b border-[#d4af37]/20 pb-2">اتصل بالمصنع</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-[#d4af37] mt-1"></i>
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-truck-moving text-[#d4af37]"></i>
                <span>تصدير دولي متاح لجميع الدول</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-id-card text-[#d4af37]"></i>
                <span>سعر المصنع مباشرة للعملاء</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-medium tracking-widest">
          <p>جميع الحقوق محفوظة &copy; 2025 مصنع كابتونيه للأثاث - CAPITONE FURNITURE</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white transition-colors">سياسة الخصوصية</span>
            <span className="cursor-pointer hover:text-white transition-colors">شروط الاستخدام</span>
            <span className="cursor-pointer hover:text-white transition-colors">دمياط - الشعراء</span>
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-[#012b2b] h-full shadow-2xl p-6 border-r border-[#d4af37] overflow-y-auto">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold gold-text">مراجعة طلبك</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-2xl text-[#d4af37]">&times;</button>
             </div>
             
             {cart.length === 0 ? <p className="text-center text-gray-500">سلتك فارغة</p> : (
               <div className="space-y-6">
                 {cart.map((item, i) => (
                   <div key={i} className="flex gap-4 bg-black/40 p-3 rounded-lg border border-white/5">
                     <img src={item.images[0]} className="w-16 h-16 object-cover rounded" alt={item.name} />
                     <div className="flex-1">
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-[10px] text-gray-400">القماش: {item.customFabric || 'الأصلي'} | الدهان: {item.customPaint || 'الأصلي'}</p>
                        <p className="text-xs text-[#d4af37] mt-1">{(item.price * currentRate).toFixed(2)} {currentSymbol}</p>
                     </div>
                     <button onClick={() => removeFromCart(i)} className="text-red-500"><i className="fas fa-trash-alt text-xs"></i></button>
                   </div>
                 ))}

                 <div className="border-t border-white/10 pt-4 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#d4af37] mb-2">طريقة الشحن المطلوبة:</label>
                      <select 
                        value={shippingMethod}
                        onChange={(e) => setShippingMethod(e.target.value as ShippingType)}
                        className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-xs text-white mb-2"
                      >
                        {Object.values(ShippingType).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                      
                      {/* Shipping Logic Message */}
                      {getShippingMessage() && (
                        <div className={`p-3 rounded-lg border text-[10px] leading-relaxed transition-all duration-300 ${
                          getShippingMessage()?.type === 'success' 
                            ? 'bg-green-900/20 border-green-500/50 text-green-400' 
                            : 'bg-black/30 border-[#d4af37]/30 text-gray-300 italic'
                        }`}>
                          <i className={`fas ${getShippingMessage()?.type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} ml-2 text-[#d4af37]`}></i>
                          {getShippingMessage()?.text}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#d4af37] mb-2">طريقة الدفع:</label>
                      <select 
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-xs text-white"
                      >
                        {Object.values(PaymentMethod).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>

                    <div className="flex justify-between text-lg font-bold p-4 bg-black/20 rounded-xl">
                      <span>الإجمالي:</span>
                      <span className="gold-text">{cartTotal.toFixed(2)} {currentSymbol}</span>
                    </div>

                    <button 
                      className="w-full py-4 gold-gradient text-[#012b2b] rounded-xl font-black text-lg hover:scale-[1.02] transition-transform"
                      onClick={() => alert(`تم تأكيد الطلب بنجاح!\nطريقة الشحن: ${shippingMethod}\nطريقة الدفع: ${paymentMethod}\nسيتم التواصل معكم من قبل خدمة عملاء مصنع كابتونيه.`)}
                    >
                      تأكيد الطلب وإرساله للمصنع
                    </button>
                 </div>
               </div>
             )}
          </div>
        </div>
      )}

      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onConfirmOrder={(custom) => addToCart(selectedProduct, custom)}
          currency={currentSymbol}
          rate={currentRate}
        />
      )}
    </div>
  );
};

const AuthComponent: React.FC<{ onLogin: (u: User) => void }> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', country: 'مصر', gov: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isAdmin = formData.email === 'admin@capitone.com' && formData.password === '123456';
    onLogin({ 
      ...formData, 
      governorate: formData.gov, 
      currency: 'EGP', 
      isAdmin,
      firstName: formData.firstName || 'مستخدم',
      lastName: formData.lastName || 'جديد'
    });
  };

  return (
    <div className="max-w-md mx-auto bg-[#023b3b] p-8 rounded-3xl border border-[#d4af37]/30 shadow-2xl mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center gold-text">{isRegister ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        {isRegister && (
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="الاسم الأول" required className="bg-black/20 border border-white/10 p-2 rounded w-full text-white" onChange={e => setFormData({...formData, firstName: e.target.value})} />
            <input type="text" placeholder="الاسم الثاني" required className="bg-black/20 border border-white/10 p-2 rounded w-full text-white" onChange={e => setFormData({...formData, lastName: e.target.value})} />
          </div>
        )}
        <input type="email" placeholder="البريد الإلكتروني" required className="bg-black/20 border border-white/10 p-2 rounded w-full text-white" onChange={e => setFormData({...formData, email: e.target.value})} />
        {isRegister && (
          <>
            <input type="tel" placeholder="رقم الهاتف" required className="bg-black/20 border border-white/10 p-2 rounded w-full text-white" onChange={e => setFormData({...formData, phone: e.target.value})} />
            <select className="bg-black/20 border border-white/10 p-2 rounded w-full text-gray-300" onChange={e => setFormData({...formData, country: e.target.value})}>
              <option value="مصر">مصر</option>
              <option value="السعودية">السعودية</option>
              <option value="الإمارات">الإمارات</option>
              <option value="أمريكا">أمريكا</option>
              <option value="أخرى">دولة أخرى</option>
            </select>
            <input type="text" placeholder="المحافظة" required className="bg-black/20 border border-white/10 p-2 rounded w-full text-white" onChange={e => setFormData({...formData, gov: e.target.value})} />
          </>
        )}
        <input type="password" placeholder="كلمة السر" required className="bg-black/20 border border-white/10 p-2 rounded w-full text-white" onChange={e => setFormData({...formData, password: e.target.value})} />
        <button className="w-full py-3 gold-gradient text-[#012b2b] rounded-xl font-bold mt-4">
          {isRegister ? 'إتمام التسجيل' : 'دخول'}
        </button>
      </form>
      <button className="w-full mt-4 text-xs text-[#d4af37] underline" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'لديك حساب بالفعل؟ سجل دخول' : 'ليس لديك حساب؟ أنشئ حساباً الآن'}
      </button>
    </div>
  );
};

export default App;
