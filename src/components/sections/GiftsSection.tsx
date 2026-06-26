'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { weddingData } from '@/config/wedding-data';
import { cn } from '@/lib/utils';
import SectionFrame from '@/components/decorations/SectionFrame';
import ScrollReveal from '@/components/animations/ScrollReveal';
import RangoliDivider from '@/components/decorations/RangoliDivider';

export default function GiftsSection() {
  const { gifts } = weddingData;

  if (!gifts.enabled) return null;

  return (
    <SectionFrame id="gifts" variant="default">
      {/* Section Header */}
      <ScrollReveal direction="up" className="mb-12 w-full text-center md:mb-16">
        <span className="mb-3 inline-block text-3xl">🎁</span>
        <h2 className="font-display text-3xl font-bold text-maroon md:text-5xl">
          Blessings & Gifts
        </h2>
        <p className="font-telugu mt-2 text-lg text-gold md:text-xl">
          ఆశీర్వాదాలు & కానుకలు
        </p>
        <RangoliDivider variant="lotus" className="mx-auto mt-4 max-w-xs" />
      </ScrollReveal>

      {/* Gift Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-10 max-w-xl text-center text-lg leading-relaxed text-maroon/70 md:text-xl"
      >
        {gifts.message}
      </motion.p>

      {/* Gift Options */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto max-w-4xl"
      >
        <div className="space-y-12 text-center">
          {/* UPI Section */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-maroon">
              UPI
            </h3>
            <p className="text-sm text-maroon/60">
              Scan to pay via UPI
            </p>
            <div className="flex flex-col items-center gap-4">
              {gifts.upiQrCode && (
                <div className="relative h-48 w-48">
                  <img
                    src={gifts.upiQrCode}
                    alt="UPI QR Code"
                    className="h-full w-full rounded-xl border-2 border-gold/30 object-contain shadow-lg"
                  />
                </div>
              )}
              <div className="text-center">
                <p className="font-mono text-sm">{gifts.upiId}</p>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-maroon">
                Bank Transfer
              </h3>
              <p className="text-sm text-maroon/60">
                Direct bank transfer details
              </p>
            </div>
            
            <div className="mx-auto grid max-w-md gap-6 justify-items-center text-center sm:grid-cols-2">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-lg">
                  👤
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">Name</p>
                  <p className="text-sm font-medium text-maroon">{gifts.bankDetails.accountName}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-lg">
                  🏦
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">Bank</p>
                  <p className="text-sm font-medium text-maroon">{gifts.bankDetails.bankName}</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-lg">
                  🔢
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">Account</p>
                  <p className="font-mono text-sm font-medium text-maroon leading-none">
                    {gifts.bankDetails.accountNumber}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-lg">
                  🆔
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">IFSC</p>
                  <p className="font-mono text-sm font-medium text-maroon">{gifts.bankDetails.ifsc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amazon Wishlist */}
          {gifts.amazonWishlist && (
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-maroon">
                Amazon Wishlist
              </h3>
              <p className="text-sm text-maroon/60">
                Visit our wishlist to gift something special
              </p>
              <motion.a
                href={gifts.amazonWishlist}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/10 px-6 py-3 text-sm font-semibold text-maroon transition-colors hover:bg-gold/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path
                    d="M3 9a5 5 0 017.5 4.09l-.96 5.11a1 1 0 001.48.89l4.41-2.56a1 1 0 011.6 0l4.41 2.56a1 1 0 001.48-.89l-.96-5.11A5 5 0 0121 9V5a3 3 0 00-3-3H6a3 3 0 00-3 3v4z"
                  />
                  <line x1="3" y1="15" x2="21" y2="15" />
                </svg>
                <span>View Wishlist</span>
              </motion.a>
            </div>
          )}
        </div>
      </motion.div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mx-auto mt-16 max-w-xl text-center text-sm text-maroon/50"
      >
        Your presence is the most precious gift. If you wish to bless us with a gift, your presence itself is enough.
      </motion.p>
    </SectionFrame>
  );
}