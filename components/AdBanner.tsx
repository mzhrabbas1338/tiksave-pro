import React, { useEffect, useRef, useState } from 'react';
import { getAdSettings, AdSettings } from '../utils/adManager';

interface AdBannerProps {
  slot: keyof Omit<AdSettings, 'globalAdsEnabled' | 'customHeaderScript'>;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<AdSettings>(getAdSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getAdSettings());
    };

    window.addEventListener('ad_settings_updated', handleUpdate);
    window.addEventListener('tiksave_global_store_updated', handleUpdate);

    return () => {
      window.removeEventListener('ad_settings_updated', handleUpdate);
      window.removeEventListener('tiksave_global_store_updated', handleUpdate);
    };
  }, []);

  const slotConfig = settings[slot];

  useEffect(() => {
    if (!settings.globalAdsEnabled || !slotConfig || !slotConfig.enabled || !slotConfig.code) {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      return;
    }

    if (containerRef.current) {
      containerRef.current.innerHTML = slotConfig.code;

      // Execute embedded <script> tags if any exist in the ad code snippet
      const scripts = containerRef.current.querySelectorAll('script');
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        if (oldScript.parentNode) {
          oldScript.parentNode.replaceChild(newScript, oldScript);
        }
      });
    }
  }, [slotConfig, settings.globalAdsEnabled]);

  if (!settings.globalAdsEnabled || !slotConfig || !slotConfig.enabled || !slotConfig.code) {
    return null;
  }

  return (
    <div className={`ad-banner-container max-w-full overflow-hidden my-4 flex justify-center ${className}`}>
      <div ref={containerRef} className="w-full text-center" />
    </div>
  );
};

export default AdBanner;
