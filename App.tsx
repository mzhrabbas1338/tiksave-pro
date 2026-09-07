import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FaqPage from './pages/FaqPage';
import BlogList from './pages/BlogList';
import BlogPostPage from './pages/BlogPost';
import AdminPanel from './pages/AdminPanel';
import { applySeoSettings } from './utils/seoManager';
import { syncGlobalStoreFromCloud } from './services/cloudSyncService';
import { recordPageView } from './services/analyticsService';
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider, useTheme } from './context/ThemeContext';

const RouteTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    recordPageView(location.pathname);
  }, [location.pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    syncGlobalStoreFromCloud();
    applySeoSettings();

    const handleStoreUpdate = () => {
      applySeoSettings();
    };

    window.addEventListener('tiksave_global_store_updated', handleStoreUpdate);
    return () => {
      window.removeEventListener('tiksave_global_store_updated', handleStoreUpdate);
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased selection:bg-brand-pink selection:text-white transition-colors duration-300 ${
      theme === 'dark' ? 'bg-brand-darker text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <RouteTracker />
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;