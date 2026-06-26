'use client';

import { motion } from 'motion/react';
import { weddingData } from '@/config/wedding-data';
import { cn } from '@/lib/utils';
import SectionFrame from '@/components/decorations/SectionFrame';
import ScrollReveal from '@/components/animations/ScrollReveal';
import RangoliDivider from '@/components/decorations/RangoliDivider';

interface ContactCardProps {
  name: string;
  role: string;
  icon: string;
  phone: string;
  whatsapp?: string;
  delay?: number;
}

function ContactCard({ name, role, icon, phone, whatsapp, delay = 0 }: ContactCardProps) {
  const phoneClean = phone.replace(/\s/g, '');

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-white p-6 shadow-lg text-center"
        whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.15)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon */}
        <div className="mb-3 text-4xl">{icon}</div>

        {/* Role Label */}
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gold">
          {role} {role === 'Bride' ? <span className="font-telugu lowercase opacity-70">(వధువు)</span> : role === 'Groom' ? <span className="font-telugu lowercase opacity-70">(వరుడు)</span> : <span className="font-telugu lowercase opacity-70">(అత్యవసర విభాగం)</span>}
        </p>

        {/* Name */}
        <h3 className="font-display mb-4 text-xl font-bold text-maroon">
          {name}
        </h3>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {/* Phone */}
          <a
            href={`tel:${phoneClean}`}
            className={cn(
              'flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300',
              'bg-maroon/5 text-maroon hover:bg-maroon hover:text-white'
            )}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {phone}
          </a>

          {/* WhatsApp */}
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300',
                'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white'
              )}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          )}
        </div>

        {/* Decorative corner shimmer */}
        <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/5 blur-2xl transition-all group-hover:bg-gold/10" />
      </motion.div>
    </ScrollReveal>
  );
}

export default function ContactSection() {
  const { contact } = weddingData;

  return (
    <SectionFrame variant="default" id="contact">
      {/* Section Header */}
      <ScrollReveal>
        <div className="mb-12 text-center">
          <motion.span
            className="mb-2 inline-block text-3xl"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          >
            📞
          </motion.span>
          <h2 className="font-display text-3xl font-bold text-maroon md:text-4xl lg:text-5xl">
            Contact Us
          </h2>
          <p className="font-telugu mt-2 text-xl text-gold md:text-2xl">
            మమ్మల్ని సంప్రదించండి
          </p>
          <RangoliDivider variant="lotus" className="mx-auto max-w-xs" />
        </div>
      </ScrollReveal>

      {/* Contact Cards */}
      <div className="mx-auto grid w-full max-w-4xl justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ContactCard
          name={contact.bride.name}
          role="Bride"
          icon="👰"
          phone={contact.bride.phone}
          whatsapp={contact.bride.whatsapp}
          delay={0.1}
        />
        <ContactCard
          name={contact.groom.name}
          role="Groom"
          icon="🤵"
          phone={contact.groom.phone}
          whatsapp={contact.groom.whatsapp}
          delay={0.2}
        />
        <ContactCard
          name={contact.emergency.name}
          role="Emergency Contact"
          icon="🆘"
          phone={contact.emergency.phone}
          delay={0.3}
        />
      </div>

      {/* Email Section */}
      <ScrollReveal delay={0.4}>
        <div className="mx-auto mt-10 max-w-md text-center">
          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white px-6 py-3 text-maroon shadow-md transition-all duration-300 hover:border-gold/40 hover:shadow-lg"
          >
            <svg className="h-5 w-5 text-gold transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span className="text-sm font-medium">{contact.email}</span>
          </a>
        </div>
      </ScrollReveal>

      {/* Bottom Note */}
      <ScrollReveal delay={0.5}>
        <p className="mt-10 text-center text-sm text-maroon/40">
          Feel free to reach out to us for any questions or assistance 🙏
        </p>
      </ScrollReveal>
    </SectionFrame>
  );
}
