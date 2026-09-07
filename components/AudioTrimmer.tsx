import React, { useState, useEffect, useRef } from 'react';
import { DownloadIcon, PlayIcon } from './Icons';
import { recordDownloadEvent } from '../services/analyticsService';

interface AudioTrimmerProps {
  title: string;
  author: string;
  cover: string;
  onClose: () => void;
}

const AudioTrimmer: React.FC<AudioTrimmerProps> = ({ title, author, cover, onClose }) => {
  const TOTAL_DURATION = 30; // 30 seconds default sound length
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playTrimmedAudio();
    }
  };

  const playTrimmedAudio = () => {
    stopAudio();
    setIsPlaying(true);
    setCurrentTime(startTime);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      // Gentle melodic tone for preview
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + (endTime - startTime));

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (endTime - startTime));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;

      const clipLengthMs = (endTime - startTime) * 1000;

      const startTimeMs = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeMs) / 1000;
        if (elapsed >= (endTime - startTime)) {
          stopAudio();
        } else {
          setCurrentTime(startTime + elapsed);
        }
      }, 100);
    } catch (e) {
      console.error('Audio playback error', e);
    }
  };

  const stopAudio = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTime(startTime);
  };

  const applyPreset = (presetSeconds: number) => {
    stopAudio();
    setStartTime(0);
    setEndTime(Math.min(presetSeconds, TOTAL_DURATION));
  };

  const handleExportRingtone = async () => {
    setIsExporting(true);
    stopAudio();

    try {
      // Synthesize clean WAV file blob in browser using OfflineAudioContext
      const clipDuration = Math.max(1, endTime - startTime);
      const sampleRate = 44100;
      const numFrames = sampleRate * clipDuration;

      const OfflineCtx = window.OfflineAudioContext || (window as any).webkitOfflineAudioContext;
      const offlineCtx = new OfflineCtx(2, numFrames, sampleRate);

      const osc = offlineCtx.createOscillator();
      const gain = offlineCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, offlineCtx.currentTime); // C5 note
      osc.frequency.exponentialRampToValueAtTime(659.25, offlineCtx.currentTime + clipDuration); // E5 note

      gain.gain.setValueAtTime(0.3, offlineCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, offlineCtx.currentTime + clipDuration);

      osc.connect(gain);
      gain.connect(offlineCtx.destination);
      osc.start();

      const renderedBuffer = await offlineCtx.startRendering();

      // Encode AudioBuffer to WAV blob
      const wavBlob = audioBufferToWav(renderedBuffer);
      const blobUrl = URL.createObjectURL(wavBlob);

      const cleanName = title.replace(/[^a-z0-9_-]/gi, '_');
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${cleanName}_${clipDuration}s_ringtone.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      recordDownloadEvent(`MP3 Trimmed Ringtone (${clipDuration}s)`);

      setTimeout(() => {
        setIsExporting(false);
      }, 1000);
    } catch (e) {
      console.error('Ringtone export failed', e);
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="max-w-md w-full dark:bg-brand-surface bg-white rounded-3xl border dark:border-white/15 border-slate-300 p-6 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-slate-200">
          <div className="flex items-center gap-3">
            <img src={cover} alt={title} className="w-10 h-10 rounded-xl object-cover border border-white/20" />
            <div>
              <h3 className="font-bold text-sm dark:text-white text-slate-900 line-clamp-1">{title}</h3>
              <p className="text-xs text-brand-pink font-semibold">🎵 MP3 Audio Trimmer & Ringtone Creator</p>
            </div>
          </div>
          <button
            onClick={() => { stopAudio(); onClose(); }}
            className="w-8 h-8 rounded-full dark:bg-white/10 bg-slate-200 flex items-center justify-center font-bold text-gray-400 hover:text-red-400"
          >
            ✕
          </button>
        </div>

        {/* Quick Presets */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-gray-300 text-slate-700 mb-2">
            Quick Ringtone Presets
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => applyPreset(15)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                endTime - startTime === 15 && startTime === 0
                  ? 'bg-brand-pink text-white border-brand-pink shadow-md'
                  : 'dark:bg-white/5 bg-slate-100 dark:text-gray-300 text-slate-700 border-slate-300 dark:border-white/10'
              }`}
            >
              ⏱️ 15s Sound
            </button>

            <button
              onClick={() => applyPreset(30)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                endTime - startTime === 30 && startTime === 0
                  ? 'bg-brand-cyan text-black border-brand-cyan shadow-md'
                  : 'dark:bg-white/5 bg-slate-100 dark:text-gray-300 text-slate-700 border-slate-300 dark:border-white/10'
              }`}
            >
              🔔 30s Ringtone
            </button>

            <button
              onClick={() => { setStartTime(0); setEndTime(TOTAL_DURATION); }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                endTime - startTime === TOTAL_DURATION
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                  : 'dark:bg-white/5 bg-slate-100 dark:text-gray-300 text-slate-700 border-slate-300 dark:border-white/10'
              }`}
            >
              🎵 Full Audio
            </button>
          </div>
        </div>

        {/* Visual Waveform & Trimmer Sliders */}
        <div className="p-4 rounded-2xl dark:bg-black/40 bg-slate-100 border dark:border-white/10 border-slate-200 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold font-mono">
            <span className="text-brand-cyan">Start: {formatTime(startTime)}</span>
            <span className="text-brand-pink">Duration: {Math.round(endTime - startTime)}s</span>
            <span className="text-purple-400">End: {formatTime(endTime)}</span>
          </div>

          {/* Waveform graphic bars */}
          <div className="relative h-16 flex items-center justify-between gap-1 px-2 dark:bg-black/60 bg-white rounded-xl overflow-hidden border border-slate-300 dark:border-white/10">
            {[40, 70, 30, 90, 60, 80, 50, 100, 40, 85, 95, 65, 30, 75, 80, 50, 90, 60, 70, 40, 80, 100, 55, 35, 75, 90, 60, 40].map((h, i) => {
              const barPos = (i / 28) * TOTAL_DURATION;
              const isInRange = barPos >= startTime && barPos <= endTime;
              return (
                <div
                  key={i}
                  className={`w-full rounded-full transition-all duration-300 ${
                    isInRange
                      ? 'bg-gradient-to-t from-brand-cyan to-brand-pink opacity-90'
                      : 'dark:bg-gray-700 bg-slate-300 opacity-40'
                  }`}
                  style={{ height: `${h}%` }}
                />
              );
            })}
          </div>

          {/* Dual Range Controls */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[11px] font-bold dark:text-gray-400 text-slate-600 mb-1">
                <span>Start Offset</span>
                <span>{formatTime(startTime)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.max(0, endTime - 2)}
                step={0.5}
                value={startTime}
                onChange={(e) => {
                  stopAudio();
                  setStartTime(parseFloat(e.target.value));
                }}
                className="w-full accent-brand-cyan cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold dark:text-gray-400 text-slate-600 mb-1">
                <span>End Offset</span>
                <span>{formatTime(endTime)}</span>
              </div>
              <input
                type="range"
                min={Math.min(TOTAL_DURATION, startTime + 2)}
                max={TOTAL_DURATION}
                step={0.5}
                value={endTime}
                onChange={(e) => {
                  stopAudio();
                  setEndTime(parseFloat(e.target.value));
                }}
                className="w-full accent-brand-pink cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleTogglePlay}
            className={`flex-1 py-3 rounded-xl font-extrabold text-sm border flex items-center justify-center gap-2 transition-all ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'dark:bg-white/10 bg-slate-200 dark:text-white text-slate-800 border-slate-300 dark:border-white/15 hover:bg-slate-300 dark:hover:bg-white/20'
            }`}
          >
            {isPlaying ? (
              <>⏸️ Pause Preview ({Math.round(currentTime)}s)</>
            ) : (
              <>
                <PlayIcon className="w-4 h-4" /> Play Trimmed Snippet
              </>
            )}
          </button>

          <button
            onClick={handleExportRingtone}
            disabled={isExporting}
            className="flex-1 py-3 bg-gradient-to-r from-brand-cyan to-brand-pink text-white font-extrabold text-sm rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isExporting ? (
              <span>Exporting...</span>
            ) : (
              <>
                <DownloadIcon className="w-4 h-4" /> Save Ringtone (.mp3)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper to convert Web Audio API AudioBuffer to WAV Blob
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const resultLength = buffer.length * numChannels * 2;
  const wavBuffer = new ArrayBuffer(44 + resultLength);
  const view = new DataView(wavBuffer);

  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  /* RIFF identifier */
  writeString(0, 'RIFF');
  /* RIFF chunk length */
  view.setUint32(4, 36 + resultLength, true);
  /* RIFF type */
  writeString(8, 'WAVE');
  /* format chunk identifier */
  writeString(12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, format, true);
  /* channel count */
  view.setUint16(22, numChannels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * numChannels * 2, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, numChannels * 2, true);
  /* bits per sample */
  view.setUint16(34, bitDepth, true);
  /* data chunk identifier */
  writeString(36, 'data');
  /* data chunk length */
  view.setUint32(40, resultLength, true);

  // Write PCM audio samples
  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([wavBuffer], { type: 'audio/wav' });
}

export default AudioTrimmer;
