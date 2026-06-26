'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingData } from '@/config/wedding-data';
import SectionFrame from '@/components/decorations/SectionFrame';

export default function QuotesSection() {
  const { quotes } = weddingData;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuote = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  }, [quotes.length]);

  useEffect(() => {
    const timer = setInterval(nextQuote, 5000);
    return () => clearInterval(timer);
  }, [nextQuote]);

  return (
    <SectionFrame variant="dark" id="quotes">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-left mandala */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full border border-gold/10 opacity-30" />
        <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full border border-gold/10 opacity-20" />
        {/* Bottom-right mandala */}
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border border-gold/10 opacity-30" />
        <div className="absolute -bottom-16 -right-16 h-52 w-52 rounded-full border border-gold/10 opacity-20" />
        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl py-8 md:py-12">
        {/* Decorative top element */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-gold/60 text-sm tracking-[0.3em] uppercase">Telugu Wisdom</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {/* Quote Container */}
        <div className="relative min-h-[220px] md:min-h-[200px] flex items-center justify-center">
          {/* Opening Quote Mark */}
          <div className="absolute -top-4 left-4 md:left-8 select-none">
            <span className="font-display text-6xl leading-none text-gold/30 md:text-8xl">
              &ldquo;
            </span>
          </div>

          {/* Closing Quote Mark */}
          <div className="absolute -bottom-8 right-4 md:right-8 select-none">
            <span className="font-display text-6xl leading-none text-gold/30 md:text-8xl">
              &rdquo;
            </span>
          </div>

          {/* Animated Quotes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="px-8 text-center md:px-16"
            >
              {/* Telugu Quote */}
              <p className="font-telugu text-2xl leading-relaxed text-cream md:text-3xl lg:text-4xl">
                {quotes[currentIndex].telugu}
              </p>

              {/* English Translation */}
              <p className="mt-6 text-base text-gold/70 italic md:text-lg">
                {quotes[currentIndex].english}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-gold'
                  : 'w-2 bg-gold/30 hover:bg-gold/50'
              }`}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>

        {/* Decorative bottom element */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
          <span className="text-2xl text-gold/40">🪷</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </div>
    </SectionFrame>
  );
}
