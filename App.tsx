import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FaqPage from './pages/FaqPage';
import BlogList from './pages/BlogList';
import BlogPostPage from './pages/BlogPost';
import InstallApp from './pages/InstallApp';
import { Analytics } from "@vercel/analytics/react"
const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-brand-darker text-white min-h-screen flex flex-col font-sans antialiased selection:bg-brand-pink selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/install" element={<InstallApp />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </main>
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
};

export default App;