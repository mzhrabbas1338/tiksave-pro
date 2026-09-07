import { SeoSettings, DEFAULT_SEO_SETTINGS, getSeoSettings, saveSeoSettings } from '../utils/seoManager';
import { AdSettings, DEFAULT_AD_SETTINGS, getAdSettings, saveAdSettings } from '../utils/adManager';
import { BlogPost } from '../types';
import { getAllStoredPosts, saveBlogPost } from './blogService';
import { getFirebaseConfig } from './firebaseService';
import { commitToGitHubRepository } from './githubGitService';

export interface WordPressGlobalStore {
  seoSettings: SeoSettings;
  adSettings: AdSettings;
  blogPosts: BlogPost[];
  lastUpdated: number;
}

const GLOBAL_STORE_KEY = 'tiksave_wordpress_global_store';

export const getMasterGlobalStore = (): WordPressGlobalStore => {
  try {
    const saved = localStorage.getItem(GLOBAL_STORE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.seoSettings) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse local global store', e);
  }

  const defaultStore: WordPressGlobalStore = {
    seoSettings: getSeoSettings(),
    adSettings: getAdSettings(),
    blogPosts: getAllStoredPosts(),
    lastUpdated: Date.now()
  };

  try {
    localStorage.setItem(GLOBAL_STORE_KEY, JSON.stringify(defaultStore));
  } catch (e) {}

  return defaultStore;
};

export const saveMasterGlobalStore = async (updatedStore: WordPressGlobalStore): Promise<void> => {
  const storeToSave = {
    ...updatedStore,
    lastUpdated: Date.now()
  };

  // 1. Save locally
  try {
    localStorage.setItem(GLOBAL_STORE_KEY, JSON.stringify(storeToSave));
    localStorage.setItem('seo_settings', JSON.stringify(storeToSave.seoSettings));
    localStorage.setItem('ad_settings', JSON.stringify(storeToSave.adSettings));
    localStorage.setItem('tiksave_blog_posts', JSON.stringify(storeToSave.blogPosts));
  } catch (e) {
    console.error('Failed to save store locally', e);
  }

  // 2. Dispatch event for instant UI update
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('tiksave_global_store_updated'));
    window.dispatchEvent(new Event('seo_settings_updated'));
    window.dispatchEvent(new Event('ad_settings_updated'));
    window.dispatchEvent(new Event('blog_posts_updated'));
  }

  // 3. Push to Cloud DB (Firebase / REST API) for all global production visitors
  const config = getFirebaseConfig();
  if (config.databaseURL) {
    try {
      const cleanUrl = config.databaseURL.trim().replace(/\/$/, '');
      const targetUrl = cleanUrl.endsWith('.json') ? cleanUrl : `${cleanUrl}/global_store.json`;
      await fetch(targetUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeToSave)
      });
      console.log('✅ WordPress Global Store published live to Cloud Database!');
    } catch (e) {
      console.warn('Cloud store sync failed', e);
    }
  }

  // 4. Commit to GitHub Repository to trigger Vercel Production Build
  commitToGitHubRepository(storeToSave).catch(err => console.warn('GitHub Git commit notice:', err));
};

export const syncGlobalStoreFromCloud = async (): Promise<void> => {
  const config = getFirebaseConfig();
  if (!config.databaseURL) return;

  try {
    const cleanUrl = config.databaseURL.trim().replace(/\/$/, '');
    const targetUrl = cleanUrl.endsWith('.json') ? cleanUrl : `${cleanUrl}/global_store.json`;
    const res = await fetch(targetUrl);
    if (res.ok) {
      const remoteStore: WordPressGlobalStore = await res.json();
      if (remoteStore && remoteStore.seoSettings) {
        const localStore = getMasterGlobalStore();
        if (!localStore.lastUpdated || (remoteStore.lastUpdated && remoteStore.lastUpdated > localStore.lastUpdated)) {
          localStorage.setItem(GLOBAL_STORE_KEY, JSON.stringify(remoteStore));
          localStorage.setItem('seo_settings', JSON.stringify(remoteStore.seoSettings));
          localStorage.setItem('ad_settings', JSON.stringify(remoteStore.adSettings));
          localStorage.setItem('tiksave_blog_posts', JSON.stringify(remoteStore.blogPosts));

          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('tiksave_global_store_updated'));
            window.dispatchEvent(new Event('seo_settings_updated'));
            window.dispatchEvent(new Event('ad_settings_updated'));
            window.dispatchEvent(new Event('blog_posts_updated'));
          }
          console.log('⚡ Synced latest WordPress master store from Cloud DB!');
        }
      }
    }
  } catch (e) {
    console.warn('Failed to fetch global store from Cloud DB', e);
  }
};
