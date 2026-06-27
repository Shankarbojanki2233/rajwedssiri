'use client';

import { motion } from 'motion/react';
import { weddingData } from '@/config/wedding-data';
import SectionFrame from '@/components/decorations/SectionFrame';
import ScrollReveal from '@/components/animations/ScrollReveal';
import RangoliDivider from '@/components/decorations/RangoliDivider';

export default function VideoSection() {
  const { video } = weddingData;

  // Don't render if video is disabled or no URL
  if (!video.url) return null;

  return (
    <SectionFrame id="video" variant="cream">
      {/* Section Header */}
      <ScrollReveal direction="up" className="mb-12 w-full text-center">
        <p className="font-telugu text-lg text-gold md:text-xl">
          వివాహ ఆహ్వాన వీడియో
        </p>
        <h2 className="font-display mt-1 text-3xl font-bold text-maroon md:text-5xl">
          Wedding Invitation Video
        </h2>
        <RangoliDivider variant="lotus" className="mx-auto max-w-xs" />
      </ScrollReveal>

      {/* Video Player */}
      <motion.div
        className="mx-auto max-w-4xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Video container */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {video.type === 'youtube' && (
            <iframe
              src={video.url}
              title="Wedding Invitation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          )}
          {video.type === 'vimeo' && (
            <iframe
              src={video.url}
              title="Wedding Invitation Video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          )}
          {video.type === 'mp4' && (
            <video
              src={video.url}
              title="Wedding Invitation Video"
              controls
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {/* Fallback thumbnail */}
          {!video.url && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-maroon via-[#5a0016] to-[#2d000b]">
              <img
                src={video.thumbnail || '/images/default-video-thumbnail.jpg'}
                alt="Wedding Invitation Video Thumbnail"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cream"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* Video title */}
        {video.type !== 'mp4' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-cream/50">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m22 8-6 4 6 4V8Z" />
              <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
            </svg>
            <p className="text-xs">
              Streaming on{' '}
              {video.type === 'youtube'
                ? 'YouTube'
                : video.type === 'vimeo'
                ? 'Vimeo'
                : 'MP4'}
            </p>
          </div>
        )}
      </motion.div>
    </SectionFrame>
  );
}