import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { CatalogPage } from './components/catalog/CatalogPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { ServicesPage } from './components/services/ServicesPage';
import { AboutPage } from './components/about/AboutPage';
import { CertificatesPage } from './components/certificates/CertificatesPage';
import { NewsArticlesPage } from './components/news/NewsArticlesPage';
import { FAQPage } from './components/faq/FAQPage';
import { PartnersPage } from './components/partners/PartnersPage';
import { ContactsPage } from './components/contacts/ContactsPage';
import { DeliveryPage } from './components/delivery/DeliveryPage';
import { CartPage } from './components/cart/CartPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { ComparePage } from './components/compare/ComparePage';
import { CallbackModal } from './components/common/CallbackModal';
import { QuickBuyModal } from './components/common/QuickBuyModal';
import { NotificationToast } from './components/common/NotificationToast';
import { DataSyncModal } from './components/admin/DataSyncModal';

const AppContent: React.FC = () => {
  const { route } = useApp();

  const renderRoute = () => {
    switch (route) {
      case 'home':
        return <HomePage />;
      case 'catalog':
        return <CatalogPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'services':
        return <ServicesPage />;
      case 'about':
        return <AboutPage />;
      case 'certificates':
        return <CertificatesPage />;
      case 'news':
      case 'articles':
        return <NewsArticlesPage />;
      case 'faq':
        return <FAQPage />;
      case 'partners':
        return <PartnersPage />;
      case 'contacts':
        return <ContactsPage />;
      case 'delivery':
        return <DeliveryPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <Header />

      <main className="flex-1">
        {renderRoute()}
      </main>

      <Footer />

      {/* Overlays & Modals */}
      <CartDrawer />
      <CallbackModal />
      <QuickBuyModal />
      <DataSyncModal />
      <NotificationToast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
