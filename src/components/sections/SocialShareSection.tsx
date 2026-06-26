'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingData } from '@/config/wedding-data';
import { cn } from '@/lib/utils';
import { generateShareLinks } from '@/lib/utils';
import SectionFrame from '@/components/decorations/SectionFrame';
import ScrollReveal from '@/components/animations/ScrollReveal';
import RangoliDivider from '@/components/decorations/RangoliDivider';

const shareMessage = weddingData.social.whatsappMessage + weddingData.social.websiteUrl;
const shareLinks = generateShareLinks(weddingData.social.websiteUrl, shareMessage);

interface ShareButtonConfig {
  name: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  href?: string;
  action?: 'copy';
}

export default function SocialShareSection() {
  const [showToast, setShowToast] = useState(false);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(weddingData.social.websiteUrl);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = weddingData.social.websiteUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }, []);

  const buttons: ShareButtonConfig[] = [
    {
      name: 'WhatsApp',
      href: shareLinks.whatsapp,
      color: 'bg-[#25D366]',
      hoverColor: 'hover:bg-[#1fb855]',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: shareLinks.facebook,
      color: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#166fe5]',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      href: shareLinks.twitter,
      color: 'bg-[#000000]',
      hoverColor: 'hover:bg-[#1a1a1a]',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      href: shareLinks.telegram,
      color: 'bg-[#0088cc]',
      hoverColor: 'hover:bg-[#0077b3]',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
    {
      name: 'Copy Link',
      action: 'copy',
      color: 'bg-gold',
      hoverColor: 'hover:bg-[#c5a028]',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.561a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.757 8.25" />
        </svg>
      ),
    },
  ];

  return (
    <SectionFrame variant="cream" id="share">
      {/* Section Header */}
      <ScrollReveal>
        <div className="mb-12 text-center">
          <motion.span
            className="mb-2 inline-block text-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            🎊
          </motion.span>
          <h2 className="font-display text-3xl font-bold text-maroon md:text-4xl lg:text-5xl">
            Share the Joy
          </h2>
          <p className="font-telugu mt-2 text-xl text-gold md:text-2xl">
            ఆనందాన్ని పంచుకోండి
          </p>
          <RangoliDivider variant="lotus" className="mx-auto max-w-xs" />
        </div>
      </ScrollReveal>

      {/* Hashtag */}
      <ScrollReveal delay={0.1}>
        <div className="mb-10 text-center">
          <motion.div
            className="inline-block rounded-full border-2 border-gold/30 bg-white px-6 py-3 shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-display text-xl font-bold text-gold md:text-2xl">
              {weddingData.wedding.hashtag}
            </span>
          </motion.div>
          <p className="mt-3 text-sm text-maroon/50">
            Use our hashtag when sharing on social media!
          </p>
        </div>
      </ScrollReveal>

      {/* Share Buttons */}
      <ScrollReveal delay={0.2}>
        <div className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-4">
          {buttons.map((button) => {
            const isLink = !!button.href;

            const buttonContent = (
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-300',
                  button.color,
                  button.hoverColor
                )}
              >
                {button.icon}
                <span className="text-sm">{button.name}</span>
              </motion.div>
            );

            if (isLink) {
              return (
                <a
                  key={button.name}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${button.name}`}
                >
                  {buttonContent}
                </a>
              );
            }

            return (
              <button
                key={button.name}
                onClick={handleCopyLink}
                aria-label={button.name}
              >
                {buttonContent}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 rounded-full bg-maroon px-6 py-3 text-white shadow-2xl">
              <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium">Link copied!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Note */}
      <ScrollReveal delay={0.3}>
        <p className="mt-10 text-center text-sm text-maroon/50">
          Spread the word and help us celebrate! 🎉
        </p>
      </ScrollReveal>
    </SectionFrame>
  );
}
