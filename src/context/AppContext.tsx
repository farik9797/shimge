import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CatalogFilterState, PageTab, ShimgeCategoryType, ShimgeSeries } from '../types';

interface AppContextType {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isRfqOpen: boolean;
  setIsRfqOpen: (open: boolean) => void;
  rfqTargetProduct: Product | null;
  openRfqModal: (product?: Product) => void;
  isPumpSelectorOpen: boolean;
  setIsPumpSelectorOpen: (open: boolean) => void;
  selectedIndustryId: 'water-supply' | 'agriculture' | 'hvac' | 'sewage' | 'industry';
  setSelectedIndustryId: (id: 'water-supply' | 'agriculture' | 'hvac' | 'sewage' | 'industry') => void;
  filters: CatalogFilterState;
  setFilters: React.Dispatch<React.SetStateAction<CatalogFilterState>>;
  resetFilters: () => void;
  selectCategory: (category: ShimgeCategoryType) => void;
  selectSeries: (series: ShimgeSeries) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const initialFilters: CatalogFilterState = {
  category: 'all',
  series: [],
  inStockOnly: false,
  minPowerKw: 0,
  maxPowerKw: 25,
  minHeadMeters: 0,
  maxHeadMeters: 200,
  minFlowRate: 0,
  maxFlowRate: 60,
  casingMaterial: [],
  searchQuery: '',
  sortBy: 'popular',
  viewMode: 'grid'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shimge_spec_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [rfqTargetProduct, setRfqTargetProduct] = useState<Product | null>(null);
  const [isPumpSelectorOpen, setIsPumpSelectorOpen] = useState(false);
  const [selectedIndustryId, setSelectedIndustryId] = useState<'water-supply' | 'agriculture' | 'hvac' | 'sewage' | 'industry'>('water-supply');
  const [filters, setFilters] = useState<CatalogFilterState>(initialFilters);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('shimge_spec_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Насос SHIMGE ${product.name.slice(0, 30)}... добавлен в спецификацию`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openRfqModal = (product?: Product) => {
    setRfqTargetProduct(product || null);
    setIsRfqOpen(true);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const selectCategory = (category: ShimgeCategoryType) => {
    setFilters(prev => ({
      ...prev,
      category,
      series: [],
      searchQuery: ''
    }));
    setActiveTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectSeries = (seriesName: ShimgeSeries) => {
    setFilters(prev => ({
      ...prev,
      category: 'all',
      series: [seriesName],
      searchQuery: ''
    }));
    setActiveTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isRfqOpen,
        setIsRfqOpen,
        rfqTargetProduct,
        openRfqModal,
        isPumpSelectorOpen,
        setIsPumpSelectorOpen,
        selectedIndustryId,
        setSelectedIndustryId,
        filters,
        setFilters,
        resetFilters,
        selectCategory,
        selectSeries,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
