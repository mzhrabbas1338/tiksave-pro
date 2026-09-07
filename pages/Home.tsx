import React, { useState, useRef, useEffect } from 'react';
import { DownloadIcon, CheckIcon, ShieldIcon, ZapIcon, PlayIcon } from '../components/Icons';
import { fetchVideoData, downloadVideo } from '../services/mockApi';
import { DownloadStatus, MockVideoResult } from '../types';
import AdBanner from '../components/AdBanner';
import { useSeoSettings } from '../utils/seoManager';
import { recordDownloadEvent } from '../services/analyticsService';
import AudioTrimmer from '../components/AudioTrimmer';

const Home: React.FC = () => {
  const seo = useSeoSettings();
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<DownloadStatus>(DownloadStatus.IDLE);
  const [result, setResult] = useState<MockVideoResult | null>(null);
  const [error, setError] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [showAudioTrimmer, setShowAudioTrimmer] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const processingMessages = [
    "🔍 Analyzing TikTok Link...",
    "⚡ Bypassing TikTok Watermark...",
    "🎬 Extracting HD 1080p Stream...",
    "✨ Preparing High-Quality Formats..."
  ];

  useEffect(() => {
    if (status === DownloadStatus.LOADING || status === DownloadStatus.SUCCESS || status === DownloadStatus.ERROR) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }
  }, [status, result]);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setStatus(DownloadStatus.LOADING);
    setError('');
    setResult(null);
    setProcessingStep(0);

    const stepInterval = setInterval(() => {
      setProcessingStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 550);

    try {
      const data = await fetchVideoData(url);
      clearInterval(stepInterval);
      setResult(data);
      setStatus(DownloadStatus.SUCCESS);
      if (data.formats && data.formats.length > 0) {
        setSelectedFormat(data.formats[0].id);
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      setError(err.message || 'Something went wrong while fetching video');
      setStatus(DownloadStatus.ERROR);
      recordDownloadEvent('Failed Extraction Attempt', url, 'error');
    }
  };

  const handleFormatDownload = async () => {
    if (!selectedFormat || !result) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 20;
        });
      }, 400);

      const downloadUrl = await downloadVideo(url, selectedFormat);
      
      clearInterval(progressInterval);
      setDownloadProgress(100);

      // Record live download event with real user location and device
      const formatObj = result.formats?.find(f => f.id === selectedFormat);
      recordDownloadEvent(formatObj?.label || 'No Watermark HD Video', result.title, 'success');

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${result.title.replace(/[^a-z0-9_-]/gi, '_')}.mp4`;
      link.style.display = 'none';
      document.body.appendChild(link);
      
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
        if (downloadUrl.startsWith('blob:')) {
          URL.revokeObjectURL(downloadUrl);
        }
      }, 100);

      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
      }, 1800);
    } catch (err: any) {
      console.error('Download error:', err);
      setError(err.message || 'Download failed');
      setIsDownloading(false);
      setDownloadProgress(0);
      recordDownloadEvent('Download Failure', result?.title, 'error');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch (err) {
      console.error('Clipboard access denied');
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Mobile Single-Screen Optimized Hero Section */}
      <section className="relative overflow-hidden pb-12 pt-4 sm:pt-16 lg:pt-24 px-4 sm:px-6">
        {/* Background Globs */}
        <div className="absolute top-5 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-brand-cyan/20 rounded-full blur-[90px] sm:blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-brand-pink/20 rounded-full blur-[90px] sm:blur-[120px] animate-pulse delay-1000" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Top Leaderboard Ad Slot */}
          <AdBanner slot="topBanner" className="mb-6" />

          {/* Pill Badge - Compact on Mobile */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full dark:bg-white/10 dark:border-white/15 bg-slate-200/80 border-slate-300 border mb-3 sm:mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] sm:text-sm font-semibold dark:text-gray-200 text-slate-800">
              {seo.heroBadge || 'Updated for 2025 Algorithm'}
            </span>
          </div>

          {/* Title - SEO Expert Controlled H1 Tag */}
          <h1 className="text-2xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-2 sm:mb-8 leading-tight dark:text-white text-slate-900">
            {seo.heroTitleLine1 || 'Download TikToks'} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-purple-600 dark:via-white to-brand-pink animate-gradient-x bg-[length:200%_auto]">
              {seo.heroTitleGradient || 'Without Watermark'}
            </span>
          </h1>
          
          <p className="text-xs sm:text-lg md:text-xl dark:text-gray-300 text-slate-600 mb-4 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
            {seo.heroSubtitle || 'Save TikTok videos in HD 1080p or MP3 Audio. Unlimited downloads with zero watermarks.'}
          </p>

          {/* Search Box - Front and Center for Mobile */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-2xl sm:rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <form onSubmit={handleDownload} className="relative flex flex-col sm:flex-row gap-2 dark:bg-brand-surface bg-white p-2 sm:p-3 rounded-2xl sm:rounded-full border dark:border-white/15 border-slate-300 shadow-2xl transition-all">
              <div className="relative flex-grow flex items-center">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={seo.inputPlaceholder || 'Paste TikTok link here...'}
                  aria-label="TikTok video link URL input"
                  className="w-full h-12 sm:h-14 pl-4 sm:pl-6 pr-24 bg-transparent dark:text-white text-slate-900 dark:placeholder-gray-500 placeholder-slate-400 focus:outline-none text-base sm:text-lg font-medium"
                />
                <button 
                  type="button"
                  onClick={handlePaste}
                  aria-label="Paste from clipboard"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 text-xs font-extrabold dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300 dark:border-gray-700 rounded-lg sm:rounded-full transition-all active:scale-95 flex items-center gap-1 shadow-sm min-h-[38px]"
                >
                  <span>📋 PASTE</span>
                </button>
              </div>
              <button 
                type="submit"
                disabled={status === DownloadStatus.LOADING}
                aria-label="Submit link to download TikTok video"
                className="h-12 sm:h-14 px-8 rounded-xl sm:rounded-full bg-gradient-to-r from-brand-cyan to-brand-pink text-white font-extrabold text-base sm:text-lg shadow-lg hover:shadow-brand-cyan/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 min-h-[48px]"
              >
                {status === DownloadStatus.LOADING ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <span>{seo.downloadBtnText || 'Download'}</span>
                    <DownloadIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Target Ref */}
          <div ref={resultRef} className="scroll-mt-24">
            {/* Processing Multi-step Animation Card */}
            {status === DownloadStatus.LOADING && (
              <div 
                role="status"
                aria-live="polite"
                className="mt-6 sm:mt-10 max-w-lg mx-auto dark:bg-brand-surface/95 bg-white border dark:border-white/15 border-slate-300 rounded-3xl p-5 sm:p-8 shadow-2xl animate-fade-in text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-cyan via-purple-500 to-brand-pink animate-pulse"></div>
                
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-cyan border-r-brand-pink animate-spin"></div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-brand-cyan to-brand-pink flex items-center justify-center text-white shadow-lg animate-pulse">
                    <DownloadIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold dark:text-white text-slate-900 mb-1.5">Processing TikTok Link</h3>
                
                <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-extrabold text-brand-pink mb-5 h-6 transition-all duration-300">
                  <span>{processingMessages[processingStep]}</span>
                </div>

                {/* Animated Progress Steps */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[0, 1, 2, 3].map((step) => (
                    <div 
                      key={step} 
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        step <= processingStep 
                          ? 'bg-gradient-to-r from-brand-cyan to-brand-pink shadow-md' 
                          : 'dark:bg-gray-800 bg-gray-200'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs dark:text-gray-400 text-slate-500 font-medium">Extracting clean video stream without watermark...</p>
              </div>
            )}

            {/* Error Message */}
            {status === DownloadStatus.ERROR && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-2xl text-red-600 dark:text-red-200 max-w-lg mx-auto animate-fade-in font-semibold text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Mobile Single-Screen Compact Result Card */}
            {status === DownloadStatus.SUCCESS && result && (
              <div className="mt-6 sm:mt-10 max-w-3xl mx-auto glass-card dark:bg-brand-surface bg-white border dark:border-white/15 border-slate-300 shadow-2xl rounded-3xl p-4 sm:p-8 animate-fade-in text-left">
                {/* Desktop & Mobile Responsive Single Screen Viewport Card */}
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch">
                  {/* Thumbnail Cover */}
                  <div className="relative w-full md:w-1/3 aspect-[16/9] md:aspect-[9/16] max-h-48 md:max-h-none rounded-2xl overflow-hidden bg-gray-900 shadow-lg group cursor-pointer flex-shrink-0">
                     <img src={result.cover} alt={result.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                           <PlayIcon className="w-6 h-6 fill-white" />
                        </div>
                     </div>
                  </div>

                  {/* Info & Format Selection */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                         <img src={result.authorAvatar} alt={result.author} className="w-10 h-10 rounded-full border-2 border-brand-pink shadow-md" />
                         <div>
                            <p className="font-bold dark:text-white text-slate-900 text-sm sm:text-base leading-tight">{result.author}</p>
                            <p className="text-[11px] dark:text-gray-400 text-slate-500 font-medium">Verified Creator</p>
                         </div>
                      </div>
                      <h3 className="text-base sm:text-xl font-bold dark:text-white text-slate-900 mb-2 line-clamp-2 leading-snug">{result.title}</h3>
                      <div className="flex gap-4 text-xs sm:text-sm dark:text-gray-400 text-slate-600 mb-4 font-semibold">
                         <span>❤️ {result.likes}</span>
                         <span>⬇️ {result.downloads}</span>
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      {/* Format Selection Selector */}
                      {result.formats && result.formats.length > 0 && (
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-gray-300 text-slate-700 mb-1 flex items-center justify-between">
                            <span>Select Format & Quality</span>
                            <span className="text-brand-pink font-semibold">No Watermark</span>
                          </label>
                          <select
                            value={selectedFormat}
                            onChange={(e) => setSelectedFormat(e.target.value)}
                            aria-label="Select Video Format and Quality"
                            className="w-full dark:bg-gray-800 dark:border-white/20 dark:text-white bg-slate-100 border-slate-300 text-slate-900 border rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-brand-cyan font-bold text-xs sm:text-sm transition-colors cursor-pointer min-h-[48px]"
                          >
                            {result.formats.map((format) => (
                              <option key={format.id} value={format.id}>
                                {format.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      
                      {/* MP3 Audio Trimmer CTA */}
                      <button
                        type="button"
                        onClick={() => setShowAudioTrimmer(true)}
                        className="w-full py-2.5 bg-brand-pink/20 hover:bg-brand-pink/30 text-brand-pink font-bold text-xs rounded-xl transition-all border border-brand-pink/30 flex items-center justify-center gap-1.5"
                      >
                        <span>🎵 Trim & Make Ringtone (15s / 30s Snippet)</span>
                      </button>

                      {/* 1-Tap Thumb Friendly Download Button */}
                      <button 
                        onClick={handleFormatDownload}
                        disabled={isDownloading || !selectedFormat}
                        aria-label="Download video now"
                        className="w-full py-3.5 bg-gradient-to-r from-brand-cyan to-brand-pink hover:opacity-90 active:scale-[0.98] disabled:bg-gray-500 text-white font-extrabold text-base rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-xl min-h-[50px]"
                      >
                        {isDownloading ? (
                          <>
                            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Downloading File...</span>
                          </>
                        ) : (
                          <>
                            <DownloadIcon className="w-5 h-5" /> Download File
                          </>
                        )}
                      </button>

                      {/* Progress Bar */}
                      {isDownloading && (
                        <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden p-0.5">
                          <div 
                            className="bg-gradient-to-r from-brand-cyan to-brand-pink h-full rounded-full transition-all duration-300"
                            style={{ width: `${downloadProgress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* High CTR Post-Downloader Ad Slot */}
            <AdBanner slot="postDownloader" className="mt-8 max-w-3xl mx-auto" />
          </div>
        </div>
      </section>

      {/* Audio Trimmer Modal */}
      {showAudioTrimmer && result && (
        <AudioTrimmer
          title={result.title}
          author={result.author}
          cover={result.cover}
          onClose={() => setShowAudioTrimmer(false)}
        />
      )}

      {/* Stats Section */}
      <section className="border-y dark:border-white/10 border-slate-200 dark:bg-white/[0.02] bg-slate-100/80 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-12 text-center">
           <StatItem number={seo.stat1Number || "10M+"} label={seo.stat1Label || "Videos Saved"} />
           <StatItem number={seo.stat2Number || "0s"} label={seo.stat2Label || "Lag Time"} />
           <StatItem number={seo.stat3Number || "100%"} label={seo.stat3Label || "Free & Secure"} />
           <StatItem number={seo.stat4Number || "4.9/5"} label={seo.stat4Label || "User Rating"} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-24 relative px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-6 dark:text-white text-slate-900">
              {seo.featuresSectionHeading || 'Why Choose TikSavePro?'}
            </h2>
            <p className="dark:text-gray-300 text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto">
              {seo.featuresSectionSubtitle || 'We offer the fastest watermark removal engine on the web with crisp HD quality.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard 
              icon={<ShieldIcon className="w-8 h-8 text-brand-cyan" />}
              title={seo.feature1Title || 'No Watermark'}
              desc={seo.feature1Desc || 'Download high-quality TikTok videos completely clean, without any logo or username watermark overlay.'}
            />
            <FeatureCard 
              icon={<ZapIcon className="w-8 h-8 text-brand-pink" />}
              title={seo.feature2Title || 'Lightning Fast'}
              desc={seo.feature2Desc || 'Our optimized cloud servers ensure your video downloads start instantly and finish in seconds.'}
            />
            <FeatureCard 
              icon={<CheckIcon className="w-8 h-8 text-purple-500" />}
              title={seo.feature3Title || 'Unlimited & Free'}
              desc={seo.feature3Desc || 'No daily limits, no login required, no hidden costs. Pure unlimited video downloading freedom.'}
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 sm:py-24 dark:bg-brand-surface bg-slate-100/90 border-t border-slate-200 dark:border-transparent relative overflow-hidden px-4 sm:px-6">
         <div className="max-w-7xl mx-auto relative z-10">
           <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-16 dark:text-white text-slate-900">
             {seo.stepsSectionHeading || 'How to Download in 3 Easy Steps'}
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
             <StepCard 
                number="01" 
                title={seo.step1Title || 'Copy Link'} 
                desc={seo.step1Desc || 'Open the TikTok app or website, find the video you like, tap Share and select \'Copy Link\'.'} 
             />
             <StepCard 
                number="02" 
                title={seo.step2Title || 'Paste Link'} 
                desc={seo.step2Desc || 'Paste your video link into the search box at the top of TikSave Pro.'} 
             />
             <StepCard 
                number="03" 
                title={seo.step3Title || 'Download Video'} 
                desc={seo.step3Desc || 'Click Download and choose your preferred quality (MP4 HD or MP3 Audio).'} 
             />
           </div>
         </div>
      </section>
    </div>
  );
};

