'use client';

import { motion, cubicBezier } from 'motion/react';
import { useCountdown } from '@/hooks/useCountdown';
import { weddingData } from '@/config/wedding-data';
import Confetti from '@/components/animations/Confetti';
import SectionFrame from '@/components/decorations/SectionFrame';
import RangoliDivider from '@/components/decorations/RangoliDivider';
import { cn } from '@/lib/utils';

// ── Animation variants ────────────────────────────────────────────────────
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
  },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
  },
};

// ── Countdown Unit Card ───────────────────────────────────────────────────
function CountdownUnit({
  value,
  label,
  teluguLabel,
}: {
  value: number;
  label: string;
  teluguLabel: string;
}) {
  const displayValue = String(value).padStart(2, '0');
  const topDigit = displayValue;

  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col items-center gap-3"
    >
      <div
        className={cn(
          'relative flex flex-col items-center justify-center overflow-hidden',
          'h-24 w-24 rounded-xl sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40',
          'border-2 border-gold/50 bg-maroon/90',
          'shadow-[0_4px_30px_rgba(212,175,55,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]'
        )}
      >
        {/* Top half: lighter maroon shine */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />

        {/* Flip divider */}
        <div className="pointer-events-none absolute inset-x-2 top-1/2 h-px bg-gold/20" />

        {/* Number with flip animation */}
        <motion.span
          key={topDigit}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="font-display text-4xl font-bold text-gold sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ perspective: '300px' }}
        >
          {topDigit}
        </motion.span>

        {/* Corner ornaments */}
        <svg
          className="pointer-events-none absolute left-2 top-2 h-4 w-4 text-gold/30"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M0 0L6 0L6 1L1 1L1 6L0 6Z" fill="currentColor" />
        </svg>
        <svg
          className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-gold/30"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M16 0L10 0L10 1L15 1L15 6L16 6Z" fill="currentColor" />
        </svg>
        <svg
          className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 text-gold/30"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M0 16L6 16L6 15L1 15L1 10L0 10Z" fill="currentColor" />
        </svg>
        <svg
          className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 text-[#D4AF37]/30"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            d="M16 16L10 16L10 15L15 15L15 10L16 10Z"
            fill="currentColor"
          />
        </svg>

        {/* Subtle pulsing glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl border border-[#D4AF37]/20"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Label */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]/80 sm:text-sm">
          {label}
        </span>
        <span className="font-telugu text-xs text-cream/50 sm:text-sm">
          {teluguLabel}
        </span>
      </div>
    </motion.div>
  );
}

// ── Celebration Message ───────────────────────────────────────────────────
function CelebrationMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) }}
      className="flex flex-col items-center gap-6 py-8"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-6xl sm:text-7xl md:text-8xl"
      >
        🎊
      </motion.div>
      <h3 className="font-display text-3xl text-[#D4AF37] sm:text-4xl md:text-5xl">
        The Auspicious Moment is Here!
      </h3>
      <p className="font-telugu text-xl text-cream/80 sm:text-2xl">
        శుభ ముహూర్తం వచ్చేసింది!
      </p>
      <p className="max-w-md text-center text-base text-cream/60 sm:text-lg">
        Join us in celebrating the beautiful union of{' '}
        <span className="font-semibold text-[#D4AF37]">
          {weddingData.couple.bride.firstName}
        </span>{' '}
        &{' '}
        <span className="font-semibold text-[#D4AF37]">
          {weddingData.couple.groom.firstName}
        </span>
      </p>
    </motion.div>
  );
}

// ── Countdown Section ─────────────────────────────────────────────────────
export default function CountdownSection() {
  const { days, hours, minutes, seconds, isComplete, mounted } = useCountdown(
    weddingData.wedding.date
  );

  const countdownUnits = [
    { value: days, label: 'Days', teluguLabel: 'రోజులు' },
    { value: hours, label: 'Hours', teluguLabel: 'గంటలు' },
    { value: minutes, label: 'Minutes', teluguLabel: 'నిమిషాలు' },
    { value: seconds, label: 'Seconds', teluguLabel: 'సెకన్లు' },
  ];

  // Placeholder during SSR to prevent hydration mismatch
  const placeholderUnits = [
    { value: 0, label: 'Days', teluguLabel: 'రోజులు' },
    { value: 0, label: 'Hours', teluguLabel: 'గంటలు' },
    { value: 0, label: 'Minutes', teluguLabel: 'నిమిషాలు' },
    { value: 0, label: 'Seconds', teluguLabel: 'సెకన్లు' },
  ];

  const displayUnits = mounted ? countdownUnits : placeholderUnits;
  const displayComplete = mounted && isComplete;

  return (
    <>
      {/* Confetti celebration when countdown reaches zero */}
      <Confetti active={displayComplete} duration={6000} />

      <SectionFrame id="countdown" variant="dark" showTopBorder showBottomBorder>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center"
        >
          {/* ── Section heading ────────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-3 text-center">
            {/* Decorative Om symbol */}
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-3xl text-[#D4AF37]/60 sm:text-4xl"
            >
              🕉️
            </motion.span>

            <h2 className="font-telugu text-2xl text-[#D4AF37] sm:text-3xl md:text-4xl">
              శుభ ముహూర్తం వరకు
            </h2>
            <p className="font-display text-lg text-cream/60 sm:text-xl">
              Until the Auspicious Moment
            </p>
          </div>

          {/* Top rangoli divider */}
          <RangoliDivider variant="lotus" className="my-6 w-full max-w-lg sm:my-8" />

          {/* ── Countdown or Celebration ───────────────────────────────── */}
          {displayComplete ? (
            <CelebrationMessage />
          ) : (
            <motion.div
              variants={cardContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10"
            >
              {displayUnits.map((unit) => (
                <CountdownUnit
                  key={unit.label}
                  value={unit.value}
                  label={unit.label}
                  teluguLabel={unit.teluguLabel}
                />
              ))}
            </motion.div>
          )}

          {/* Bottom rangoli divider */}
          <RangoliDivider variant="ornate" className="my-6 w-full max-w-lg sm:my-8" />

          {/* ── Muhurtham details ──────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-cream/50 sm:text-base">
              Muhurtham Time
            </p>
            <p className="font-display text-xl font-semibold text-[#D4AF37] sm:text-2xl">
              {weddingData.wedding.muhurthamTime}
            </p>
            <p className="mt-1 text-sm text-cream/40">
              {weddingData.events.find((e) => e.id === 'wedding')?.venue}
            </p>
          </div>

          {/* ── Decorative bottom quote ────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            viewport={{ once: true }}
            className="mt-8 max-w-md text-center font-telugu text-sm text-cream/40 sm:mt-10 sm:text-base"
          >
            ఇద్దరి మనసులు ఒక్కటై జీవితాంతం సంతోషంగా ఉండాలని ఆశీస్సులు
          </motion.p>
        </motion.div>
      </SectionFrame>
    </>
  );
}