import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoIcon, MenuIcon, XIcon, SunIcon, MoonIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
            <div className="w-10 h-10 bg-gradient-to-br from-brand-cyan to-brand-pink rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-300 shadow-md">
              <LogoIcon className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r dark:from-white dark:to-gray-400 from-gray-900 to-gray-700">
              TikSave<span className="text-brand-pink">Pro</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={isActive('/')}>Home</NavLink>
            <NavLink to="/faq" active={isActive('/faq')}>Guide & FAQ</NavLink>
            <NavLink to="/blog" active={isActive('/blog')}>Blog</NavLink>
            
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-full bg-gray-200/80 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300/50 dark:border-white/10"
              title={theme === 'dark' ? 'Switch to White Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5 text-amber-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-indigo-600" />
              )}
            </button>
          </div>

          {/* Mobile Toggle & Theme Button */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-gray-200/80 dark:bg-white/10 text-gray-800 dark:text-gray-200"
            >
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5 text-amber-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-indigo-600" />
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white p-2"
            >
              {isMobileMenuOpen ? <XIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-brand-darker border-b border-gray-200 dark:border-gray-800 shadow-xl">
          <div className="px-4 pt-2 pb-8 space-y-4">
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/faq" onClick={() => setIsMobileMenuOpen(false)}>Guide & FAQ</MobileNavLink>
            <MobileNavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink: React.FC<{ to: string; active: boolean; children: React.ReactNode }> = ({ to, active, children }) => (
  <Link 
    to={to} 
    className={`relative px-2 py-1 font-medium transition-colors duration-300 ${active ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-full shadow-[0_0_10px_rgba(0,242,234,0.7)]" />
    )}
  </Link>
);

const MobileNavLink: React.FC<{ to: string; onClick: () => void; children: React.ReactNode }> = ({ to, onClick, children }) => (
  <Link 
    to={to} 
    onClick={onClick} 
    className="block text-lg font-bold text-slate-900 dark:text-gray-200 hover:text-brand-pink dark:hover:text-brand-cyan py-3.5 border-b border-slate-200/80 dark:border-gray-800 transition-colors min-h-[48px] flex items-center"
  >
    {children}
  </Link>
);

export default Navbar;