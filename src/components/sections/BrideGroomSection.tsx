'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { weddingData } from '@/config/wedding-data';
import { cn } from '@/lib/utils';
import SectionFrame from '@/components/decorations/SectionFrame';
import ScrollReveal from '@/components/animations/ScrollReveal';

// ── Types ───────────────────────────────────────────────────────────────────
type PersonData = typeof weddingData.couple.bride;

// ── Instagram Icon ──────────────────────────────────────────────────────────
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-5 w-5', className)}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── Mandala Lotus Decoration ────────────────────────────────────────────────
function MandalaDecoration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center py-8 md:py-0"
      initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="text-gold"
        aria-hidden="true"
      >
        {/* Outer ring */}
        <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

        {/* Outer petals */}
        <g opacity="0.25">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <ellipse
              key={`outer-${angle}`}
              cx="60"
              cy="15"
              rx="5"
              ry="15"
              fill="currentColor"
              transform={`rotate(${angle} 60 60)`}
            />
          ))}
        </g>

        {/* Inner petals */}
        <g opacity="0.4">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse
              key={`inner-${angle}`}
              cx="60"
              cy="28"
              rx="4"
              ry="12"
              fill="currentColor"
              transform={`rotate(${angle} 60 60)`}
            />
          ))}
        </g>

        {/* Core petals */}
        <g opacity="0.5">
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <ellipse
              key={`core-${angle}`}
              cx="60"
              cy="38"
              rx="3"
              ry="8"
              fill="currentColor"
              transform={`rotate(${angle} 60 60)`}
            />
          ))}
        </g>

        {/* Center */}
        <circle cx="60" cy="60" r="8" fill="currentColor" opacity="0.2" />
        <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.5" />

        {/* Connecting dots */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = 60 + 42 * Math.sin(rad);
          const y = 60 - 42 * Math.cos(rad);
          return (
            <circle key={`dot-${angle}`} cx={x} cy={y} r="2" fill="currentColor" opacity="0.3" />
          );
        })}
      </svg>
    </motion.div>
  );
}

