import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDownIcon } from '../components/Icons';
import { FaqItem } from '../types';
import { useSeoSettings } from '../utils/seoManager';

const defaultExtendedFaqs: FaqItem[] = [
  {
    category: "General",
    question: "Is TikSave Pro really 100% free?",
    answer: "Yes! TikSave Pro is completely free to use. There are no registrations, no subscription fees, no credit card requirements, and no daily download limits."
  },
  {
    category: "General",
    question: "Do I need a TikTok account or login to download videos?",
    answer: "No account required! You don't need to log in to TikTok or link your personal profile. Just copy any public video link and paste it into TikSave Pro."
  },
  {
    category: "General",
    question: "Is it legal to download TikTok videos for personal use?",
    answer: "Downloading TikTok videos for personal offline viewing or reference is legal. However, if you plan to re-post or use the content publicly, always credit the original creator and observe copyright laws."
  },
  {
    category: "Devices & OS",
    question: "How do I download TikTok videos on iPhone / iPad (iOS)?",
    answer: "On iOS 13 or newer: Open the TikTok app, tap 'Share' -> 'Copy Link'. Open Safari, visit TikSave Pro, paste the link in the search box, and hit Download. Tap the Download icon in Safari to view or save to your Photos app."
  },
  {
    category: "Devices & OS",
    question: "How do I download TikTok videos on Android devices?",
    answer: "Open TikTok, tap 'Share' -> 'Copy Link'. Open Chrome or any web browser, go to TikSave Pro, paste the link, and tap 'Download'. The MP4 file will save directly to your phone's Gallery or Downloads folder."
  },
  {
    category: "Devices & OS",
    question: "Can I download TikTok videos on Windows PC or Mac?",
    answer: "Yes! TikSave Pro works seamlessly on all desktop browsers (Chrome, Edge, Safari, Firefox, Opera). Simply paste the video link into the search bar and download in 1-click."
  },
  {
    category: "Devices & OS",
    question: "Where are the downloaded videos saved on my device?",
    answer: "On smartphones (iOS & Android), files are saved in your browser's 'Downloads' folder or Files app. On desktop computers (PC/Mac), videos are saved into your default 'Downloads' folder."
  },
  {
    category: "Quality & Formats",
    question: "Why is there no watermark on downloaded videos?",
    answer: "TikSave Pro accesses TikTok's high-definition CDN stream directly to extract the raw video source before the platform applies its logo overlay and watermark."
  },
  {
    category: "Quality & Formats",
    question: "What video resolutions and formats are supported?",
    answer: "We support HD (720p), Full HD (1080p), and original source resolutions in standard MP4 format. You can also extract MP3 audio files."
  },
  {
    category: "Quality & Formats",
    question: "Can I extract MP3 audio or background music from TikTok?",
    answer: "Yes! Once you paste the link, select the MP3 Audio option from the format selector to save only the original background sound or song."
  },
  {
    category: "Quality & Formats",
    question: "Does TikSave Pro support photo slideshow & photo carousel posts?",
    answer: "Yes, TikSave Pro fully supports photo posts! You can download all high-resolution images from any TikTok photo slideshow."
  },
  {
    category: "Privacy & Safety",
    question: "Does TikSave Pro store or track my downloaded videos?",
    answer: "Never. We respect user privacy 100%. We do not host, save, or mirror any downloaded videos on our servers, nor do we track download histories."
  },
  {
    category: "Privacy & Safety",
    question: "Is TikSave Pro safe and free from viruses or spyware?",
    answer: "Yes, 100% safe. TikSave Pro is entirely web-based and requires no app installation, no browser extension permissions, and no file downloads other than your requested video."
  },
  {
    category: "Troubleshooting",
    question: "Why am I getting a 'Video Not Found' or error message?",
    answer: "This usually happens if: 1) The TikTok user account is set to private. 2) The video was deleted. 3) The link URL was copied incomplete. Ensure the link starts with 'https://www.tiktok.com/' or 'https://vm.tiktok.com/'."
  },
  {
    category: "Troubleshooting",
    question: "What should I do if the video plays in a new tab instead of downloading?",
    answer: "If your browser plays the video inline, right-click (or tap and hold on mobile) on the video player window and click 'Save Video As...' or 'Download Video'."
  }
];

