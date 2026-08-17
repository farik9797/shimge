import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { ProductCard } from '../catalog/ProductCard';
import { 
  ShoppingCart, Heart, ArrowLeftRight, CheckCircle2, ShieldCheck, 
  Clock, Truck, Zap, Share2, Star, FileText, ChevronRight, Send 
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    products, 
    addToCart, 
    formatPrice, 
    setRoute, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    toggleCompare,
    setQuickBuyProduct,
    showNotification 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  // Review Form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Товар не выбран</h2>
        <button
          onClick={() => setRoute('catalog')}
          className="mt-4 px-6 py-2 bg-orange-600 text-white font-bold rounded-xl text-xs"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  const mainImage = selectedImage || selectedProduct.image;
  const isWishlisted = wishlist.includes(selectedProduct.id);
  const isCompared = compareList.includes(selectedProduct.id);

  // Related products from same category or brand
  const relatedProducts = products
    .filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category)
    .slice(0, 4);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText || !reviewAuthor) return;
    
    selectedProduct.reviews.push({
      id: Math.random().toString(),
      author: reviewAuthor,
      rating: reviewRating,
      date: new Date().toLocaleDateString('ru-RU'),
      text: reviewText,
      verified: true
    });
    
    showNotification('Ваш отзыв успешно опубликован!', 'success');
    setReviewAuthor('');
    setReviewText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <button onClick={() => setRoute('home')} className="hover:text-slate-600">Главная</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => setRoute('catalog')} className="hover:text-slate-600">Каталог</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 font-bold truncate max-w-xs">{selectedProduct.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-6 h-96 flex items-center justify-center overflow-hidden">
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
              {selectedProduct.badge === 'DISCOUNT' && selectedProduct.discountPercent && (
                <span className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-black shadow">
                  -{selectedProduct.discountPercent}%
                </span>
              )}
              {selectedProduct.badge === 'HIT' && (
                <span className="px-3 py-1 rounded-lg bg-amber-500 text-white text-xs font-black shadow">
                  ХИТ ПРОДАЖ
                </span>
              )}
              {selectedProduct.badge === 'NEW' && (
                <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black shadow">
                  NEW
                </span>
              )}
            </div>

            <img
              src={mainImage}
              alt={selectedProduct.name}
              className="max-h-full max-w-full object-contain transition-all duration-300"
            />
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[selectedProduct.image, ...selectedProduct.additionalImages].map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-xl border-2 p-1 bg-slate-50 flex items-center justify-center shrink-0 transition-all ${
                  mainImage === img ? 'border-orange-600 shadow-md scale-95' : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="max-h-full max-w-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info & Purchase Block */}
        <div className="space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-orange-600 uppercase tracking-wider">{selectedProduct.brand}</span>
              <span>Артикул: {selectedProduct.sku}</span>
            </div>

            <h1 className="text-xl md:text-2xl font-black text-slate-900 mt-2 leading-snug">
              {selectedProduct.name}
            </h1>

            <div className="flex items-center gap-4 mt-3">
              <RatingStars rating={selectedProduct.rating} reviewsCount={selectedProduct.reviewsCount} />
              {selectedProduct.inStock ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> В наличии на складе ({selectedProduct.stockCount} шт.)
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> Под заказ (1-3 дня)
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed">
              {selectedProduct.shortDesc}
            </p>

            {/* Guarantees Box */}
            <div className="grid grid-cols-2 gap-3 mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block">Официальная гарантия</span>
                  <span className="text-slate-500">{selectedProduct.warrantyMonths} месяцев в Минске</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block">Доставка по РБ</span>
                  <span className="text-slate-500">Курьером DPD / Autolight</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Add to Cart */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block uppercase font-bold">Цена с НДС 20%:</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-900">
                    {formatPrice(selectedProduct.priceBYN * qty)}
                  </span>
                  {selectedProduct.oldPriceBYN && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(selectedProduct.oldPriceBYN * qty)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 font-bold text-slate-600 hover:text-black flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-xs">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 font-bold text-slate-600 hover:text-black flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(selectedProduct, qty)}
                className="py-3.5 px-6 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" /> Добавить в корзину
              </button>

              <button
                onClick={() => setQuickBuyProduct(selectedProduct)}
                className="py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-amber-400" /> Купить в 1 клик
              </button>
            </div>

            {/* Wishlist / Compare Row */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 pt-2">
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`flex items-center gap-1.5 hover:text-orange-600 ${
                  isWishlisted ? 'text-rose-600 font-bold' : ''
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                {isWishlisted ? 'В избранном' : 'В избранное'}
              </button>

              <button
                onClick={() => toggleCompare(selectedProduct.id)}
                className={`flex items-center gap-1.5 hover:text-orange-600 ${
                  isCompared ? 'text-orange-600 font-bold' : ''
                }`}
              >
                <ArrowLeftRight className="w-4 h-4" />
                {isCompared ? 'В сравнении' : 'Сравнить'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Tabs */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200">
        <div className="flex border-b border-slate-200 gap-6 text-sm font-bold text-slate-600 mb-6">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'desc' ? 'border-orange-600 text-orange-600' : 'border-transparent'
            }`}
          >
            Подробное описание
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'specs' ? 'border-orange-600 text-orange-600' : 'border-transparent'
            }`}
          >
            Технические характеристики ({selectedProduct.specs.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'reviews' ? 'border-orange-600 text-orange-600' : 'border-transparent'
            }`}
          >
            Отзывы ({selectedProduct.reviews.length})
          </button>
        </div>

        {/* Tab 1: Description */}
        {activeTab === 'desc' && (
          <div className="prose max-w-none text-xs leading-relaxed text-slate-700 space-y-4">
            <p>{selectedProduct.fullDesc}</p>
          </div>
        )}

        {/* Tab 2: Specs Table */}
        {activeTab === 'specs' && (
          <div className="divide-y divide-slate-100 border rounded-2xl overflow-hidden">
            {selectedProduct.specs.map((spec, idx) => (
              <div
                key={idx}
                className={`flex justify-between p-3.5 text-xs ${
                  idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                }`}
              >
                <span className="font-semibold text-slate-600">{spec.name}</span>
                <span className="font-bold text-slate-900">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="space-y-4">
              {selectedProduct.reviews.length === 0 ? (
                <p className="text-xs text-slate-500">
                  Пока нет отзывов на данный товар. Будьте первым!
                </p>
              ) : (
                selectedProduct.reviews.map(rev => (
                  <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-slate-900">{rev.author}</div>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <RatingStars rating={rev.rating} />
                    <p className="text-xs text-slate-700 leading-relaxed">{rev.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Leave Review Form */}
            <form onSubmit={handleAddReview} className="pt-6 border-t border-slate-200 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Оставить отзыв о товаре</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={reviewAuthor}
                  onChange={e => setReviewAuthor(e.target.value)}
                  placeholder="Ваше имя"
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-orange-500"
                />
                <select
                  value={reviewRating}
                  onChange={e => setReviewRating(Number(e.target.value))}
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none font-bold"
                >
                  <option value={5}>Оценка: 5 звезд</option>
                  <option value={4}>Оценка: 4 звезды</option>
                  <option value={3}>Оценка: 3 звезды</option>
                </select>
              </div>
              <textarea
                rows={3}
                required
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Ваш отзыв..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-orange-500 resize-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Опубликовать отзыв
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">С этим товаром также покупают</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
