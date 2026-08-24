import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { QuickContactBar } from './components/layout/QuickContactBar';
import { HomePage } from './components/pages/HomePage';
import { CatalogPage } from './components/pages/CatalogPage';
import { IndustriesPage } from './components/pages/IndustriesPage';
import { AboutPage } from './components/pages/AboutPage';
import { DeliveryPage } from './components/pages/DeliveryPage';
import { ContactsPage } from './components/pages/ContactsPage';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { RfqModal } from './components/modals/RfqModal';
import { SpecificationDrawer } from './components/modals/SpecificationDrawer';
import { PumpSelectorModal } from './components/modals/PumpSelectorModal';
import { CheckCircle2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, toastMessage } = useApp();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'catalog':
        return <CatalogPage />;
      case 'industries':
        return <IndustriesPage />;
      case 'about':
        return <AboutPage />;
      case 'delivery':
        return <DeliveryPage />;
      case 'contacts':
        return <ContactsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-[#004B93] selection:text-white">
      {/* Official SHIMGE Header */}
      <Header />

      {/* Main Catalog / Page Content */}
      <main className="flex-1">
        {renderActiveScreen()}
      </main>

      {/* Official SHIMGE Footer */}
      <Footer />

      {/* Floating Quick Action Contacts */}
      <QuickContactBar />

      {/* Modals & Hydraulic Calculators */}
      <ProductDetailModal />
      <PumpSelectorModal />
      <RfqModal />
      <SpecificationDrawer />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#004B93] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-blue-400/40 flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