const StatItem = ({ number, label }: { number: string; label: string }) => (
  <div className="flex flex-col items-center justify-center p-4 rounded-2xl glass-card border dark:border-white/10 border-slate-200/90 shadow-sm">
    <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink mb-1">{number}</span>
    <span className="dark:text-gray-300 text-slate-700 uppercase tracking-wider text-[11px] sm:text-sm font-extrabold">{label}</span>
  </div>
);

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="glass-card p-6 sm:p-8 rounded-3xl transition-all duration-300 dark:border-white/10 border-slate-200/90 shadow-md hover:shadow-xl group flex flex-col justify-between">
    <div>
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl dark:bg-white/10 bg-slate-100 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold dark:text-white text-slate-900 mb-2 sm:mb-3">{title}</h3>
      <p className="dark:text-gray-300 text-slate-600 leading-relaxed text-sm sm:text-base">{desc}</p>
    </div>
  </div>
);

const StepCard = ({ number, title, desc }: { number: string; title: string; desc: string }) => (
  <div className="glass-card p-6 sm:p-8 rounded-3xl border dark:border-white/10 border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink">{number}</span>
      <span className="px-3 py-1 rounded-full dark:bg-white/10 bg-slate-100 dark:text-gray-300 text-slate-700 font-bold text-xs">
        Step {number}
      </span>
    </div>
    <h3 className="text-lg sm:text-xl font-bold dark:text-white text-slate-900 mb-2 sm:mb-3">{title}</h3>
    <p className="dark:text-gray-300 text-slate-600 leading-relaxed text-sm sm:text-base">{desc}</p>
  </div>
);

export default Home;