'use client';

import { motion } from 'motion/react';
import { weddingData } from '@/config/wedding-data';
import SectionFrame from '@/components/decorations/SectionFrame';
import ScrollReveal from '@/components/animations/ScrollReveal';
import RangoliDivider from '@/components/decorations/RangoliDivider';
import { cn } from '@/lib/utils';

// ── Icon Components ──────────────────────────────────────────────────────────
function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('h-6 w-6', className)}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function NavigateIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('h-5 w-5', className)}>
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('h-5 w-5', className)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('h-5 w-5', className)}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

function HotelIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('h-7 w-7', className)}>
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
      <path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" />
      <path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
    </svg>
  );
}

function BusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('h-7 w-7', className)}>
      <path d="M8 6v6" /><path d="M16 6v6" />
      <path d="M2 12h19.6" />
      <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function TrainIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('h-7 w-7', className)}>
      <rect width="16" height="16" x="4" y="3" rx="2" />
      <path d="M4 11h16" /><path d="M12 3v8" />
      <path d="m8 19-2 3" /><path d="m18 22-2-3" />
      <path d="M8 15h0" /><path d="M16 15h0" />
    </svg>
  );
}

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('h-7 w-7', className)}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function ParkingIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('h-6 w-6', className)}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  );
}

// ── Amenity Data ─────────────────────────────────────────────────────────────
const { venue } = weddingData;

const nearbyAmenities = [
  {
    icon: HotelIcon,
    label: 'Hotels',
    name: venue.nearbyHotels[0]?.name ?? 'Nearby Hotel',
    distance: venue.nearbyHotels[0]?.distance ?? '—',
  },
  {
    icon: BusIcon,
    label: 'Bus Stand',
    name: venue.nearbyBusStand.name,
    distance: venue.nearbyBusStand.distance,
  },
  {
    icon: TrainIcon,
    label: 'Railway Station',
    name: venue.nearbyRailway.name,
    distance: venue.nearbyRailway.distance,
  },
  {
    icon: PlaneIcon,
    label: 'Airport',
    name: venue.nearbyAirport.name,
    distance: venue.nearbyAirport.distance,
  },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function VenueSection() {
  return (
    <SectionFrame id="venue" variant="cream">
      {/* Section Header */}
      <ScrollReveal>
        <div className="mb-12 w-full text-center">
          <p className="font-telugu text-lg text-gold md:text-xl">వేదిక</p>
          <h2 className="font-display mt-1 text-3xl font-bold text-maroon md:text-5xl">
            Venue
          </h2>
          <RangoliDivider variant="lotus" className="mx-auto max-w-xs" />
        </div>
      </ScrollReveal>

      {/* Map Area */}
      <ScrollReveal delay={0.15}>
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border-2 border-gold/30 shadow-xl">
          {venue.embedUrl ? (
            <iframe
              src={venue.embedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${venue.name}`}
              className="block w-full"
            />
          ) : (
            <div className="flex h-[400px] w-full items-center justify-center bg-gradient-to-br from-cream via-ivory to-cream">
              <div className="text-center">
                <MapPinIcon className="mx-auto h-16 w-16 text-gold/60" />
                <p className="mt-3 text-sm text-maroon/60">Map loading…</p>
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* Venue Name & Address */}
      <ScrollReveal delay={0.25}>
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <motion.h3
            className="font-display text-2xl font-bold text-maroon md:text-3xl"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            {venue.name}
          </motion.h3>
          <div className="mt-3 flex flex-col items-center gap-2 text-center text-maroon/70">
            <MapPinIcon className="h-5 w-5 shrink-0 text-gold" />
            <p className="max-w-md text-sm leading-relaxed md:text-base">{venue.address}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Action Buttons */}
      <ScrollReveal delay={0.35}>
        <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3">
          <motion.a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-cream shadow-lg transition-colors hover:bg-maroon/90"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <NavigateIcon className="h-4 w-4" />
            Navigate
          </motion.a>

          <motion.a
            href={`tel:${venue.phone}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-gold/50 bg-ivory px-6 py-3 text-sm font-semibold text-maroon shadow transition-colors hover:bg-gold/10"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <PhoneIcon className="h-4 w-4 text-gold" />
            Call Venue
          </motion.a>

          <motion.a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gold/50 bg-ivory px-6 py-3 text-sm font-semibold text-maroon shadow transition-colors hover:bg-gold/10"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLinkIcon className="h-4 w-4 text-gold" />
            Open in Google Maps
          </motion.a>
        </div>
      </ScrollReveal>

      {/* Nearby Amenities Grid */}
      <ScrollReveal delay={0.45}>
        <div className="mx-auto mt-14 w-full max-w-4xl">
          <h4 className="mb-6 text-center text-lg font-semibold text-maroon/80">
            Nearby Amenities
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            {nearbyAmenities.map((amenity, idx) => (
              <motion.div
                key={amenity.label}
                className="group flex w-full max-w-[160px] flex-col items-center rounded-xl border border-gold/20 bg-ivory/80 p-5 text-center shadow-sm transition-shadow hover:shadow-md sm:w-[calc(50%-1rem)] md:w-[calc(25%-1rem)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/5 text-gold transition-colors group-hover:from-gold/30 group-hover:to-gold/10">
                  <amenity.icon />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {amenity.label}
                </p>
                <p className="mt-1 text-sm font-medium text-maroon/80 leading-snug">
                  {amenity.name}
                </p>
                <span className="mt-1 inline-block rounded-full bg-gold/10 px-3 py-0.5 text-xs font-medium text-maroon/60">
                  {amenity.distance}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Parking Info */}
      {venue.parking && (
        <ScrollReveal delay={0.55}>
          <div className="mx-auto mt-10 max-w-lg">
            <div className="flex flex-col items-center gap-3 rounded-xl border border-gold/20 bg-ivory/80 p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <ParkingIcon />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-maroon">Parking Information</p>
                <p className="mt-1 text-sm leading-relaxed text-maroon/70">
                  {venue.parking}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}
    </SectionFrame>
  );
}
