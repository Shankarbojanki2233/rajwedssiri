'use client';

import { motion } from 'motion/react';
import { weddingData } from '@/config/wedding-data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-maroon to-[#2d000b] text-cream">
      {/* Top decorative border */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(212,175,55,0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, rgba(212,175,55,0.2) 0%, transparent 50%)`,
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Telugu Blessing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-col items-center text-center"
        >
          <p className="font-telugu text-2xl md:text-3xl text-gold font-medium mb-2">
            మీ రాక మా అదృష్టం
          </p>
          <p className="text-cream/60 text-sm italic font-display">
            Your presence is our fortune
          </p>
        </motion.div>

        {/* Decorative divider */}
        <div className="mx-auto mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold text-xl">🪷</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        {/* Quick links */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-cream/50">
          {['Home', 'Events', 'Gallery', 'Venue'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-gold transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Couple monogram */}
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/40">
            <span className="font-script text-2xl text-gold">
              {weddingData.couple.bride.firstName[0]}&{weddingData.couple.groom.firstName[0]}
            </span>
          </div>
        </div>

        {/* Wedding hashtag */}
        <p className="mb-6 text-center text-sm text-gold/70 font-medium">
          {weddingData.wedding.hashtag}
        </p>

        {/* Copyright */}
        <div className="flex flex-col items-center gap-2 border-t border-gold/10 pt-6 text-center text-xs text-cream/30">
          <p>© {new Date().getFullYear()} {weddingData.couple.bride.firstName} & {weddingData.couple.groom.firstName}. Made with ❤️</p>
          <p className="font-telugu text-xs">శుభం భవతు 🙏</p>
          <p className="mt-2 text-cream/40">
            Designed & Developed by{' '}
            <a
              href="https://www.instagram.com/shankar_bojanki/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/70 hover:text-gold transition-colors font-medium"
            >
               Shankar Bojanki
            </a>
          </p>
        </div>

        {/* Back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-maroon shadow-lg shadow-maroon/50 text-gold transition-colors hover:bg-gold hover:text-maroon"
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      </div>
    </footer>
  );
}