const categories = ["All", "General", "Devices & OS", "Quality & Formats", "Privacy & Safety", "Troubleshooting"];

const FaqPage: React.FC = () => {
  const seo = useSeoSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeGuideTab, setActiveGuideTab] = useState<'ios' | 'android' | 'pc'>('ios');

  useEffect(() => {
    if (seo.faqPageTitle) {
      document.title = seo.faqPageTitle;
    }
    if (seo.faqPageMetaDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', seo.faqPageMetaDescription);
      }
    }
  }, [seo.faqPageTitle, seo.faqPageMetaDescription]);

  const activeFaqs = useMemo(() => {
    if (seo.faqsList && seo.faqsList.length > 0) {
      return seo.faqsList;
    }
    return defaultExtendedFaqs;
  }, [seo.faqsList]);

  const filteredFaqs = useMemo(() => {
    return activeFaqs.filter(faq => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFaqs, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
           <span className="text-brand-cyan font-bold tracking-wider uppercase text-sm mb-4 inline-block px-4 py-1.5 rounded-full dark:bg-brand-cyan/10 bg-brand-cyan/10 border border-brand-cyan/20">
             {seo.faqBadge || 'Help Center & Knowledge Base'}
           </span>
           <h1 className="text-4xl md:text-6xl font-extrabold mb-6 dark:text-white text-gray-900 leading-tight">
             {seo.faqH1Line1 || 'Frequently Asked'} <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-purple-500 to-brand-pink">
               {seo.faqH1Gradient || 'Questions'}
             </span>
           </h1>
           <p className="dark:text-gray-400 text-gray-600 text-lg max-w-2xl mx-auto">
             {seo.faqSubtitle || 'Find quick answers to common questions about downloading TikTok videos without watermarks.'}
           </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 sm:mb-10 max-w-2xl mx-auto relative">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., iPhone, MP3, watermark, error)..."
              className="w-full h-14 pl-12 pr-10 rounded-2xl dark:bg-brand-surface bg-white border dark:border-white/15 border-slate-300 dark:text-white text-slate-900 dark:placeholder-gray-500 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan shadow-lg text-base transition-all font-medium"
            />
            <svg className="w-6 h-6 absolute left-4 dark:text-gray-400 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-bold dark:bg-gray-800 bg-slate-100 dark:text-gray-300 text-slate-700 hover:text-red-500 px-2.5 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 min-h-[44px] ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-brand-cyan to-brand-pink text-white shadow-md scale-105'
                  : 'dark:bg-white/10 bg-slate-200/80 dark:text-gray-200 text-slate-800 hover:bg-slate-300 dark:hover:bg-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-20">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200 rounded-3xl p-8">
              <p className="text-xl font-bold dark:text-white text-gray-800 mb-2">No matching questions found</p>
              <p className="dark:text-gray-400 text-gray-600 mb-6">Try adjusting your search terms or selecting a different category.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="px-6 py-2.5 bg-brand-cyan text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <FaqAccordion key={index} item={faq} />
            ))
          )}
        </div>

        {/* Step-by-Step Platform Download Guides */}
        <div className="mt-20 dark:bg-brand-surface bg-white rounded-3xl p-6 md:p-10 border dark:border-white/10 border-gray-200 shadow-xl">
          <div className="text-center mb-8">
            <span className="text-brand-pink font-bold text-xs uppercase tracking-widest block mb-2">Detailed Walkthrough</span>
            <h2 className="text-2xl md:text-4xl font-bold dark:text-white text-gray-900">How to Download by Device</h2>
          </div>

          {/* Guide Selector Tabs */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveGuideTab('ios')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeGuideTab === 'ios'
                  ? 'bg-brand-pink text-white shadow-md'
                  : 'dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-700 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              📱 iPhone / iPad (iOS)
            </button>
            <button
              onClick={() => setActiveGuideTab('android')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeGuideTab === 'android'
                  ? 'bg-brand-cyan text-black shadow-md'
                  : 'dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-700 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              🤖 Android Phone
            </button>
            <button
              onClick={() => setActiveGuideTab('pc')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeGuideTab === 'pc'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-700 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              💻 Windows & Mac PC
            </button>
          </div>

          {/* Guide Contents */}
          {activeGuideTab === 'ios' && (
            <div className="space-y-6">
              <GuideStep number="1" title="Open TikTok App" text="Launch TikTok on your iPhone or iPad, find your desired video, tap the 'Share' arrow icon." />
              <GuideStep number="2" title="Copy Video Link" text="Select 'Copy Link' from the menu options to copy the video URL to your clipboard." />
              <GuideStep number="3" title="Paste on TikSave Pro" text="Open Safari browser, visit TikSave Pro, paste the link in the input box, and tap Download." />
              <GuideStep number="4" title="Save to Photos" text="Tap the Safari downloads manager icon, select the downloaded MP4 video, tap Share -> Save Video." />
            </div>
          )}

          {activeGuideTab === 'android' && (
            <div className="space-y-6">
              <GuideStep number="1" title="Find Video on TikTok" text="Open the TikTok Android app and tap the 'Share' icon on the right side of the screen." />
              <GuideStep number="2" title="Copy Link" text="Tap 'Copy Link' to copy the video URL." />
              <GuideStep number="3" title="Open Chrome & Download" text="Launch Chrome browser, go to TikSave Pro, paste your link into the bar, and tap 'Download'." />
              <GuideStep number="4" title="Check Files / Gallery" text="The watermark-free MP4 video will automatically be available in your Phone Gallery or My Files app." />
            </div>
          )}

          {activeGuideTab === 'pc' && (
            <div className="space-y-6">
              <GuideStep number="1" title="Copy Link from Browser" text="Open TikTok on your web browser (or app), open the video, and copy the URL from your address bar or click Share -> Copy Link." />
              <GuideStep number="2" title="Paste URL" text="Open TikSave Pro in any browser tab and paste the link into the search box." />
              <GuideStep number="3" title="Select Resolution & Save" text="Click Download, choose your preferred format (MP4 HD or MP3 Audio), and click Download Video." />
              <GuideStep number="4" title="Open Downloads Folder" text="Your clean video will instantly download directly into your desktop's Downloads folder." />
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-16 text-center dark:bg-gradient-to-r dark:from-brand-cyan/10 dark:to-brand-pink/10 bg-gradient-to-r from-blue-50 to-pink-50 border dark:border-white/10 border-gray-200 rounded-3xl p-8">
          <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">Still have questions?</h3>
          <p className="dark:text-gray-400 text-gray-600 mb-6">Can't find the answer you're looking for? Reach out to our support team.</p>
          <a 
            href="/blog" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-brand-cyan to-brand-pink text-black font-bold rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5"
          >
            Read Our Blog & Tips
          </a>
        </div>
      </div>
    </div>
  );
};

const FaqAccordion: React.FC<{ item: FaqItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border dark:border-white/10 border-gray-200 rounded-2xl dark:bg-white/[0.02] bg-white shadow-sm overflow-hidden transition-all duration-300 dark:hover:border-white/20 hover:border-gray-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-3">
          {item.category && (
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full dark:bg-white/10 bg-gray-100 text-brand-pink uppercase tracking-wider hidden sm:inline-block">
              {item.category}
            </span>
          )}
          <span className="text-lg font-semibold dark:text-gray-100 text-gray-900">{item.question}</span>
        </div>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-brand-pink ml-2 flex-shrink-0`}>
          <ChevronDownIcon className="w-6 h-6" />
        </div>
      </button>
      <div 
        className={`px-6 dark:text-gray-400 text-gray-600 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-60 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="leading-relaxed text-base">{item.answer}</p>
      </div>
    </div>
  );
};

const GuideStep: React.FC<{ number: string; title: string; text: string }> = ({ number, title, text }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-brand-cyan to-brand-pink flex items-center justify-center text-black font-extrabold text-sm shadow-md">
      {number}
    </div>
    <div>
      <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-1">{title}</h3>
      <p className="dark:text-gray-400 text-gray-600 text-sm leading-relaxed">{text}</p>
    </div>
  </div>
);

export default FaqPage;