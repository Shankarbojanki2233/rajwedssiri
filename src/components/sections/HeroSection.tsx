'use client';

import { motion } from 'motion/react';
import { weddingData } from '@/config/wedding-data';
import Sparkles from '@/components/animations/Sparkles';
import Toranam from '@/components/decorations/Toranam';
import { useCountdown } from '@/hooks/useCountdown';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';

// ── Animation variants (natural, organic feel) ───────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.5 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// Float animation for decorative gold circles – gentle, organic sway
const floatVariants = {
  animate: (i: number) => ({
    y: [0, -8 - (i % 3) * 3, 2, -6, 0],
    x: [0, (i % 2 === 0 ? 3 : -3), 0],
    opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
    transition: {
      duration: 6 + i * 0.8,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }),
};

// ── Floating Gold Decorative Elements ─────────────────────────────────────
const floatingElements = [
  { size: 6, left: '8%', top: '15%', delay: 0 },
  { size: 4, left: '92%', top: '20%', delay: 1 },
  { size: 8, left: '15%', top: '70%', delay: 2 },
  { size: 5, left: '85%', top: '75%', delay: 3 },
  { size: 3, left: '20%', top: '40%', delay: 4 },
  { size: 7, left: '78%', top: '45%', delay: 5 },
  { size: 4, left: '5%', top: '55%', delay: 6 },
  { size: 6, left: '95%', top: '50%', delay: 7 },
  { size: 3, left: '30%', top: '10%', delay: 8 },
  { size: 5, left: '65%', top: '85%', delay: 9 },
  { size: 2, left: '50%', top: '25%', delay: 10 },
  { size: 4, left: '40%', top: '90%', delay: 11 },
];

// ── CTA Button Data ───────────────────────────────────────────────────────
const ctaButtons = [
  { label: '🎬 Watch Video', target: '#video' },
  { label: '📸 Gallery', target: '#gallery' },
  { label: '📍 Venue', target: '#venue' },
];

// ── Countdown Card ────────────────────────────────────────────────────────
function CountdownCard({ value, label }: { value: number; label: string }) {
  const displayValue = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden',
          'rounded-lg border-2 border-gold/60 bg-maroon/80',
          'shadow-[0_0_20px_rgba(212,175,55,0.15)] backdrop-blur-sm',
          'sm:h-[88px] sm:w-[88px] md:h-[96px] md:w-[96px]'
        )}
      >
        {/* Flip card top shine */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
        {/* Center divider line */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gold/30" />

        <motion.span
          key={displayValue}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="font-display text-3xl font-bold text-gold sm:text-4xl md:text-5xl"
          style={{ perspective: '200px' }}
        >
          {displayValue}
        </motion.span>

        {/* Corner accents */}
        <div className="pointer-events-none absolute left-1 top-1 h-2 w-2 border-l border-t border-gold/40" />
        <div className="pointer-events-none absolute right-1 top-1 h-2 w-2 border-r border-t border-gold/40" />
        <div className="pointer-events-none absolute bottom-1 left-1 h-2 w-2 border-b border-l border-gold/40" />
        <div className="pointer-events-none absolute bottom-1 right-1 h-2 w-2 border-b border-r border-gold/40" />
      </div>
      <span className="text-xs font-medium uppercase tracking-widest text-gold/70 sm:text-sm">
        {label}
      </span>
    </div>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────
export default function HeroSection() {
  const { days, hours, minutes, seconds } = useCountdown(
    weddingData.wedding.date
  );
  const formattedDate = formatDate(weddingData.wedding.date);

  const handleScroll = (target: string) => {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-maroon via-[#5a0016] to-[#2d000b]"
    >
      {/* ── Background decorative patterns ──────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Radial gold glow */}
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/[0.04] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.03] blur-3xl" />

        {/* Floating gold circles & dots */}
        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatVariants}
            animate="animate"
            className="absolute rounded-full bg-gold"
            style={{
              width: el.size,
              height: el.size,
              left: el.left,
              top: el.top,
              opacity: 0.3,
            }}
          />
        ))}

        {/* Large decorative ring - left */}
        <div className="absolute -left-16 top-1/3 h-64 w-64 rounded-full border border-gold/10 md:h-96 md:w-96" />
        {/* Large decorative ring - right */}
        <div className="absolute -right-16 bottom-1/4 h-48 w-48 rounded-full border border-gold/10 md:h-72 md:w-72" />
        {/* Diagonal decorative line */}
        <div className="absolute left-0 top-0 h-full w-full">
          <svg
            className="h-full w-full opacity-[0.03]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <pattern
              id="hero-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-gold" />
            </pattern>
            <rect width="100" height="100" fill="url(#hero-pattern)" />
          </svg>
        </div>
      </div>

      {/* ── Sparkles overlay ────────────────────────────────────────────── */}
      <Sparkles count={18} className="z-10" />

      {/* ── Toranam at top ──────────────────────────────────────────────── */}
      <div className="absolute left-0 right-0 top-0 z-20">
        <Toranam />
      </div>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 md:py-32"
      >
        {/* Telugu Blessing */}
        <motion.div variants={childVariants}>
          <p className="font-telugu text-2xl text-gold sm:text-3xl md:text-4xl lg:text-5xl">
            {weddingData.wedding.teluguBlessing}
          </p>
        </motion.div>

        {/* Ornamental divider */}
        <motion.div
          variants={childVariants}
          className="my-5 flex items-center justify-center gap-3 sm:my-6"
        >
          <motion.div
            className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60 sm:w-20"
            initial={{ scaleX: 0, originX: 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="text-lg text-gold/80 sm:text-xl"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          >✦</motion.span>
          <motion.div
            className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60 sm:w-20"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Invitation text */}
        <motion.p
          variants={childVariants}
          className="max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg md:text-xl"
        >
          {weddingData.wedding.invitationText}
        </motion.p>

        {/* Couple Names */}
        <motion.div variants={childVariants} className="mt-8 sm:mt-10">
          <h1 className="font-display text-5xl font-bold leading-tight tracking-wide text-gold sm:text-6xl md:text-7xl lg:text-8xl">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {weddingData.couple.bride.firstName}
            </motion.span>
            <motion.span
              className="mx-2 inline-block text-temple-red sm:mx-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              ❤️
            </motion.span>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {weddingData.couple.groom.firstName}
            </motion.span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={childVariants}
          className="mt-3 font-display text-lg italic text-cream/60 sm:text-xl"
        >
          {weddingData.wedding.tagline}
        </motion.p>

        {/* Wedding Date */}
        <motion.div variants={childVariants} className="mt-6 sm:mt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-6 py-2 backdrop-blur-sm sm:px-8 sm:py-3">
            <span className="text-sm font-medium tracking-wider text-gold sm:text-base">
              {formattedDate}
            </span>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          variants={childVariants}
          className="mt-8 flex gap-3 sm:mt-10 sm:gap-5 md:gap-6"
        >
          <CountdownCard value={days} label="Days" />
          <CountdownCard value={hours} label="Hours" />
          <CountdownCard value={minutes} label="Minutes" />
          <CountdownCard value={seconds} label="Seconds" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={childVariants}
          className="mt-10 flex w-full max-w-xl flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-4"
        >
          {ctaButtons.map((btn) => (
            <button
              key={btn.target}
              onClick={() => handleScroll(btn.target)}
              className={cn(
                'group relative min-w-[140px] overflow-hidden rounded-lg border border-gold/40 px-4 py-3',
                'bg-gold/10 text-sm font-medium text-gold backdrop-blur-sm',
                'transition-all duration-300 hover:border-gold/70 hover:bg-gold/20',
                'hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]',
                'sm:px-5 sm:py-3 sm:text-base'
              )}
            >
              {/* Hover shine effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative">{btn.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Wedding hashtag */}
        <motion.p
          variants={childVariants}
          className="mt-8 text-sm tracking-wider text-cream/40 sm:mt-10"
        >
          {weddingData.wedding.hashtag}
        </motion.p>
      </motion.div>

      {/* ── Scroll-down indicator ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-cream/40">
            SCROLL DOWN
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[#D4AF37]/50"
          >
            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Bottom toranam / garland ─────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 rotate-180">
        <Toranam />
      </div>
    </section>
  );
}