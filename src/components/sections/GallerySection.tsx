'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingData } from '@/config/wedding-data';
import { cn } from '@/lib/utils';
import SectionFrame from '@/components/decorations/SectionFrame';
import RangoliDivider from '@/components/decorations/RangoliDivider';
import ScrollReveal from '@/components/animations/ScrollReveal';

type Photo = (typeof weddingData.gallery.photos)[number];

// ── Gradient palette for placeholder cards ──────────────────────────────
const GRADIENT_PALETTES = [
  'from-[#D4AF37]/40 via-[#FFFDD0] to-[#D4AF37]/20',
  'from-[#800020]/30 via-[#FFFDD0] to-[#C41E3A]/20',
  'from-[#006A4E]/30 via-[#FFFFF0] to-[#D4AF37]/20',
  'from-[#D4AF37]/30 via-[#800020]/20 to-[#FFFDD0]',
  'from-[#C41E3A]/20 via-[#FFFFF0] to-[#006A4E]/30',
  'from-[#FFFDD0] via-[#D4AF37]/30 to-[#800020]/20',
  'from-[#006A4E]/20 via-[#D4AF37]/30 to-[#FFFFF0]',
  'from-[#800020]/20 via-[#D4AF37]/20 to-[#006A4E]/30',
  'from-[#D4AF37]/20 via-[#FFFDD0] to-[#C41E3A]/30',
  'from-[#FFFFF0] via-[#006A4E]/20 to-[#D4AF37]/30',
  'from-[#C41E3A]/30 via-[#D4AF37]/20 to-[#FFFDD0]',
  'from-[#D4AF37]/20 via-[#006A4E]/20 to-[#800020]/20',
];

// Vary aspect ratios for visual interest in masonry
const ASPECT_HEIGHTS = [
  'h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60',
  'h-68', 'h-48', 'h-56', 'h-64', 'h-52', 'h-72',
];

// ── Lightbox ────────────────────────────────────────────────────────────
function Lightbox({
  photos,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: {
  photos: Photo[];
  selectedIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext();
      else onPrev();
    }
  };

  const photo = photos[selectedIndex];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      {/* Counter */}
      <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
        {selectedIndex + 1} / {photos.length}
      </div>

      {/* Previous button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-4"
        aria-label="Previous photo"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image area */}
      <motion.div
        key={selectedIndex}
        className="mx-4 flex max-h-[85vh] max-w-4xl flex-col items-center cursor-zoom-out md:mx-16"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Real Image */}
        <div
          className={cn(
            'relative flex aspect-[4/3] w-full max-w-3xl items-center justify-center overflow-hidden rounded-xl',
            'border-2 border-[#D4AF37]/40 shadow-2xl bg-black'
          )}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Caption */}
        <p className="mt-4 text-center text-sm text-white/70">{photo.alt}</p>

        {/* Close button below image */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="mt-4 flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm text-white shadow-lg transition-colors hover:bg-white/25"
          aria-label="Close lightbox"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Close
        </button>
      </motion.div>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-4"
        aria-label="Next photo"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  );
}

// ── Gallery Card ────────────────────────────────────────────────────────
function GalleryCard({
  photo,
  index,
  onClick,
}: {
  photo: Photo;
  index: number;
  onClick: () => void;
}) {
  const gradientIndex = index % GRADIENT_PALETTES.length;
  const heightClass = ASPECT_HEIGHTS[index % ASPECT_HEIGHTS.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group mb-4 break-inside-avoid"
    >
      <button
        onClick={onClick}
        className={cn(
          'relative w-full overflow-hidden rounded-xl',
          heightClass,
          'flex items-center justify-center',
          'border border-[#D4AF37]/20 shadow-md',
          'transition-all duration-300',
          'cursor-pointer',
          'hover:shadow-xl hover:shadow-[#D4AF37]/20',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]'
        )}
        aria-label={`View: ${photo.alt}`}
      >
        {/* Real image with gradient loading placeholder */}
        <div className={cn('absolute inset-0 bg-gradient-to-br', GRADIENT_PALETTES[gradientIndex])} />
        <img
          src={photo.src}
          alt={photo.alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Hover overlay with zoom icon */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'bg-maroon/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300',
            'group-hover:opacity-100'
          )}
        >
          <div className="rounded-full bg-white/90 p-3 shadow-lg">
            <svg
              className="h-5 w-5 text-maroon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

// ── Gallery Section ─────────────────────────────────────────────────────
export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const photos = weddingData.gallery.photos;

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null
    );
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % photos.length : null
    );
  }, [photos.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  return (
    <SectionFrame id="gallery" variant="default">
      {/* Section Header */}
      <ScrollReveal direction="up">
        <div className="mb-8 text-center">
          <motion.p
            className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-gold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Moments To Cherish
          </motion.p>

          <h2 className="text-3xl font-bold tracking-tight text-maroon md:text-4xl lg:text-5xl">
            Gallery
          </h2>

          <p className="mt-2 text-xl text-gold md:text-2xl">
            ఫోటో గ్యాలరీ
          </p>

          <RangoliDivider variant="ornate" className="mx-auto max-w-sm" />
        </div>
      </ScrollReveal>

      {/* Masonry Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key="gallery-grid"
          className={cn(
            'mx-auto w-full max-w-7xl px-4',
            'columns-2 gap-4',
            'md:columns-3',
            'lg:columns-4'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {photos.map((photo, index) => (
            <GalleryCard
              key={photo.src}
              photo={photo}
              index={index}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            photos={photos}
            selectedIndex={selectedIndex}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </SectionFrame>
  );
}