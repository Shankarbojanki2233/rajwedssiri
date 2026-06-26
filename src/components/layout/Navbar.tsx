'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingData } from '@/config/wedding-data';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '#hero', icon: '🏠' },
  { label: 'Story', href: '#story', icon: '💕' },
  { label: 'Couple', href: '#couple', icon: '💑' },
  { label: 'Events', href: '#events', icon: '🎊' },
  { label: 'Gallery', href: '#gallery', icon: '📸' },
  { label: 'Venue', href: '#venue', icon: '📍' },
  { label: 'Contact', href: '#contact', icon: '📞' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map(item => item.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
          isScrolled
            ? 'glass-dark py-2 shadow-lg shadow-maroon/20'
            : 'bg-transparent py-4'
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold bg-maroon/80 shadow-[0_0_10px_rgba(212,175,55,0.5)]">
              <span className="font-script text-lg text-gold">S&N</span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                'hidden font-display text-sm font-bold tracking-widest sm:block uppercase',
                isScrolled ? 'text-gold' : 'text-gold'
              )}>
                {weddingData.couple.bride.firstName} & {weddingData.couple.groom.firstName}
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.3em] text-cream/60 sm:block">
                Wedding Invitation
              </span>
            </div>
          </a>

          {/* Desktop nav items */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300',
                  activeSection === item.href.substring(1)
                    ? 'text-gold'
                    : 'text-cream/70 hover:text-gold hover:translate-y-[-2px]'
                )}
              >
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-sm opacity-0 transition-opacity hover:opacity-100">{item.icon}</span>
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-maroon/50 lg:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center gap-1">
              <span className={cn(
                'h-0.5 w-5 rounded-full bg-gold transition-all duration-300',
                isMobileMenuOpen && 'translate-y-1.5 rotate-45'
              )} />
              <span className={cn(
                'h-0.5 w-5 rounded-full bg-gold transition-all duration-300',
                isMobileMenuOpen && 'opacity-0'
              )} />
              <span className={cn(
                'h-0.5 w-5 rounded-full bg-gold transition-all duration-300',
                isMobileMenuOpen && '-translate-y-1.5 -rotate-45'
              )} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 bg-gradient-to-b from-maroon to-maroon-dark shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center gap-2 p-6 pt-20">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      'flex w-full flex-col items-center justify-center gap-1 rounded-xl px-4 py-3 text-base font-medium transition-all',
                      activeSection === item.href.substring(1)
                        ? 'bg-gold/15 text-gold border border-gold/20'
                        : 'text-cream/80 hover:bg-gold/10 hover:text-cream'
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Bottom decoration */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="font-telugu text-sm text-gold/50">శుభ వివాహం</p>
                <p className="font-script text-xl text-gold/40">S & N</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
