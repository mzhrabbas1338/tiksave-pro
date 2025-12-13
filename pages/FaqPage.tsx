import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/Icons';
import { FaqItem } from '../types';

const faqs: FaqItem[] = [
  {
    question: "Is TikSave Pro really free?",
    answer: "Yes! TikSave Pro is 100% free to use. We don't ask for registrations, subscriptions, or any hidden fees. We are supported by minimal unobtrusive ads."
  },
  {
    question: "Does it work on iOS (iPhone/iPad)?",
    answer: "Absolutely. On iOS 13+, you can download directly using Safari. For older versions, you might need to use the 'Documents by Readdle' app to save files."
  },
  {
    question: "Where are the videos saved?",
    answer: "On mobile, they are saved to your gallery or the 'Downloads' folder in your file manager. On PC, they are usually saved to your browser's default 'Downloads' folder."
  },
  {
    question: "Do you store downloaded videos?",
    answer: "No. We do not host or store any videos on our servers. All downloads are processed directly from TikTok's CDN to your device. We respect user privacy."
  },
  {
    question: "Can I download MP3 (Audio) only?",
    answer: "Yes, after pasting the link, you will see an option to download the video as an MP3 audio file, perfect for saving sounds and music."
  }
];

const FaqPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
           <span className="text-brand-cyan font-bold tracking-wider uppercase text-sm mb-4 block">Help Center</span>
           <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Frequently Asked <br/> Questions</h1>
           <p className="text-gray-400 text-lg">Everything you need to know about using TikSave Pro.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqAccordion key={index} item={faq} />
          ))}
        </div>

        {/* Additional Guide Section */}
        <div className="mt-24 bg-brand-surface rounded-3xl p-8 md:p-12 border border-white/5">
          <h2 className="text-3xl font-bold mb-8 text-center">Troubleshooting Guide</h2>
          <div className="space-y-8">
             <GuideStep 
               title="Link not working?" 
               text="Ensure the video is public. Private videos cannot be downloaded. Also check if you copied the full URL."
             />
             <GuideStep 
               title="Download button not responding?" 
               text="Try clearing your browser cache or disabling ad-blockers temporarily if they interfere with the script."
             />
             <GuideStep 
               title="Video playing instead of downloading?" 
               text="If the video opens in a new tab, right-click (or long press on mobile) and select 'Save Video As...'."
             />
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqAccordion: React.FC<{ item: FaqItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-gray-200">{item.question}</span>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-brand-pink`}>
          <ChevronDownIcon className="w-6 h-6" />
        </div>
      </button>
      <div 
        className={`px-6 text-gray-400 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
};

const GuideStep: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-brand-cyan"></div>
    <div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{text}</p>
    </div>
  </div>
);

export default FaqPage;