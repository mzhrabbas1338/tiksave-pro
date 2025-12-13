import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoIcon, MenuIcon, XIcon } from './Icons';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-cyan to-brand-pink rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-300">
              <LogoIcon className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              TikSave<span className="text-brand-pink">Pro</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={isActive('/')}>Home</NavLink>
            <NavLink to="/faq" active={isActive('/faq')}>Guide & FAQ</NavLink>
            <NavLink to="/blog" active={isActive('/blog')}>Blog</NavLink>
            <Link to="/install" className="bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-brand-cyan hover:text-black transition-all duration-300 shadow-lg hover:shadow-brand-cyan/50 transform hover:-translate-y-0.5">
              Install App
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <XIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-darker border-b border-gray-800">
          <div className="px-4 pt-2 pb-8 space-y-4">
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/faq" onClick={() => setIsMobileMenuOpen(false)}>Guide & FAQ</MobileNavLink>
            <MobileNavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</MobileNavLink>
            <Link to="/install" onClick={() => setIsMobileMenuOpen(false)} className="w-full block text-center mt-4 bg-gradient-to-r from-brand-cyan to-brand-pink text-black py-3 rounded-xl font-bold">
              Install App
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink: React.FC<{ to: string; active: boolean; children: React.ReactNode }> = ({ to, active, children }) => (
  <Link 
    to={to} 
    className={`relative px-2 py-1 font-medium transition-colors duration-300 ${active ? 'text-white' : 'text-gray-400 hover:text-white'}`}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-full shadow-[0_0_10px_rgba(0,242,234,0.7)]" />
    )}
  </Link>
);

const MobileNavLink: React.FC<{ to: string; onClick: () => void; children: React.ReactNode }> = ({ to, onClick, children }) => (
  <Link to={to} onClick={onClick} className="block text-lg text-gray-300 hover:text-white py-2 border-b border-gray-800">
    {children}
  </Link>
);

export default Navbar;