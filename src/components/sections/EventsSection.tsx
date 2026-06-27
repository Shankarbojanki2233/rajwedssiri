'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { weddingData } from '@/config/wedding-data';
import { formatDate, getTimeRemaining, cn } from '@/lib/utils';
import SectionFrame from '@/components/decorations/SectionFrame';
import RangoliDivider from '@/components/decorations/RangoliDivider';
import ScrollReveal from '@/components/animations/ScrollReveal';

// ── Mini countdown for each event card ──────────────────────────────────
function MiniCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 60_000); // update every minute for mini countdown
    return () => {
      cancelAnimationFrame(handle);
      clearInterval(timer);
    };
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="mt-3 flex items-center justify-center gap-1 text-xs text-gold/70">
        <span className="inline-block h-4 w-16 animate-pulse rounded bg-gold/10" />
      </div>
    );
  }

  if (timeLeft.total <= 0) {
    return (
      <div className="mt-3 text-center text-xs font-semibold tracking-wider text-peacock">
        ✓ Completed
      </div>
    );
  }

  return (
    <div className="mt-3 flex items-center justify-center gap-2">
      {[
        { value: timeLeft.days, label: 'days' },
        { value: timeLeft.hours, label: 'hrs' },
        { value: timeLeft.minutes, label: 'min' },
      ].map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center rounded bg-gold/10 px-2 py-1"
        >
          <span className="text-sm font-bold text-gold">{unit.value}</span>
          <span className="text-[10px] uppercase tracking-wider text-maroon/60">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Event Card ──────────────────────────────────────────────────────────
function EventCard({
  event,
  index,
}: {
  event: (typeof weddingData.events)[number];
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={cn(
        'group relative flex w-72 shrink-0 flex-col rounded-2xl border border-gold/30',
        'bg-cream shadow-md shadow-gold/10',
        'transition-shadow duration-300 hover:shadow-xl hover:shadow-gold/20',
        'snap-center md:w-80'
      )}
    >
      {/* Gold top accent */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

      <div className="flex flex-1 flex-col px-5 pb-5 pt-6">
        {/* Icon */}
        <div className="mb-3 flex items-center justify-center">
          <span className="text-4xl" role="img" aria-label={event.name}>
            {event.icon}
          </span>
        </div>

        {/* Event name */}
        <h3 className="text-center text-lg font-bold tracking-wide text-maroon">
          {event.name}
        </h3>
        <p className="mt-0.5 text-center font-telugu text-sm text-gold">
          {event.teluguName}
        </p>

        <RangoliDivider variant="simple" className="py-3" />

        {/* Date & Time */}
        <div className="flex items-center justify-center gap-2 text-sm text-maroon/80">
          <svg
            className="h-4 w-4 shrink-0 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{formatDate(event.date)}</span>
        </div>

        <div className="mt-1.5 flex items-center justify-center gap-2 text-sm text-maroon/80">
          <svg
            className="h-4 w-4 shrink-0 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{event.time}</span>
        </div>

        {/* Venue */}
        <div className="mt-3 flex flex-col items-center gap-1 text-center text-sm text-maroon/80">
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 shrink-0 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="font-semibold">{event.venue}</span>
          </div>
          <p className="px-4 text-xs text-maroon/50">{event.address}</p>
        </div>

        {/* Dress Code Tag */}
        <div className="mt-4 flex items-center justify-center">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1',
              'border border-gold/30 bg-ivory text-xs font-medium text-maroon'
            )}
          >
            <svg
              className="h-3 w-3 text-gold"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" />
            </svg>
            {event.dressCode}
          </span>
        </div>

        {/* Mini Countdown */}
        <MiniCountdown targetDate={event.date} />
      </div>

      {/* Decorative corner dots */}
      <div className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 rounded-full bg-gold/20" />
      <div className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 rounded-full bg-gold/20" />
    </motion.div>
  );
}

// ── Events Section ──────────────────────────────────────────────────────
export default function EventsSection() {
  return (
    <SectionFrame id="events" variant="cream">
      {/* Section Header */}
      <ScrollReveal direction="up">
        <div className="mb-12 text-center">
          <motion.p
            className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-gold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Celebrate With Us
          </motion.p>

          <h2 className="text-3xl font-bold tracking-tight text-maroon md:text-4xl lg:text-5xl">
            Wedding Events
          </h2>

          <p className="mt-2 text-xl text-gold md:text-2xl">
            వివాహ వేడుకలు
          </p>

          <RangoliDivider variant="ornate" className="mx-auto max-w-sm" />

          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-maroon/60">
            Join us for each cherished ceremony as two families come together in
            love, laughter, and timeless traditions.
          </p>
        </div>
      </ScrollReveal>

      {/* ─── Desktop: Horizontal scroll ─── */}
      <div className="hidden w-full md:block">
        <div
          className={cn(
            'flex gap-6 overflow-x-auto px-4 pb-4',
            'snap-x snap-mandatory scroll-smooth justify-center',
            'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gold/30'
          )}
        >
          {weddingData.events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-maroon/40">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span>Scroll to explore all events</span>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>

      {/* ─── Mobile: Vertical stack ─── */}
      <div className="flex w-full flex-col items-center gap-6 md:hidden">
        {weddingData.events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </SectionFrame>
  );
}
