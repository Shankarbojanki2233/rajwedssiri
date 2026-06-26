'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { weddingData } from '@/config/wedding-data';
import { cn } from '@/lib/utils';
import SectionFrame from '@/components/decorations/SectionFrame';
import RangoliDivider from '@/components/decorations/RangoliDivider';
import ScrollReveal from '@/components/animations/ScrollReveal';

// ── Lotus Marker SVG ────────────────────────────────────────────────────────
function LotusMarker({ icon }: { icon: string }) {
  return (
    <div className="relative z-10 flex h-14 w-14 items-center justify-center">
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gold/20 blur-sm" />
      {/* Decorative petals */}
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        className="absolute text-gold"
        aria-hidden="true"
      >
        <g fill="currentColor" opacity="0.3">
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <ellipse
              key={angle}
              cx="28"
              cy="10"
              rx="4"
              ry="10"
              transform={`rotate(${angle} 28 28)`}
            />
          ))}
        </g>
        <circle cx="28" cy="28" r="18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
      {/* Icon center */}
      <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold bg-cream text-lg shadow-md">
        {icon}
      </span>
    </div>
  );
}

// ── Photo Placeholder ───────────────────────────────────────────────────────
function PhotoPlaceholder({ index }: { index: number }) {
  const gradients = [
    'from-gold/30 via-temple-red/20 to-maroon/30',
    'from-peacock/20 via-gold/30 to-sandalwood/20',
    'from-temple-red/20 via-gold/40 to-peacock/20',
    'from-maroon/30 via-sandalwood/20 to-gold/30',
    'from-gold/40 via-temple-red/30 to-maroon/20',
  ];

  const bride = weddingData.couple.bride.firstName[0];
  const groom = weddingData.couple.groom.firstName[0];

  return (
    <div
      className={cn(
        'relative aspect-[4/3] w-full overflow-hidden rounded-xl',
        'border border-gold/30 shadow-lg'
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br',
          gradients[index % gradients.length]
        )}
      />
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #D4AF37 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Initials */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-3xl tracking-widest text-gold/60 md:text-4xl">
          {bride} & {groom}
        </span>
      </div>
    </div>
  );
}

// ── Timeline Item ───────────────────────────────────────────────────────────
function TimelineItem({
  milestone,
  index,
  isLast,
}: {
  milestone: (typeof weddingData.coupleStory)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex w-full items-start md:items-center">
      {/* ── Desktop: Alternating layout ─────────────────────────────── */}

      {/* Left content area (desktop) */}
      <div className="hidden w-[calc(50%-28px)] md:block">
        {isEven ? (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <TimelineCard milestone={milestone} index={index} align="right" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <PhotoPlaceholder index={index} />
          </motion.div>
        )}
      </div>

      {/* Center: Timeline spine + lotus marker (desktop) */}
      <div className="relative hidden flex-col items-center md:flex" style={{ width: '56px' }}>
        <LotusMarker icon={milestone.icon} />
        {!isLast && (
          <motion.div
            className="w-px flex-1 bg-gradient-to-b from-gold via-gold/60 to-gold/30"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ originY: 0, minHeight: '120px' }}
          />
        )}
      </div>

      {/* Right content area (desktop) */}
      <div className="hidden w-[calc(50%-28px)] md:block">
        {isEven ? (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <PhotoPlaceholder index={index} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <TimelineCard milestone={milestone} index={index} align="left" />
          </motion.div>
        )}
      </div>

      {/* ── Mobile: Vertical layout ────────────────────────────── */}
      <div className="flex w-full flex-col items-center md:hidden">
        {/* Mobile icon with decorative ring */}
        <div className="mb-4 flex flex-col items-center">
          <LotusMarker icon={milestone.icon} />
          {!isLast && (
            <div className="mt-4 h-8 w-px bg-gradient-to-b from-gold to-transparent" />
          )}
        </div>

        {/* Mobile card with centered text */}
        <motion.div
          className="w-full max-w-sm pb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TimelineCard milestone={milestone} index={index} align="center" />
          <div className="mt-4 flex justify-center">
            <div className="w-full max-w-[280px]">
              <PhotoPlaceholder index={index} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Timeline Card ───────────────────────────────────────────────────────────
function TimelineCard({
  milestone,
  index,
  align,
}: {
  milestone: (typeof weddingData.coupleStory)[number];
  index: number;
  align: 'left' | 'right' | 'center';
}) {
  return (
    <div
      className={cn(
        'relative rounded-xl border border-gold/20 bg-ivory/80 p-5 shadow-lg backdrop-blur-sm',
        'transition-shadow duration-300 hover:shadow-xl hover:shadow-gold/10',
        'text-center'
      )}
    >
      {/* Decorative corner accents */}
      <div className="absolute left-2 top-2 h-4 w-4 border-l border-t border-gold/30" />
      <div className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-gold/30" />

      {/* Date badge */}
      <span className="mb-2 inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium tracking-wider text-maroon">
        {milestone.date}
      </span>

      {/* Title */}
      <h3 className="font-display text-xl font-bold text-maroon md:text-2xl">
        {milestone.title}
      </h3>

      {/* Telugu subtitle */}
      <p className="font-telugu mt-0.5 text-sm text-gold">
        {milestone.teluguTitle}
      </p>

      {/* Divider */}
      <div className={cn(
        'my-3 h-px w-16 bg-gradient-to-r from-gold/60 to-transparent',
        'mx-auto'
      )} />

      {/* Description */}
      <p className="text-sm leading-relaxed text-maroon/70 md:text-base">
        {milestone.description}
      </p>
    </div>
  );
}

// ── Main Section ────────────────────────────────────────────────────────────
export default function CoupleStorySection() {
  const stories = weddingData.coupleStory;

  return (
    <SectionFrame id="story" variant="cream">
      {/* Section Header */}
      <ScrollReveal direction="up" className="mb-12 w-full text-center md:mb-16">
        <span className="mb-3 inline-block text-3xl">🪷</span>
        <h2 className="font-display text-3xl font-bold text-maroon md:text-5xl">
          Our Journey
        </h2>
        <p className="font-telugu mt-2 text-lg text-gold md:text-xl">
          మా ప్రయాణం
        </p>
        <RangoliDivider variant="lotus" className="mx-auto mt-4 max-w-md" />
      </ScrollReveal>

      {/* Timeline */}
      <div className="relative mx-auto w-full max-w-5xl">
        {stories.map((milestone, index) => (
          <TimelineItem
            key={milestone.id}
            milestone={milestone}
            index={index}
            isLast={index === stories.length - 1}
          />
        ))}
      </div>

      {/* Bottom decoration */}
      <ScrollReveal direction="up" delay={0.3} className="mt-12 w-full text-center md:mt-16">
        <p className="font-display text-lg italic text-maroon/60 md:text-xl">
          &ldquo;And the story continues...&rdquo;
        </p>
        <RangoliDivider variant="simple" className="mx-auto mt-4 max-w-xs" />
      </ScrollReveal>
    </SectionFrame>
  );
}
