'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { weddingData } from '@/config/wedding-data';

export default function MusicPlayer() {
  const { music } = weddingData;
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const currentTrack = music.tracks[currentTrackIndex];

  // Sync audio state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  // Handle track end -> play next
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (currentTrackIndex < music.tracks.length - 1) {
        setCurrentTrackIndex((prev) => prev + 1);
      } else {
        setCurrentTrackIndex(0);
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentTrackIndex, music.tracks.length]);

  // When track changes, play if already playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasInteracted) return;

    audio.load();
    if (isPlaying) {
      audio.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasInteracted) {
      setHasInteracted(true);
      setIsExpanded(true);
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked
        setIsPlaying(false);
      }
    }
  }, [isPlaying, hasInteracted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  if (!music.enabled) return null;

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="none">
        <source src={currentTrack.src} type="audio/mpeg" />
      </audio>

      {/* Player Container */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence mode="wait">
          {!hasInteracted ? (
            /* Initial "Play Music" Button */
            <motion.button
              key="initial"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 1, duration: 0.4, type: 'spring', stiffness: 200 }}
              onClick={togglePlay}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-maroon to-temple-red px-5 py-3 text-sm font-semibold text-white shadow-xl hover:shadow-2xl transition-shadow"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎵
              </motion.span>
              Play Music
            </motion.button>
          ) : isExpanded ? (
            /* Expanded Player */
            <motion.div
              key="expanded"
              initial={{ width: 56, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 56, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden rounded-2xl border border-gold/20 bg-white/95 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-3 p-3">
                {/* Play/Pause */}
                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors',
                    isPlaying
                      ? 'bg-maroon text-white'
                      : 'bg-gold/20 text-maroon'
                  )}
                  aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                  {isPlaying ? (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.button>

                {/* Track Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-maroon">
                    {currentTrack.name}
                  </p>
                  {isPlaying && (
                    <div className="mt-1 flex items-center gap-0.5">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-0.5 rounded-full bg-gold"
                          animate={{
                            height: ['4px', '12px', '6px', '10px', '4px'],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Mute Toggle */}
                <button
                  onClick={toggleMute}
                  className="shrink-0 rounded-lg p-1.5 text-maroon/60 transition-colors hover:bg-gold/10 hover:text-maroon"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>

                {/* Volume Slider - hidden on mobile */}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="hidden w-16 accent-gold md:block"
                  aria-label="Volume"
                />

                {/* Collapse Button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="shrink-0 rounded-lg p-1.5 text-maroon/40 transition-colors hover:bg-maroon/5 hover:text-maroon"
                  aria-label="Minimize player"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Collapsed Mini Button */
            <motion.button
              key="collapsed"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsExpanded(true)}
              className={cn(
                'relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-shadow hover:shadow-2xl',
                isPlaying
                  ? 'bg-gradient-to-br from-maroon to-temple-red'
                  : 'bg-white border border-gold/20'
              )}
              aria-label="Open music player"
            >
              <span className={cn('text-xl', isPlaying ? '' : 'grayscale-0')}>
                🎵
              </span>

              {/* Playing indicator ring */}
              {isPlaying && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-gold/50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
