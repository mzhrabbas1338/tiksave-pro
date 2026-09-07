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

import initialSiteConfig from '../public/data/site_config.json';

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  siteTitle: initialSiteConfig.seoSettings?.siteTitle || 'TikSave Pro - Download TikTok Videos Without Watermark Free (1080p HD)',
  metaDescription: initialSiteConfig.seoSettings?.metaDescription || 'Download TikTok videos in HD 1080p, MP3 Audio, or Photo Slideshows without watermark for free. Unlimited fast downloads on iPhone, Android, PC, and Mac.',
  keywords: initialSiteConfig.seoSettings?.keywords || 'tiktok downloader, download tiktok without watermark, tiktok mp3 downloader, ssstik, snaptik, tiktok video saver, tiktok no watermark 1080p',
  ogImage: initialSiteConfig.seoSettings?.ogImage || 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80',
  googleSiteVerification: initialSiteConfig.seoSettings?.googleSiteVerification || 'Ga26AjUtYkubAJiTKzxuXYnRh2tPb2D8JJwBE9GgXIk',
  canonicalUrl: initialSiteConfig.seoSettings?.canonicalUrl || 'https://tiksave-pro.vercel.app',
  author: initialSiteConfig.seoSettings?.author || 'TikSave Pro Team',
  robotsMeta: initialSiteConfig.seoSettings?.robotsMeta || 'index, follow',

  heroBadge: initialSiteConfig.seoSettings?.heroBadge || 'Updated for 2025 Algorithm',
  heroTitleLine1: initialSiteConfig.seoSettings?.heroTitleLine1 || 'Download TikToks',
  heroTitleGradient: initialSiteConfig.seoSettings?.heroTitleGradient || 'Without Watermark',
  heroSubtitle: initialSiteConfig.seoSettings?.heroSubtitle || 'Save TikTok videos in HD 1080p or MP3 Audio. Unlimited downloads with zero watermarks.',
  inputPlaceholder: initialSiteConfig.seoSettings?.inputPlaceholder || 'Paste TikTok link here...',
  downloadBtnText: initialSiteConfig.seoSettings?.downloadBtnText || 'Download',

  featuresSectionHeading: initialSiteConfig.seoSettings?.featuresSectionHeading || 'Why Choose TikSavePro?',
  featuresSectionSubtitle: initialSiteConfig.seoSettings?.featuresSectionSubtitle || 'We offer the fastest watermark removal engine on the web with crisp HD quality.',
  feature1Title: initialSiteConfig.seoSettings?.feature1Title || 'No Watermark',
  feature1Desc: initialSiteConfig.seoSettings?.feature1Desc || 'Download high-quality TikTok videos completely clean, without any logo or username watermark overlay.',
  feature2Title: initialSiteConfig.seoSettings?.feature2Title || 'Lightning Fast',
  feature2Desc: initialSiteConfig.seoSettings?.feature2Desc || 'Our optimized cloud servers ensure your video downloads start instantly and finish in seconds.',
  feature3Title: initialSiteConfig.seoSettings?.feature3Title || 'Unlimited & Free',
  feature3Desc: initialSiteConfig.seoSettings?.feature3Desc || 'No daily limits, no login required, no hidden costs. Pure unlimited video downloading freedom.',

  stepsSectionHeading: initialSiteConfig.seoSettings?.stepsSectionHeading || 'How to Download in 3 Easy Steps',
  step1Title: initialSiteConfig.seoSettings?.step1Title || 'Copy Link',
  step1Desc: initialSiteConfig.seoSettings?.step1Desc || 'Open the TikTok app or website, find the video you like, tap Share and select \'Copy Link\'.',
  step2Title: initialSiteConfig.seoSettings?.step2Title || 'Paste Link',
  step2Desc: initialSiteConfig.seoSettings?.step2Desc || 'Paste your video link into the search box at the top of TikSave Pro.',
  step3Title: initialSiteConfig.seoSettings?.step3Title || 'Download Video',
  step3Desc: initialSiteConfig.seoSettings?.step3Desc || 'Click Download and choose your preferred quality (MP4 HD or MP3 Audio).',

  stat1Number: initialSiteConfig.seoSettings?.stat1Number || '10M+',
  stat1Label: initialSiteConfig.seoSettings?.stat1Label || 'Videos Saved',
  stat2Number: initialSiteConfig.seoSettings?.stat2Number || '0s',
  stat2Label: initialSiteConfig.seoSettings?.stat2Label || 'Lag Time',
  stat3Number: initialSiteConfig.seoSettings?.stat3Number || '100%',
  stat3Label: initialSiteConfig.seoSettings?.stat3Label || 'Free & Secure',
  stat4Number: initialSiteConfig.seoSettings?.stat4Number || '4.9/5',
  stat4Label: initialSiteConfig.seoSettings?.stat4Label || 'User Rating',

  faqPageTitle: initialSiteConfig.seoSettings?.faqPageTitle || 'Frequently Asked Questions - TikSave Pro Help Center',
  faqPageMetaDescription: initialSiteConfig.seoSettings?.faqPageMetaDescription || 'Find answers to popular questions about downloading TikTok videos without watermark, iOS and Android steps, MP3 audio extraction, and troubleshooting.',
  faqBadge: initialSiteConfig.seoSettings?.faqBadge || 'Help Center & Knowledge Base',
  faqH1Line1: initialSiteConfig.seoSettings?.faqH1Line1 || 'Frequently Asked',
  faqH1Gradient: initialSiteConfig.seoSettings?.faqH1Gradient || 'Questions',
  faqSubtitle: initialSiteConfig.seoSettings?.faqSubtitle || 'Find quick answers to common questions about downloading TikTok videos without watermarks.',
  faqsList: (initialSiteConfig.seoSettings?.faqsList as FaqItem[]) || [],

  blogPageTitle: initialSiteConfig.seoSettings?.blogPageTitle || 'TikTok Growth Hacks, Tutorials & News - TikSave Pro Blog',
  blogPageMetaDescription: initialSiteConfig.seoSettings?.blogPageMetaDescription || 'Discover expert tips, trends, and guides to master TikTok algorithm, grow your video views, and download content hassle-free.',
  blogBadge: initialSiteConfig.seoSettings?.blogBadge || 'Our Blog',
  blogH1Line1: initialSiteConfig.seoSettings?.blogH1Line1 || 'Latest News &',
  blogH1Gradient: initialSiteConfig.seoSettings?.blogH1Gradient || 'Insights',
  blogSubtitle: initialSiteConfig.seoSettings?.blogSubtitle || 'Discover tips, trends, and guides to master TikTok and social media growth.',

  ga4MeasurementId: initialSiteConfig.seoSettings?.ga4MeasurementId || 'G-TIKSAVEPRO2025',
  customHeadScript: initialSiteConfig.seoSettings?.customHeadScript || '',
  customBodyScript: initialSiteConfig.seoSettings?.customBodyScript || '',
  robotsTxtContent: initialSiteConfig.seoSettings?.robotsTxtContent || 'User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: https://tiksave-pro.vercel.app/sitemap.xml',
  customSchemaOverride: initialSiteConfig.seoSettings?.customSchemaOverride || ''
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
