import { RealAnalyticsEvent } from './analyticsService';

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  databaseURL?: string;
  projectId?: string;
  appId?: string;
  measurementId?: string;
  enabled?: boolean;
}

export interface FirebaseConnectionStatus {
  tested: boolean;
  connected: boolean;
  statusText: string;
  count: number;
}

const STORAGE_KEY = 'tiksave_firebase_config';

export const getFirebaseConfig = (): FirebaseConfig => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse Firebase config', e);
  }
  return {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    appId: '',
    measurementId: '',
    enabled: false
  };
};

export const saveFirebaseConfig = (config: FirebaseConfig): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  if (config.measurementId) {
    injectGoogleAnalytics(config.measurementId);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('firebase_config_updated'));
  }
};

// Send Event to Firebase Realtime Database via ultra-fast REST API
export const sendGlobalFirebaseEvent = async (event: RealAnalyticsEvent): Promise<void> => {
  const config = getFirebaseConfig();
  if (!config.enabled || !config.databaseURL) return;

  try {
    const cleanUrl = config.databaseURL.trim().replace(/\/$/, '');
    const targetUrl = cleanUrl.endsWith('.json') ? cleanUrl : `${cleanUrl}/events.json`;
    await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
  } catch (e) {
    console.warn('Firebase Realtime DB sync failed', e);
  }
};

// Fetch Global Events from Firebase Realtime Database REST API
export const fetchGlobalFirebaseEvents = async (): Promise<RealAnalyticsEvent[] | null> => {
  const config = getFirebaseConfig();
  if (!config.enabled || !config.databaseURL) return null;

  try {
    const cleanUrl = config.databaseURL.trim().replace(/\/$/, '');
    const targetUrl = cleanUrl.endsWith('.json') ? `${cleanUrl}?limitToLast=200` : `${cleanUrl}/events.json?limitToLast=200`;
    const res = await fetch(targetUrl);
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        const eventsArray: RealAnalyticsEvent[] = Object.values(data);
        return eventsArray.sort((a, b) => b.timestamp - a.timestamp);
      }
    }
  } catch (e) {
    console.warn('Failed to fetch from Firebase DB', e);
  }
  return null;
};

// Diagnostics & Diagnostic Ping Test for Admin Panel
export const testFirebaseConnection = async (): Promise<FirebaseConnectionStatus> => {
  const config = getFirebaseConfig();
  if (!config.databaseURL || config.databaseURL.trim().length === 0) {
    return {
      tested: true,
      connected: false,
      statusText: '⚠️ Database URL is empty. Please enter your Firebase Realtime Database URL.',
      count: 0
    };
  }

  const cleanUrl = config.databaseURL.trim().replace(/\/$/, '');
  const targetUrl = cleanUrl.endsWith('.json') ? cleanUrl : `${cleanUrl}/events.json?limitToLast=20`;

  try {
    const res = await fetch(targetUrl);
    if (res.status === 401 || res.status === 403) {
      return {
        tested: true,
        connected: false,
        statusText: '❌ Firebase Permission Denied (401/403). Go to Firebase Console -> Realtime Database -> Rules and set: { ".read": true, ".write": true }',
        count: 0
      };
    }

    if (res.ok) {
      const data = await res.json();
      const count = data && typeof data === 'object' ? Object.keys(data).length : 0;
      return {
        tested: true,
        connected: true,
        statusText: `🟢 Connected & Syncing! Found ${count} live global event records in Firebase Database.`,
        count
      };
    }

    return {
      tested: true,
      connected: false,
      statusText: `⚠️ HTTP Error ${res.status}: ${res.statusText}. Please verify your Firebase Database URL format.`,
      count: 0
    };
  } catch (e: any) {
    return {
      tested: true,
      connected: false,
      statusText: `❌ Connection Failed: ${e.message || 'Network error'}. Check Database URL & Network connection.`,
      count: 0
    };
  }
};

// Inject Google Analytics GA4 Script dynamically
export const injectGoogleAnalytics = (measurementId: string): void => {
  if (!measurementId || measurementId.trim().length === 0) return;
  const cleanId = measurementId.trim();

  // Check if GA script is already loaded
  if (document.getElementById('ga4-gtag-script')) return;

  try {
    const script = document.createElement('script');
    script.id = 'ga4-gtag-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${cleanId}`;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.id = 'ga4-gtag-inline';
    inlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${cleanId}', { send_page_view: true });
    `;
    document.head.appendChild(inlineScript);

    console.log(`✅ Google Analytics GA4 initialized with ID: ${cleanId}`);
  } catch (e) {
    console.error('Failed to inject Google Analytics GA4', e);
  }
};

// Send custom event to GA4
export const sendGA4Event = (eventName: string, eventParams: Record<string, any> = {}): void => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};
