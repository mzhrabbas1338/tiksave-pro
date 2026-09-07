import { useState, useEffect } from 'react';
import { FaqItem } from '../types';
import { injectGoogleAnalytics } from '../services/firebaseService';

export interface SeoSettings {
  // Global & Meta Settings
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  googleSiteVerification: string;
  canonicalUrl: string;
  author: string;
  robotsMeta: string;

  // Home Page Copy & Headings
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleGradient: string;
  heroSubtitle: string;
  inputPlaceholder: string;
  downloadBtnText: string;

  // Features Section
  featuresSectionHeading: string;
  featuresSectionSubtitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;

  // How-To Steps Section
  stepsSectionHeading: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  // Stats Counters
  stat1Number: string;
  stat1Label: string;
  stat2Number: string;
  stat2Label: string;
  stat3Number: string;
  stat3Label: string;
  stat4Number: string;
  stat4Label: string;

  // FAQ Page Headings & Custom Q&A Items
  faqPageTitle: string;
  faqPageMetaDescription: string;
  faqBadge: string;
  faqH1Line1: string;
  faqH1Gradient: string;
  faqSubtitle: string;
  faqsList: FaqItem[];

  // Blog Page Headings & Meta
  blogPageTitle: string;
  blogPageMetaDescription: string;
  blogBadge: string;
  blogH1Line1: string;
  blogH1Gradient: string;
  blogSubtitle: string;

