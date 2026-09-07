export interface AdSlotConfig {
  enabled: boolean;
  code: string;
}

export interface AdSettings {
  globalAdsEnabled: boolean;
  topBanner: AdSlotConfig;
  postDownloader: AdSlotConfig;
  inBlog: AdSlotConfig;
  stickyBottom: AdSlotConfig;
  customHeaderScript: string;
}

import initialSiteConfig from '../public/data/site_config.json';

export const DEFAULT_AD_SETTINGS: AdSettings = (initialSiteConfig.adSettings as AdSettings) || {
  globalAdsEnabled: true,
  topBanner: {
    enabled: true,
    code: '<div style="background: rgba(255,255,255,0.05); border: 1px dashed rgba(255,255,255,0.2); padding: 15px; text-align: center; border-radius: 12px; font-size: 13px; color: #888;">[AD SLOT: 728x90 Header Leaderboard - Paste Google AdSense / Banner Code in Admin Panel]</div>'
  },
  postDownloader: {
    enabled: true,
    code: '<div style="background: rgba(0,242,254,0.08); border: 1px solid rgba(0,242,254,0.3); padding: 18px; text-align: center; border-radius: 16px; font-size: 13px; color: #00f2fe; font-weight: bold;">[HIGH CTR AD SLOT: 336x280 / Native Ad - Below Download Button]</div>'
  },
  inBlog: {
    enabled: true,
    code: '<div style="background: rgba(254,44,85,0.08); border: 1px solid rgba(254,44,85,0.3); padding: 18px; text-align: center; border-radius: 16px; font-size: 13px; color: #fe2c55; font-weight: bold;">[IN-ARTICLE AD SLOT: Responsive Banner Inside Blog Post]</div>'
  },
  stickyBottom: {
    enabled: false,
    code: '<div style="background: #111; color: #fff; padding: 10px; text-align: center; font-size: 12px;">[MOBILE STICKY ANCHOR AD: 320x50]</div>'
  },
  customHeaderScript: ''
};

export const getAdSettings = (): AdSettings => {
  const saved = localStorage.getItem('ad_settings');
  if (saved) {
    try {
      return { ...DEFAULT_AD_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Failed to parse ad settings', e);
    }
  }
  return DEFAULT_AD_SETTINGS;
};

import { getMasterGlobalStore, saveMasterGlobalStore } from '../services/cloudSyncService';

export const saveAdSettings = (settings: AdSettings): void => {
  localStorage.setItem('ad_settings', JSON.stringify(settings));
  const store = getMasterGlobalStore();
  store.adSettings = settings;
  saveMasterGlobalStore(store);
};
