import React, { useState } from 'react';
import { DownloadIcon, CheckIcon, ShieldIcon, ZapIcon, SparklesIcon, ArrowRightIcon, AppleIcon, WindowsIcon } from '../components/Icons';

const InstallApp: React.FC = () => {
  const [selectedOS, setSelectedOS] = useState<'windows' | 'mac' | 'android' | 'ios'>('windows');
  const [downloadStep, setDownloadStep] = useState(0);

  const features = [
    {
      icon: <ZapIcon className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Download videos in seconds with our optimized engine'
    },
    {
      icon: <ShieldIcon className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never stored on our servers'
    },
    {
      icon: <CheckIcon className="w-6 h-6" />,
      title: 'No Watermarks',
      description: 'Download clean videos without any watermarks added'
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: 'Batch Download',
      description: 'Download multiple videos at once with our desktop app'
    }
  ];

  const platforms = [
    {
      id: 'windows',
      name: 'Windows',
      icon: <WindowsIcon className="w-8 h-8" />,
      version: 'v2.1.0',
      size: '45 MB',
      compatibility: 'Windows 10 & 11',
      features: ['Batch Download', 'Auto Updates', 'Dark Mode', 'Clipboard Watch']
    },
    {
      id: 'mac',
      name: 'macOS',
      icon: <AppleIcon className="w-8 h-8" />,
      version: 'v2.1.0',
      size: '52 MB',
      compatibility: 'macOS 11.0+',
      features: ['Batch Download', 'Auto Updates', 'Dark Mode', 'Clipboard Watch']
    },
    {
      id: 'android',
      name: 'Android',
      icon: <DownloadIcon className="w-8 h-8" />,
      version: 'v1.5.0',
      size: '28 MB',
      compatibility: 'Android 8.0+',
      features: ['Quick Share', 'No Ads', 'Background Download', 'HD Videos']
    },
    {
      id: 'ios',
      name: 'iOS',
      icon: <AppleIcon className="w-8 h-8" />,
      version: 'v1.4.0',
      size: '35 MB',
      compatibility: 'iOS 13.0+',
      features: ['Quick Share', 'Background Download', 'HD Videos', 'iCloud Sync']
    }
  ];

  const downloadSteps = [
    {
      number: 1,
      title: 'Download',
      description: 'Click the download button for your device'
    },
    {
      number: 2,
      title: 'Install',
      description: 'Follow the installation wizard on your device'
    },
    {
      number: 3,
      title: 'Launch',
      description: 'Open the app and start downloading videos'
    },
    {
      number: 4,
      title: 'Enjoy',
      description: 'Download unlimited TikTok videos instantly'
    }
  ];

  const currentPlatform = platforms.find(p => p.id === selectedOS);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20 pt-12 lg:pt-24">
        {/* Background Globs */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-pink/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-cyan to-brand-pink bg-opacity-10 px-4 py-2 rounded-full mb-6 border border-brand-cyan/30">
              <SparklesIcon className="w-4 h-4 text-brand-cyan" />
              <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-pink">
                Desktop & Mobile Apps Available
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-300 to-brand-cyan bg-clip-text text-transparent">
                Download TikTok Videos
              </span>
              <br />
              <span className="bg-gradient-to-r from-brand-cyan to-brand-pink bg-clip-text text-transparent">
                Anywhere, Anytime
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Get our lightning-fast app for Windows, macOS, Android, and iOS. Download unlimited videos with zero watermarks and complete privacy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-brand-cyan to-brand-pink px-8 py-4 rounded-full font-bold text-black text-lg hover:shadow-lg hover:shadow-brand-cyan/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <DownloadIcon className="w-5 h-5" />
                Download Now
              </button>
              <button className="border-2 border-brand-cyan text-brand-cyan px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-cyan hover:text-black transition-all duration-300 flex items-center justify-center gap-2">
                View Features
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20">
            {[
              { number: '500K+', label: 'Active Users' },
              { number: '10M+', label: 'Videos Downloaded' },
              { number: '99.8%', label: 'Success Rate' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl text-center hover:border-brand-cyan/50 transition-all duration-300">
                <div className="text-3xl font-black bg-gradient-to-r from-brand-cyan to-brand-pink bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Selection */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Choose Your Platform
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Available on all major platforms with the same powerful features
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedOS(platform.id as any)}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  selectedOS === platform.id
                    ? 'glass-card border-brand-cyan/50 bg-gradient-to-br from-brand-cyan/10 to-brand-pink/10'
                    : 'glass-card border-transparent hover:border-brand-cyan/30'
                }`}
              >
                <div className={`text-center ${selectedOS === platform.id ? 'text-brand-cyan' : 'text-gray-400'}`}>
                  {platform.icon}
                </div>
                <div className={`font-bold text-lg mt-3 ${selectedOS === platform.id ? 'text-white' : 'text-gray-300'}`}>
                  {platform.name}
                </div>
                <div className="text-sm text-gray-500 mt-1">{platform.version}</div>
              </button>
            ))}
          </div>

          {/* Platform Details */}
          {currentPlatform && (
            <div className="glass-card rounded-3xl p-8 md:p-12 border-brand-cyan/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="text-6xl font-black text-brand-cyan mb-2">{currentPlatform.icon}</div>
                  <h3 className="text-3xl font-black mb-2">{currentPlatform.name}</h3>
                  <p className="text-gray-400 mb-6">{currentPlatform.compatibility}</p>
                  
                  <div className="bg-brand-darker p-4 rounded-xl mb-6">
                    <div className="text-sm text-gray-400">App Size</div>
                    <div className="text-2xl font-bold text-brand-cyan">{currentPlatform.size}</div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-brand-cyan to-brand-pink px-6 py-4 rounded-xl font-bold text-black text-lg hover:shadow-lg hover:shadow-brand-cyan/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                    <DownloadIcon className="w-5 h-5" />
                    Download for {currentPlatform.name}
                  </button>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-6">Included Features</h4>
                  <div className="space-y-4">
                    {currentPlatform.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-cyan to-brand-pink flex items-center justify-center flex-shrink-0">
                          <CheckIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Powerful Features
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Built for speed, security, and user experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl hover:border-brand-cyan/50 transition-all duration-300 group"
              >
                <div className="text-brand-cyan mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Quick Installation
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Get started in just 4 simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {downloadSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < downloadSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[50%] w-full h-1 bg-gradient-to-r from-brand-cyan to-transparent ml-4 -z-10" />
                )}

                <div className="glass-card p-8 rounded-2xl text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan to-brand-pink rounded-full flex items-center justify-center text-white font-black text-lg mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            System Requirements
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Minimal requirements for maximum performance
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Windows Requirements */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <WindowsIcon className="w-6 h-6" />
                Windows
              </h3>
              <ul className="space-y-3">
                {['Windows 10 or later', 'Intel Core i5 or AMD equivalent', '4GB RAM minimum', '50MB disk space'].map((req, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckIcon className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mac Requirements */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <AppleIcon className="w-6 h-6" />
                macOS
              </h3>
              <ul className="space-y-3">
                {['macOS 11.0 or later', 'Intel or Apple Silicon', '4GB RAM minimum', '50MB disk space'].map((req, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckIcon className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Android Requirements */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <DownloadIcon className="w-6 h-6" />
                Android
              </h3>
              <ul className="space-y-3">
                {['Android 8.0 or later', '2GB RAM minimum', '25MB disk space', 'Internet connection'].map((req, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckIcon className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* iOS Requirements */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <AppleIcon className="w-6 h-6" />
                iOS
              </h3>
              <ul className="space-y-3">
                {['iOS 13.0 or later', '2GB RAM minimum', '30MB disk space', 'Internet connection'].map((req, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckIcon className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            What Users Say
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Join thousands of happy users worldwide
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Chen',
                role: 'Content Creator',
                quote: 'TikSave Pro has saved me hours of work. The batch download feature is a game-changer!'
              },
              {
                name: 'Marcus Johnson',
                role: 'Digital Marketer',
                quote: 'Fast, reliable, and the interface is so clean. Best download tool I\'ve used.'
              },
              {
                name: 'Emma Rodriguez',
                role: 'Freelance Editor',
                quote: 'No watermarks, no ads, no nonsense. Just pure functionality. Highly recommended!'
              }
            ].map((testimonial, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl hover:border-brand-cyan/50 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-brand-cyan">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-brand-cyan">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-12 md:p-16 border-brand-cyan/30 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/10 to-brand-pink/10 blur-3xl -z-10" />

            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Download Faster?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join millions of users and get instant access to all your favorite TikTok videos
            </p>
            <button className="bg-gradient-to-r from-brand-cyan to-brand-pink px-10 py-5 rounded-full font-bold text-black text-lg hover:shadow-lg hover:shadow-brand-cyan/50 transition-all duration-300 transform hover:-translate-y-1">
              Download App Now - It's Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstallApp;