// ── Profile Photo Placeholder ───────────────────────────────────────────────
function ProfilePhoto({ person, variant }: { person: PersonData; variant: 'bride' | 'groom' }) {
  const gradients = {
    bride: 'from-temple-red/30 via-gold/20 to-maroon/30',
    groom: 'from-peacock/30 via-gold/20 to-maroon/30',
  };

  return (
    <div className="relative mx-auto h-44 w-44 md:h-52 md:w-52">
      {/* Ornamental outer ring */}
      <motion.div
        className="absolute -inset-3 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, #D4AF37 0%, transparent 15%, #D4AF37 30%, transparent 45%, #D4AF37 60%, transparent 75%, #D4AF37 90%, transparent 100%)`,
          opacity: 0.3,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Gold ring border */}
      <div className="absolute -inset-1.5 rounded-full border-2 border-gold/50" />
      <div className="absolute -inset-0.5 rounded-full border border-gold/30" />

      {/* Small decorative elements on the ring */}
      {[0, 90, 180, 270].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const size = 'h-3 w-3';
        const offset = variant === 'bride' ? 96 : 112;
        const half = offset / 2 + 6;
        const x = half + (half + 2) * Math.cos(rad);
        const y = half + (half + 2) * Math.sin(rad);
        return (
          <div
            key={angle}
            className={cn(
              size,
              'absolute rounded-full border border-gold/60 bg-cream'
            )}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="h-full w-full rounded-full bg-gold/30" />
          </div>
        );
      })}

      {/* Photo circle with gradient placeholder */}
      <div
        className={cn(
          'relative h-full w-full overflow-hidden rounded-full',
          'border-2 border-gold/40 shadow-xl shadow-gold/10'
        )}
      >
        <div className={cn('absolute inset-0 bg-gradient-to-br', gradients[variant])} />
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />
        {/* Initial letter */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-5xl font-bold text-gold/50 md:text-6xl">
            {person.firstName[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Profile Card ────────────────────────────────────────────────────────────
function ProfileCard({ person, variant, delay }: { person: PersonData; variant: 'bride' | 'groom'; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const borderAccent = variant === 'bride' ? 'border-temple-red/20' : 'border-peacock/20';

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-2xl border bg-ivory/60 p-6 pt-8 shadow-lg backdrop-blur-sm md:p-8',
          borderAccent,
          'transition-shadow duration-300 hover:shadow-xl hover:shadow-gold/10'
        )}
      >
        {/* Kalamkari-inspired top border pattern */}
        <div className="absolute inset-x-0 top-0 h-2 overflow-hidden">
          <div
            className="h-full w-full"
            style={{
              background: variant === 'bride'
                ? 'repeating-linear-gradient(90deg, #C41E3A 0px, #C41E3A 4px, transparent 4px, transparent 8px, #D4AF37 8px, #D4AF37 12px, transparent 12px, transparent 20px)'
                : 'repeating-linear-gradient(90deg, #006A4E 0px, #006A4E 4px, transparent 4px, transparent 8px, #D4AF37 8px, #D4AF37 12px, transparent 12px, transparent 20px)',
              opacity: 0.6,
            }}
          />
        </div>

        {/* Kalamkari corner decorations */}
        <div className="absolute left-3 top-5 h-8 w-8 opacity-15">
          <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M0 16 C8 8, 24 8, 16 0" stroke="#D4AF37" strokeWidth="1" />
            <path d="M0 16 C8 24, 8 8, 16 0" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="8" cy="8" r="2" fill="#D4AF37" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute right-3 top-5 h-8 w-8 opacity-15">
          <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="rotate-90">
            <path d="M0 16 C8 8, 24 8, 16 0" stroke="#D4AF37" strokeWidth="1" />
            <path d="M0 16 C8 24, 8 8, 16 0" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="8" cy="8" r="2" fill="#D4AF37" opacity="0.5" />
          </svg>
        </div>

        {/* Profile Photo */}
        <div className="mb-6">
          <ProfilePhoto person={person} variant={variant} />
        </div>

        {/* Role label */}
        <div className="mb-2 text-center">
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {variant === 'bride' ? 'Bride' : 'Groom'}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-center font-display text-2xl font-bold text-maroon md:text-3xl">
          {person.fullName}
        </h3>

        {/* Parents */}
        <p className="mt-1 text-center text-sm text-maroon/60">
          {person.parents}
        </p>

        {/* Gold divider */}
        <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        {/* Bio */}
        <p className="mx-auto max-w-xs text-center text-sm italic leading-relaxed text-maroon/70 md:text-base">
          &ldquo;{person.bio}&rdquo;
        </p>

        {/* Details */}
        <div className="mt-6 flex flex-col items-center space-y-4 text-center">
          {/* Education */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl text-gold" aria-hidden="true">🎓</span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-maroon/50">
                Education <span className="font-telugu ml-1 text-[8px] lowercase opacity-60">చదువు</span>
              </p>
              <p className="text-sm font-medium text-maroon/80">{person.education}</p>
            </div>
          </div>

          {/* Profession */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl text-gold" aria-hidden="true">💼</span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-maroon/50">
                Profession <span className="font-telugu ml-1 text-[8px] lowercase opacity-60">వృత్తి</span>
              </p>
              <p className="text-sm font-medium text-maroon/80">{person.profession}</p>
            </div>
          </div>
        </div>

        {/* Hobbies */}
        <div className="mt-6">
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wider text-maroon/50">
            Interests <span className="font-telugu ml-1 text-[8px] lowercase opacity-60">అభిరుచులు</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {person.hobbies.map((hobby) => (
              <span
                key={hobby}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs font-medium',
                  variant === 'bride'
                    ? 'border-temple-red/20 bg-temple-red/5 text-temple-red/80'
                    : 'border-peacock/20 bg-peacock/5 text-peacock/80'
                )}
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>

        {/* Instagram link */}
        <div className="mt-8 flex justify-center">
          <a
            href={person.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300',
              'border border-gold/30 bg-gold/5 text-maroon/70',
              'hover:border-gold/60 hover:bg-gold/10 hover:text-maroon'
            )}
            aria-label={`Follow ${person.firstName} on Instagram`}
          >
            <InstagramIcon className="h-4 w-4" />
            <span>Follow {variant === 'bride' ? 'Her' : 'Him'}</span>
          </a>
        </div>

        {/* Kalamkari bottom border */}
        <div className="absolute inset-x-0 bottom-0 h-2 overflow-hidden">
          <div
            className="h-full w-full"
            style={{
              background: variant === 'bride'
                ? 'repeating-linear-gradient(90deg, #C41E3A 0px, #C41E3A 4px, transparent 4px, transparent 8px, #D4AF37 8px, #D4AF37 12px, transparent 12px, transparent 20px)'
                : 'repeating-linear-gradient(90deg, #006A4E 0px, #006A4E 4px, transparent 4px, transparent 8px, #D4AF37 8px, #D4AF37 12px, transparent 12px, transparent 20px)',
              opacity: 0.6,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ────────────────────────────────────────────────────────────
export default function BrideGroomSection() {
  const { bride, groom } = weddingData.couple;

  return (
    <SectionFrame id="couple" variant="default">
      {/* Section Header */}
      <ScrollReveal direction="up" className="mb-12 w-full text-center md:mb-16">
        <span className="mb-3 inline-block text-3xl">🪷</span>
        <h2 className="font-display text-3xl font-bold text-maroon md:text-5xl">
          The Couple
        </h2>
        <p className="font-telugu mt-2 text-lg text-gold md:text-xl">
          వధూవరులు
        </p>
        <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </ScrollReveal>

      {/* Profile Cards Grid */}
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center justify-items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8">
        {/* Bride Card */}
        <ProfileCard person={bride} variant="bride" delay={0} />

        {/* Center Mandala Decoration */}
        <div className="hidden items-center justify-center self-center md:flex">
          <MandalaDecoration />
        </div>
        <div className="flex items-center justify-center md:hidden">
          <MandalaDecoration />
        </div>

        {/* Groom Card */}
        <ProfileCard person={groom} variant="groom" delay={0.2} />
      </div>

      {/* Bottom Blessing */}
      <ScrollReveal direction="up" delay={0.4} className="mt-12 w-full text-center md:mt-16">
        <p className="font-telugu text-base text-gold/80 md:text-lg">
          ఇద్దరి మనసులు ఒక్కటై జీవితాంతం సంతోషంగా ఉండాలని ఆశీస్సులు
        </p>
        <p className="mt-1 text-sm italic text-maroon/50">
          May two hearts become one and live happily together forever
        </p>
      </ScrollReveal>
    </SectionFrame>
  );
}
