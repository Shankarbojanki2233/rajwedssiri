'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { weddingData } from '@/config/wedding-data';
import { cn } from '@/lib/utils';
import SectionFrame from '@/components/decorations/SectionFrame';
import ScrollReveal from '@/components/animations/ScrollReveal';
import RangoliDivider from '@/components/decorations/RangoliDivider';

type FamilyMember = {
  name: string;
  relationship: string;
  teluguRelation: string;
  photo: string;
  blessing: string;
};

export default function FamilySection() {
  const { bride, groom } = weddingData.family;

  return (
    <SectionFrame id="family" variant="cream">
      {/* Section Header */}
      <ScrollReveal direction="up" className="mb-12 w-full text-center md:mb-16">
        <span className="mb-3 inline-block text-3xl">🪷</span>
        <h2 className="font-display text-3xl font-bold text-maroon md:text-5xl">
          Family
        </h2>
        <p className="font-telugu mt-2 text-lg text-gold md:text-xl">
          కుటుంబం
        </p>
        <RangoliDivider variant="lotus" className="mx-auto mt-4 max-w-xs" />
      </ScrollReveal>

      {/* Families Grid */}
      <div className="mx-auto grid w-full max-w-5xl justify-items-center gap-12 md:grid-cols-2">
        {/* Bride's Family */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0 }}
          className="flex w-full flex-col items-center space-y-6 text-center"
        >
          <h3 className="font-display text-2xl font-bold text-maroon md:text-3xl">
            Bride&apos;s Family
          </h3>
          <p className="font-telugu text-lg text-gold/80">
            {weddingData.couple.bride.firstName} Kutumbam
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {bride.map((member, index) => (
              <div key={member.name} className="w-full sm:w-[calc(50%-1rem)]">
                <FamilyMemberCard
                  member={member}
                  variant="bride"
                  index={index}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Groom's Family */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex w-full flex-col items-center space-y-6 text-center"
        >
          <h3 className="font-display text-2xl font-bold text-maroon md:text-3xl">
            Groom&apos;s Family
          </h3>
          <p className="font-telugu text-lg text-gold/80">
            {weddingData.couple.groom.firstName} Kutumbam
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {groom.map((member, index) => (
              <div key={member.name} className="w-full sm:w-[calc(50%-1rem)]">
                <FamilyMemberCard
                  member={member}
                  variant="groom"
                  index={index}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Family Blessing */}
      <ScrollReveal direction="up" delay={0.3} className="mt-16 w-full text-center md:mt-20">
        <p className="font-display text-xl italic text-maroon/60 md:text-2xl">
          &ldquo;Family is where life begins and love never ends.&rdquo;
        </p>
        <RangoliDivider variant="simple" className="mx-auto mt-4 max-w-xs" />
      </ScrollReveal>
    </SectionFrame>
  );
}

function FamilyMemberCard({
  member,
  variant,
  index,
}: {
  member: FamilyMember;
  variant: 'bride' | 'groom';
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const borderAccent =
    variant === 'bride'
      ? 'border-temple-red/20'
      : 'border-peacock/20';
  const bgColor =
    variant === 'bride'
      ? 'bg-temple-red/5'
      : 'bg-peacock/5';
  const textColor =
    variant === 'bride'
      ? 'text-temple-red/80'
      : 'text-peacock/80';

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
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
        <div className="mb-6 flex justify-center">
          <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-gold/40 shadow-xl shadow-gold/10">
            <img
              src={member.photo}
              alt={`${member.name} photo`}
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.onerror = null;
                target.src = '/images/family/placeholder.jpg';
              }}
            />
            {/* Initial letter fallback */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-5xl font-bold text-gold/50">
                {member.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Role label */}
        <div className="mb-2 text-center">
          <span className={cn(
            'inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.2em]',
            bgColor,
            textColor
          )}>
            {member.relationship}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-center font-display text-xl font-bold text-maroon md:text-2xl">
          {member.name}
        </h3>

        {/* Relation in Telugu */}
        <p className="mt-0.5 text-center text-sm text-gold/60">
          {member.teluguRelation}
        </p>

        {/* Gold divider */}
        <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        {/* Blessing */}
        <p className="mx-auto max-w-xs text-center text-sm italic leading-relaxed text-maroon/70 md:text-base">
          &ldquo;{member.blessing}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}