  // Technical & Advanced Analytics Scripts
  ga4MeasurementId?: string;
  customHeadScript?: string;
  customBodyScript?: string;
  robotsTxtContent?: string;
  customSchemaOverride?: string;
}

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  siteTitle: 'TikSave Pro - Download TikTok Videos Without Watermark Free (1080p HD)',
  metaDescription: 'Download TikTok videos in HD 1080p, MP3 Audio, or Photo Slideshows without watermark for free. Unlimited fast downloads on iPhone, Android, PC, and Mac.',
  keywords: 'tiktok downloader, download tiktok without watermark, tiktok mp3 downloader, ssstik, snaptik, tiktok video saver, tiktok no watermark 1080p',
  ogImage: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80',
  googleSiteVerification: 'Ga26AjUtYkubAJiTKzxuXYnRh2tPb2D8JJwBE9GgXIk',
  canonicalUrl: 'https://tiksave-pro.vercel.app',
  author: 'TikSave Pro Team',
  robotsMeta: 'index, follow',

  heroBadge: 'Updated for 2025 Algorithm',
  heroTitleLine1: 'Download TikToks',
  heroTitleGradient: 'Without Watermark',
  heroSubtitle: 'Save TikTok videos in HD 1080p or MP3 Audio. Unlimited downloads with zero watermarks.',
  inputPlaceholder: 'Paste TikTok link here...',
  downloadBtnText: 'Download',

  featuresSectionHeading: 'Why Choose TikSavePro?',
  featuresSectionSubtitle: 'We offer the fastest watermark removal engine on the web with crisp HD quality.',
  feature1Title: 'No Watermark',
  feature1Desc: 'Download high-quality TikTok videos completely clean, without any logo or username watermark overlay.',
  feature2Title: 'Lightning Fast',
  feature2Desc: 'Our optimized cloud servers ensure your video downloads start instantly and finish in seconds.',
  feature3Title: 'Unlimited & Free',
  feature3Desc: 'No daily limits, no login required, no hidden costs. Pure unlimited video downloading freedom.',

  stepsSectionHeading: 'How to Download in 3 Easy Steps',
  step1Title: 'Copy Link',
  step1Desc: 'Open the TikTok app or website, find the video you like, tap Share and select \'Copy Link\'.',
  step2Title: 'Paste Link',
  step2Desc: 'Paste your video link into the search box at the top of TikSave Pro.',
  step3Title: 'Download Video',
  step3Desc: 'Click Download and choose your preferred quality (MP4 HD or MP3 Audio).',

  stat1Number: '10M+',
  stat1Label: 'Videos Saved',
  stat2Number: '0s',
  stat2Label: 'Lag Time',
  stat3Number: '100%',
  stat3Label: 'Free & Secure',
  stat4Number: '4.9/5',
  stat4Label: 'User Rating',

  faqPageTitle: 'Frequently Asked Questions - TikSave Pro Help Center',
  faqPageMetaDescription: 'Find answers to popular questions about downloading TikTok videos without watermark, iOS and Android steps, MP3 audio extraction, and troubleshooting.',
  faqBadge: 'Help Center & Knowledge Base',
  faqH1Line1: 'Frequently Asked',
  faqH1Gradient: 'Questions',
  faqSubtitle: 'Find quick answers to common questions about downloading TikTok videos without watermarks.',
  faqsList: [
    {
      category: 'General',
      question: 'Is TikSave Pro really 100% free?',
      answer: 'Yes! TikSave Pro is completely free to use. There are no registrations, no subscription fees, no credit card requirements, and no daily download limits.'
    },
    {
      category: 'General',
      question: 'Do I need a TikTok account or login to download videos?',
      answer: 'No account required! You don\'t need to log in to TikTok or link your personal profile. Just copy any public video link and paste it into TikSave Pro.'
    },
    {
      category: 'General',
      question: 'Is it legal to download TikTok videos for personal use?',
      answer: 'Downloading TikTok videos for personal offline viewing or reference is legal. However, if you plan to re-post or use the content publicly, always credit the original creator and observe copyright laws.'
    },
    {
      category: 'Devices & OS',
      question: 'How do I download TikTok videos on iPhone / iPad (iOS)?',
      answer: 'On iOS 13 or newer: Open the TikTok app, tap \'Share\' -> \'Copy Link\'. Open Safari, visit TikSave Pro, paste the link in the search box, and hit Download. Tap the Download icon in Safari to view or save to your Photos app.'
    },
    {
      category: 'Devices & OS',
      question: 'How do I download TikTok videos on Android devices?',
      answer: 'Open TikTok, tap \'Share\' -> \'Copy Link\'. Open Chrome or any web browser, go to TikSave Pro, paste the link, and tap \'Download\'. The MP4 file will save directly to your phone\'s Gallery or Downloads folder.'
    },
    {
      category: 'Devices & OS',
      question: 'Can I download TikTok videos on Windows PC or Mac?',
      answer: 'Yes! TikSave Pro works seamlessly on all desktop browsers (Chrome, Edge, Safari, Firefox, Opera). Simply paste the video link into the search bar and download in 1-click.'
    },
    {
      category: 'Devices & OS',
      question: 'Where are the downloaded videos saved on my device?',
      answer: 'On smartphones (iOS & Android), files are saved in your browser\'s \'Downloads\' folder or Files app. On desktop computers (PC/Mac), videos are saved into your default \'Downloads\' folder.'
    },
    {
      category: 'Quality & Formats',
      question: 'Why is there no watermark on downloaded videos?',
      answer: 'TikSave Pro accesses TikTok\'s high-definition CDN stream directly to extract the raw video source before the platform applies its logo overlay and watermark.'
    },
    {
      category: 'Quality & Formats',
      question: 'What video resolutions and formats are supported?',
      answer: 'We support HD (720p), Full HD (1080p), and original source resolutions in standard MP4 format. You can also extract MP3 audio files.'
    },
    {
      category: 'Quality & Formats',
      question: 'Can I extract MP3 audio or background music from TikTok?',
      answer: 'Yes! Once you paste the link, select the MP3 Audio option from the format selector to save only the original background sound or song.'
    },
    {
      category: 'Quality & Formats',
      question: 'Does TikSave Pro support photo slideshow & photo carousel posts?',
      answer: 'Yes, TikSave Pro fully supports photo posts! You can download all high-resolution images from any TikTok photo slideshow.'
    },
    {
      category: 'Privacy & Safety',
      question: 'Does TikSave Pro store or track my downloaded videos?',
      answer: 'Never. We respect user privacy 100%. We do not host, save, or mirror any downloaded videos on our servers, nor do we track download histories.'
    },
    {
      category: 'Privacy & Safety',
      question: 'Is TikSave Pro safe and free from viruses or spyware?',
      answer: 'Yes, 100% safe. TikSave Pro is entirely web-based and requires no app installation, no browser extension permissions, and no file downloads other than your requested video.'
    },
    {
      category: 'Troubleshooting',
      question: 'Why am I getting a \'Video Not Found\' or error message?',
      answer: 'This usually happens if: 1) The TikTok user account is set to private. 2) The video was deleted. 3) The link URL was copied incomplete. Ensure the link starts with \'https://www.tiktok.com/\' or \'https://vm.tiktok.com/\'.'
    },
    {
      category: 'Troubleshooting',
      question: 'What should I do if the video plays in a new tab instead of downloading?',
      answer: 'If your browser plays the video inline, right-click (or tap and hold on mobile) on the video player window and click \'Save Video As...\' or \'Download Video\'.'
    }
  ],

  blogPageTitle: 'TikTok Growth Hacks, Tutorials & News - TikSave Pro Blog',
  blogPageMetaDescription: 'Discover expert tips, trends, and guides to master TikTok algorithm, grow your video views, and download content hassle-free.',
  blogBadge: 'Our Blog',
  blogH1Line1: 'Latest News &',
  blogH1Gradient: 'Insights',
  blogSubtitle: 'Discover tips, trends, and guides to master TikTok and social media growth.',

  customHeadScript: '',
  customBodyScript: '',
  robotsTxtContent: 'User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: https://tiksave-pro.vercel.app/sitemap.xml',
  customSchemaOverride: ''
};

