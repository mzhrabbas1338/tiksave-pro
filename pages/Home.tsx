import React, { useState } from 'react';
import { DownloadIcon, CheckIcon, ShieldIcon, ZapIcon, PlayIcon } from '../components/Icons';
import { fetchVideoData, downloadVideo } from '../services/mockApi';
import { DownloadStatus, MockVideoResult, VideoFormat } from '../types';

const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<DownloadStatus>(DownloadStatus.IDLE);
  const [result, setResult] = useState<MockVideoResult | null>(null);
  const [error, setError] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setStatus(DownloadStatus.LOADING);
    setError('');
    setResult(null);

    try {
      const data = await fetchVideoData(url);
      setResult(data);
      setStatus(DownloadStatus.SUCCESS);
      // Set first format as default
      if (data.formats && data.formats.length > 0) {
        setSelectedFormat(data.formats[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setStatus(DownloadStatus.ERROR);
    }
  };

    const handleFormatDownload = async () => {
    if (!selectedFormat || !result) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 20;
        });
      }, 500);

      const downloadUrl = await downloadVideo(url, selectedFormat);
      
      clearInterval(progressInterval);
      setDownloadProgress(100);

      // Trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${result.title.replace(/[^a-z0-9_-]/gi, '_')}.mp4`;
      link.style.display = 'none';
      document.body.appendChild(link);
      
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
        
        // Clean up blob URL if it was created
        if (downloadUrl.startsWith('blob:')) {
          URL.revokeObjectURL(downloadUrl);
        }
      }, 100);

      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
      }, 2000);
    } catch (err: any) {
      console.error('Download error:', err);
      setError(err.message || 'Download failed');
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Clipboard access denied');
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20 pt-12 lg:pt-24">
        {/* Background Globs */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-pink/20 rounded-full blur-[120px] animate-pulse delay-1000" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-float">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Updated for 2025 Algorithm</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Download TikToks <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-pink animate-gradient-x bg-[length:200%_auto]">
              Without Watermark
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Save your favorite videos in HD, Full HD, or 4K quality. 
            Unlimited downloads, no registration required.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <form onSubmit={handleDownload} className="relative flex flex-col sm:flex-row gap-2 bg-brand-surface p-2 rounded-2xl border border-white/10">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste TikTok link here..."
                  className="w-full h-14 pl-6 pr-24 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                />
                <button 
                  type="button"
                  onClick={handlePaste}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                >
                  PASTE
                </button>
              </div>
              <button 
                type="submit"
                disabled={status === DownloadStatus.LOADING}
                className="h-14 px-8 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-pink text-white font-bold text-lg shadow-lg hover:shadow-brand-cyan/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === DownloadStatus.LOADING ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Download</span>
                    <DownloadIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result Card */}
          {status === DownloadStatus.ERROR && (
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 max-w-lg mx-auto animate-fade-in">
              {error}
            </div>
          )}

          {status === DownloadStatus.SUCCESS && result && (
            <div className="mt-12 max-w-3xl mx-auto glass-card rounded-3xl p-6 md:p-8 animate-fade-in text-left">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-1/3 aspect-[9/16] rounded-2xl overflow-hidden bg-gray-800 shadow-2xl group cursor-pointer">
                   <img src={result.cover} alt={result.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                         <PlayIcon className="w-6 h-6 fill-white" />
                      </div>
                   </div>
                </div>
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                       <img src={result.authorAvatar} alt={result.author} className="w-10 h-10 rounded-full border-2 border-brand-pink" />
                       <div>
                          <p className="font-bold text-white">{result.author}</p>
                          <p className="text-xs text-gray-400">Verified Creator</p>
                       </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{result.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-400 mb-6">
                       <span>❤️ {result.likes}</span>
                       <span>⬇️ {result.downloads}</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    {/* Format Selection */}
                    {result.formats && result.formats.length > 0 && (
                      <select
                        value={selectedFormat}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="w-full bg-gray-800 border border-white/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                      >
                        {result.formats.map((format) => (
                          <option key={format.id} value={format.id}>
                            {format.label} {format.quality ? `(${format.quality})` : ''}
                          </option>
                        ))}
                      </select>
                    )}
                    
                    {/* Download Button */}
                    <button 
                      onClick={handleFormatDownload}
                      disabled={isDownloading || !selectedFormat}
                      className="w-full py-3 bg-brand-cyan hover:bg-cyan-400 disabled:bg-gray-600 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isDownloading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <DownloadIcon className="w-5 h-5" /> Download Video
                        </>
                      )}
                    </button>

                    {/* Progress Bar */}
                    {isDownloading && (
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-brand-cyan to-brand-pink h-full transition-all duration-300"
                          style={{ width: `${downloadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/5 bg-white/[0.02] py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 md:justify-between text-center">
           <StatItem number="10M+" label="Videos Downloaded" />
           <StatItem number="0s" label="Lag Time" />
           <StatItem number="100%" label="Free & Secure" />
           <StatItem number="4.9/5" label="User Rating" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose TikSave<span className="text-brand-cyan">Pro</span>?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">We offer the most advanced downloading technology in the market, wrapped in a beautiful interface.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldIcon className="w-8 h-8 text-brand-cyan" />}
              title="No Watermark"
              desc="Download high-quality videos completely clean, without the TikTok logo or username overlay."
            />
            <FeatureCard 
              icon={<ZapIcon className="w-8 h-8 text-brand-pink" />}
              title="Lightning Fast"
              desc="Our optimized servers ensure your downloads start instantly and finish in seconds."
            />
            <FeatureCard 
              icon={<CheckIcon className="w-8 h-8 text-purple-500" />}
              title="Unlimited Downloads"
              desc="No daily limits, no hidden costs, no subscription required. Just pure freedom."
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-brand-surface relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How to Download in 3 Steps</h2>
           <div className="grid md:grid-cols-3 gap-12">
             <StepCard 
                number="01" 
                title="Copy Link" 
                desc="Open TikTok app, find the video you like, tap Share and click 'Copy Link'." 
             />
             <StepCard 
                number="02" 
                title="Paste Link" 
                desc="Come back to TikSave Pro and paste the link into the search box above." 
             />
             <StepCard 
                number="03" 
                title="Download" 
                desc="Click Download and choose your preferred format (MP4 or MP3)." 
             />
           </div>
         </div>
      </section>
    </div>
  );
};

const StatItem = ({ number, label }: { number: string; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 mb-2">{number}</span>
    <span className="text-gray-400 uppercase tracking-wider text-sm">{label}</span>
  </div>
);

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/20 group">
    <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const StepCard = ({ number, title, desc }: { number: string; title: string; desc: string }) => (
  <div className="relative pl-8 md:pl-0">
    <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-gray-800"></div>
    <span className="text-6xl font-black text-gray-800 absolute -top-8 -left-4 md:relative md:top-0 md:left-0 md:block md:mb-4">{number}</span>
    <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{title}</h3>
    <p className="text-gray-400 relative z-10">{desc}</p>
  </div>
);

export default Home;