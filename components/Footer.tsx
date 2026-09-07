import React from 'react';
import { LogoIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="dark:bg-black bg-white border-t dark:border-gray-800 border-gray-200 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-cyan to-brand-pink rounded-lg flex items-center justify-center text-white">
                <LogoIcon className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold dark:text-white text-gray-900">
                TikSave<span className="text-brand-pink">Pro</span>
              </span>
            </div>
            <p className="dark:text-gray-400 text-gray-600 mb-6 max-w-md leading-relaxed">
              The fastest and most reliable tool to download TikTok videos without watermarks. 
              Designed for creators, fans, and social media managers.
            </p>
          </div>
          
          <div>
            <h3 className="dark:text-white text-gray-900 font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 dark:text-gray-400 text-gray-600">
              <li><a href="/" className="hover:text-brand-cyan transition-colors">Home</a></li>
              <li><a href="/faq" className="hover:text-brand-cyan transition-colors">FAQ & Guide</a></li>
              <li><a href="/blog" className="hover:text-brand-cyan transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="dark:text-white text-gray-900 font-bold mb-6">Support</h3>
            <ul className="space-y-4 dark:text-gray-400 text-gray-600">
              <li><a href="#" className="hover:text-brand-pink transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand-pink transition-colors">Report a Bug</a></li>
              <li><a href="#" className="hover:text-brand-pink transition-colors">API Access</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t dark:border-gray-900 border-gray-200 pt-8 text-center dark:text-gray-600 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} TikSave Pro. All rights reserved.</p>
          <p className="mt-2">This site is not affiliated with TikTok Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;