import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, FilterState, PageRoute, OrderData } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  route: PageRoute;
  setRoute: (route: PageRoute) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedProduct: Product | null;
  
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalBYN: number;
  cartTotalCount: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  compareList: string[];
  toggleCompare: (productId: string) => void;

  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  currency: 'BYN' | 'USD';
  toggleCurrency: () => void;
  formatPrice: (priceBYN: number) => string;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  isDataSyncOpen: boolean;
  setIsDataSyncOpen: (open: boolean) => void;

  isCallbackOpen: boolean;
  setIsCallbackOpen: (open: boolean) => void;

  quickBuyProduct: Product | null;
  setQuickBuyProduct: (product: Product | null) => void;

  notifications: Notification[];
  showNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeNotification: (id: string) => void;

  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;

  placedOrders: OrderData[];
  addPlacedOrder: (order: OrderData) => void;
}

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  searchQuery: '',
  priceRange: [0, 15000],
  selectedBrands: [],
  badges: [],
  onlyInStock: false,
  sortBy: 'popularity'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRouteState] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Cart stored in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mzvuk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mzvuk_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mzvuk_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [placedOrders, setPlacedOrders] = useState<OrderData[]>(() => {
    try {
      const saved = localStorage.getItem('mzvuk_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [currency, setCurrency] = useState<'BYN' | 'USD'>('BYN');
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDataSyncOpen, setIsDataSyncOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [quickBuyProduct, setQuickBuyProduct] = useState<Product | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('mzvuk_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mzvuk_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('mzvuk_compare', JSON.stringify(compareList));
    } catch (e) {
      console.error(e);
    }
  }, [compareList]);

  useEffect(() => {
    try {
      localStorage.setItem('mzvuk_orders', JSON.stringify(placedOrders));
    } catch (e) {
      console.error(e);
    }
  }, [placedOrders]);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const setRoute = (newRoute: PageRoute) => {
    setRouteState(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProduct = products.find(p => p.id === selectedProductId) || null;

  const addToCart = (product: Product, quantity = 1) => {
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
    showNotification(`«${product.name.slice(0, 30)}...» добавлен в корзину!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showNotification('Товар удален из корзины', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
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

  const cartTotalBYN = cart.reduce(
    (sum, item) => sum + item.product.priceBYN * item.quantity,
    0
  );

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showNotification('Удалено из избранного', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showNotification('Добавлено в избранное', 'success');
        return [...prev, productId];
      }
    });
  };

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showNotification('Удалено из сравнения', 'info');
        return prev.filter(id => id !== productId);
      } else {
        if (prev.length >= 4) {
          showNotification('Максимум 4 товара для сравнения', 'error');
          return prev;
        }
        showNotification('Добавлено в список сравнения', 'success');
        return [...prev, productId];
      }
    });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const toggleCurrency = () => {
    setCurrency(prev => (prev === 'BYN' ? 'USD' : 'BYN'));
  };

  const formatPrice = (priceBYN: number): string => {
    if (currency === 'USD') {
      const usd = priceBYN / 3.25;
      return `$${usd.toFixed(0)}`;
    }
    return `${priceBYN.toLocaleString('ru-RU')} BYN`;
  };

  const addPlacedOrder = (order: OrderData) => {
    setPlacedOrders(prev => [order, ...prev]);
    clearCart();
  };

  return (
    <AppContext.Provider
      value={{
        route,
        setRoute,
        selectedProductId,
        setSelectedProductId,
        selectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalBYN,
        cartTotalCount,
        wishlist,
        toggleWishlist,
        compareList,
        toggleCompare,
        filters,
        setFilters,
        resetFilters,
        currency,
        toggleCurrency,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        isDataSyncOpen,
        setIsDataSyncOpen,
        isCallbackOpen,
        setIsCallbackOpen,
        quickBuyProduct,
        setQuickBuyProduct,
        notifications,
        showNotification,
        removeNotification,
        products,
        setProducts,
        placedOrders,
        addPlacedOrder
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