export const getSeoSettings = (): SeoSettings => {
  const saved = localStorage.getItem('seo_settings');
  if (saved) {
    try {
      return { ...DEFAULT_SEO_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Failed to parse SEO settings', e);
    }
  }
  return DEFAULT_SEO_SETTINGS;
};

import { getMasterGlobalStore, saveMasterGlobalStore } from '../services/cloudSyncService';

export const saveSeoSettings = (settings: SeoSettings): void => {
  localStorage.setItem('seo_settings', JSON.stringify(settings));
  applySeoSettings(settings);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('seo_settings_updated'));
  }
  // Sync to master global store
  const store = getMasterGlobalStore();
  store.seoSettings = settings;
  saveMasterGlobalStore(store);
};

export const useSeoSettings = (): SeoSettings => {
  const [settings, setSettings] = useState<SeoSettings>(getSeoSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getSeoSettings());
    };

    window.addEventListener('seo_settings_updated', handleUpdate);
    return () => {
      window.removeEventListener('seo_settings_updated', handleUpdate);
    };
  }, []);

  return settings;
};

export const applySeoSettings = (customSettings?: SeoSettings): void => {
  const settings = customSettings || getSeoSettings();

  // Document Title
  if (settings.siteTitle) {
    document.title = settings.siteTitle;
  }

  // Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', settings.metaDescription);

  // Meta Keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', settings.keywords);

  // Robots Meta Directive
  if (settings.robotsMeta) {
    updateMetaProperty('robots', settings.robotsMeta);
  }

  // Google Site Verification
  if (settings.googleSiteVerification) {
    updateMetaProperty('google-site-verification', settings.googleSiteVerification);
  }

  // Canonical Tag
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', settings.canonicalUrl || window.location.href);

  // OpenGraph Tags
  updateMetaProperty('og:title', settings.siteTitle);
  updateMetaProperty('og:description', settings.metaDescription);
  updateMetaProperty('og:image', settings.ogImage);
  updateMetaProperty('og:type', 'website');
  updateMetaProperty('og:url', window.location.href);

  // Twitter Cards
  updateMetaProperty('twitter:card', 'summary_large_image');
  updateMetaProperty('twitter:title', settings.siteTitle);
  updateMetaProperty('twitter:description', settings.metaDescription);
  updateMetaProperty('twitter:image', settings.ogImage);

  // Schema.org JSON-LD Structured Data Injection
  injectStructuredData(settings);

  // Custom Head Scripts Injection (GA4, GTM, Meta Pixel)
  if (settings.ga4MeasurementId) {
    injectGoogleAnalytics(settings.ga4MeasurementId);
  }
  if (settings.customHeadScript) {
    injectCustomHeadScript(settings.customHeadScript);
  }
};

const updateMetaProperty = (property: string, content: string): void => {
  let tag = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    if (property.startsWith('og:')) {
      tag.setAttribute('property', property);
    } else {
      tag.setAttribute('name', property);
    }
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

export const injectStructuredData = (settings: SeoSettings): void => {
  let script = document.getElementById('json-ld-schema') as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  if (settings.customSchemaOverride && settings.customSchemaOverride.trim().length > 0) {
    script.textContent = settings.customSchemaOverride;
    return;
  }

  const faqItemsSchema = (settings.faqsList || []).map(faq => ({
    '@type': 'Question',
    'name': faq.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.answer
    }
  }));

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${settings.canonicalUrl}/#website`,
        'url': settings.canonicalUrl,
        'name': 'TikSave Pro',
        'description': settings.metaDescription,
        'inLanguage': 'en-US'
      },
      {
        '@type': 'SoftwareApplication',
        'name': 'TikSave Pro TikTok Downloader',
        'operatingSystem': 'Windows, macOS, Android, iOS',
        'applicationCategory': 'MultimediaApplication',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'ratingCount': '104820'
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': faqItemsSchema
      },
      {
        '@type': 'HowTo',
        'name': settings.stepsSectionHeading || 'How to Download TikTok Videos Without Watermark',
        'description': 'Follow these 3 fast steps to save TikTok videos in HD 1080p quality without watermark.',
        'step': [
          {
            '@type': 'HowToStep',
            'name': settings.step1Title || 'Copy Link',
            'text': settings.step1Desc || 'Open TikTok app, tap Share on your desired video, and select Copy Link.'
          },
          {
            '@type': 'HowToStep',
            'name': settings.step2Title || 'Paste Link',
            'text': settings.step2Desc || 'Paste the link into the TikSave Pro input box.'
          },
          {
            '@type': 'HowToStep',
            'name': settings.step3Title || 'Download Video',
            'text': settings.step3Desc || 'Click Download and choose No Watermark HD (1080p) or MP3 Audio.'
          }
        ]
      }
    ]
  };

  script.textContent = JSON.stringify(schemaData, null, 2);
};

const injectCustomHeadScript = (scriptContent: string): void => {
  let scriptContainer = document.getElementById('custom-head-scripts');
  if (!scriptContainer) {
    scriptContainer = document.createElement('div');
    scriptContainer.id = 'custom-head-scripts';
    document.head.appendChild(scriptContainer);
  }
  scriptContainer.innerHTML = scriptContent;
};
