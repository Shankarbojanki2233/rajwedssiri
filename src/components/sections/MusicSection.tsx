'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { weddingData } from '@/config/wedding-data';
import SectionFrame from '@/components/decorations/SectionFrame';
import ScrollReveal from '@/components/animations/ScrollReveal';
import RangoliDivider from '@/components/decorations/RangoliDivider';
import { cn } from '@/lib/utils';

export default function MusicSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = weddingData.music.tracks;

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;
  }, [volume, isMuted]);

  const playPause = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const setVolumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  // Update audio source when track changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = tracks[currentTrack].src;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrack, isPlaying]);

  // Handle ended event to play next track
  useEffect(() => {
    if (!audioRef.current) return;
    const handleEnded = () => {
      nextTrack();
    };
    audioRef.current.addEventListener('ended', handleEnded);
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  return (
    <SectionFrame id="music" variant="default">
      {/* Section Header */}
      <ScrollReveal direction="up" className="mb-12 w-full text-center md:mb-16">
        <p className="font-telugu text-lg text-gold md:text-xl">
          సంగీతం
        </p>
        <h2 className="font-display mt-1 text-3xl font-bold text-maroon md:text-5xl">
          Music
        </h2>
        <RangoliDivider variant="lotus" className="mx-auto max-w-xs" />
      </ScrollReveal>

      {/* Music Player */}
      <motion.div
        className="mx-auto max-w-xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Current Track Info */}
          <div className="text-center">
            <h3 className="font-display text-2xl font-bold text-maroon md:text-3xl">
              {tracks[currentTrack].name}
            </h3>
            <p className="font-telugu mt-1 text-lg text-gold">
              {tracks[currentTrack].name}
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-6">
              {/* Previous */}
              <motion.button
                onClick={prevTrack}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-ivory transition-colors hover:bg-gold/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-maroon"
                >
                  <polygon points="15 18 9 12 15 6 15 18" />
                  <line x1="5" y1="12" x2="5" y2="12" />
                </svg>
              </motion.button>

              {/* Play/Pause */}
              <motion.button
                onClick={playPause}
                className={`flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 ${
                  isPlaying ? 'bg-gold/20' : 'bg-ivory'
                } transition-colors hover:bg-gold/10`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-6 w-6 text-maroon ${
                    isPlaying ? 'hidden' : 'inline-block'
                  }`}
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-6 w-6 text-maroon ${
                    !isPlaying ? 'hidden' : 'inline-block'
                  }`}
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="16" y1="5" x2="16" y2="19" />
                </svg>
              </motion.button>

              {/* Next */}
              <motion.button
                onClick={nextTrack}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-ivory transition-colors hover:bg-gold/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-maroon"
                >
                  <polygon points="9 18 15 12 9 6 9 18" />
                  <line x1="19" y1="12" x2="19" y2="12" />
                </svg>
              </motion.button>
            </div>

            {/* Volume Controls */}
            <div className="flex items-center justify-center gap-4">
              {/* Volume controls */}
              <motion.button
                onClick={toggleMute}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-ivory transition-colors hover:bg-gold/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-5 w-5 text-maroon ${
                    isMuted ? 'hidden' : 'inline-block'
                  }`}
                >
                  <path d="M12 5a3 3 0 100 6 5 3 0 000-6z" />
                  <path d="M19 10v2a7 7 0 01-1.355 5.657l-2.646 2.646a2 2 0 01-1.415 0l-.708-.707A5 5 0 0018 15v-2a3 3 0 00-3.732-2.121l-1.415-1.414A3 3 0 0013 9V4a3 3 0 016 0z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-5 w-5 text-maroon ${
                    !isMuted ? 'hidden' : 'inline-block'
                  }`}
                >
                  <path d="M12 5a3 3 0 100 6 5 3 0 000-6z" />
                  <path d="M12 15h.01" />
                  <line x1="12" y1="17" x2="12" y2="19" />
                  <line x1="8" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="13" x2="16" y2="13" />
                  <line x1="10" y1="11" x2="10" y2="15" />
                  <line x1="14" y1="11" x2="14" y2="15" />
                </svg>
              </motion.button>

              {/* Volume Slider */}
              <div className="flex items-center justify-center gap-2 w-32">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-maroon"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={setVolumeHandler}
                  className="w-full h-2 bg-gold/20 rounded"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-maroon"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15.41 8.59L12 5l-3.41 3.41" />
                </svg>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs text-maroon/50">
              <span>0:00</span>
              <div className="flex-1 h-1 bg-gold/20 rounded">
                <div
                  className="h-full bg-gold rounded"
                  style={{ width: isPlaying ? '50%' : '0%' }}
                />
              </div>
              <span>0:00</span>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionFrame>
  );
}