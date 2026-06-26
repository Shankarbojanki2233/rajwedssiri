'use client';

import { motion } from 'motion/react';
import { weddingData } from '@/config/wedding-data';
import SectionFrame from '@/components/decorations/SectionFrame';
import RangoliDivider from '@/components/decorations/RangoliDivider';
import { useCountdown } from '@/hooks/useCountdown';
import { cn } from '@/lib/utils';

// ── Icon Components ──────────────────────────────────────────────────────────
function VideoIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('h-6 w-6', className)}>
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}

function WifiIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('h-12 w-12', className)}>
      <path d="M5 13a10 10 0 0 1 14 0" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <line x1="12" x2="12.01" y1="20" y2="20" />
    </svg>
  );
}

// ── Countdown Digit ──────────────────────────────────────────────────────────
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-xl border border-gold/30 bg-maroon/60 shadow-lg backdrop-blur-sm md:h-20 md:w-20"
        key={value}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <span className="font-display text-2xl font-bold text-gold md:text-3xl">
          {String(value).padStart(2, '0')}
        </span>
      </motion.div>
      <span className="mt-2 text-xs font-medium uppercase tracking-widest text-cream/60">
        {label}
      </span>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function LiveStreamSection() {
  const { liveStream } = weddingData;
  const { days, hours, minutes, seconds, isComplete, mounted } = useCountdown(liveStream.startTime);

  // Don't render if live stream is disabled
  if (!liveStream.enabled) return null;

  // Use zeros during SSR to prevent hydration mismatch
  const countdownValues = mounted ? { days, hours, minutes, seconds } : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  // Only show live state after mount to prevent SSR/client mismatch
  const isLive = mounted && isComplete;

  return (
    <SectionFrame id="livestream" variant="dark">
      {/* Section Header */}
      <div className="mb-12 w-full text-center">
        <p className="font-telugu text-lg text-gold md:text-xl">ప్రత్యక్ష ప్రసారం</p>
        <h2 className="font-display mt-1 text-3xl font-bold text-cream md:text-5xl">
          Live Stream
        </h2>
        <RangoliDivider variant="lotus" className="mx-auto max-w-xs" />
      </div>

      {/* Note for remote guests */}
      <motion.p
        className="mx-auto mb-10 max-w-md text-center text-sm leading-relaxed text-cream/70 md:text-base"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Can&apos;t make it in person? Watch our wedding live!
        <br />
        <span className="font-telugu text-gold/60">
          ఈ ముహూర్తాన్ని ఎక్కడి నుండైనా చూడండి
        </span>
      </motion.p>

      {isLive ? (
        /* ── Live Player ──────────────────────────────────────────────── */
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* LIVE badge */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
            </span>
            <span className="text-sm font-bold uppercase tracking-widest text-red-400">
              Live Now
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border-2 border-gold/30 shadow-2xl">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={liveStream.url}
                title="Wedding Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-cream/50">
            <VideoIcon className="h-4 w-4" />
            <p className="text-xs">Streaming on {liveStream.platform === 'youtube' ? 'YouTube' : liveStream.platform}</p>
          </div>
        </motion.div>
      ) : (
        /* ── Going Live Soon Card ─────────────────────────────────────── */
        <motion.div
          className="mx-auto max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-2xl border-2 border-gold/20 bg-gradient-to-b from-maroon/40 via-maroon/60 to-maroon/40 p-8 text-center shadow-2xl backdrop-blur-sm md:p-12">
            {/* Subtle shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent opacity-50" />

            <div className="relative z-10">
              {/* Wifi / broadcast icon */}
              <motion.div
                className="mx-auto mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <WifiIcon className="mx-auto text-gold/70" />
              </motion.div>

              <h3 className="font-display text-2xl font-bold text-cream md:text-3xl">
                Going Live Soon
              </h3>
              <p className="font-telugu mt-2 text-base text-gold/70">
                త్వరలో ప్రత్యక్ష ప్రసారం
              </p>

              {/* Countdown */}
              <div className="mt-8 flex items-center justify-center gap-3 md:gap-5">
                <CountdownUnit value={countdownValues.days} label="Days" />
                <span className="font-display mt-[-1.5rem] text-xl text-gold/50">:</span>
                <CountdownUnit value={countdownValues.hours} label="Hours" />
                <span className="font-display mt-[-1.5rem] text-xl text-gold/50">:</span>
                <CountdownUnit value={countdownValues.minutes} label="Min" />
                <span className="font-display mt-[-1.5rem] text-xl text-gold/50">:</span>
                <CountdownUnit value={countdownValues.seconds} label="Sec" />
              </div>

              {/* Call to action */}
              <motion.a
                href={liveStream.url.replace('/embed/', '/watch?v=')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-gold/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <VideoIcon className="h-4 w-4 text-gold" />
                Set Reminder on YouTube
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </SectionFrame>
  );
}
