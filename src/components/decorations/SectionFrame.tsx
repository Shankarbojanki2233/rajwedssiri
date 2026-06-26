import { cn } from '@/lib/utils';

interface SectionFrameProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'dark' | 'cream' | 'maroon';
  showTopBorder?: boolean;
  showBottomBorder?: boolean;
}

export default function SectionFrame({
  children,
  className,
  id,
  variant = 'default',
  showTopBorder = true,
  showBottomBorder = true,
}: SectionFrameProps) {
  const bgVariants = {
    default: 'bg-ivory',
    dark: 'bg-gradient-to-b from-maroon to-[#5a0016]',
    cream: 'bg-cream',
    maroon: 'bg-maroon',
  };

  return (
    <section
      id={id}
      className={cn(
        'relative w-full overflow-hidden py-16 md:py-24 flex flex-col items-center justify-center',
        bgVariants[variant],
        className
      )}
    >
      {/* Decorative top border */}
      {showTopBorder && (
        <div className="absolute left-0 right-0 top-0 h-2">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
        </div>
      )}

      {/* Corner ornaments */}
      <div className="pointer-events-none absolute left-4 top-4 h-16 w-16 opacity-20">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 C16 0, 32 0, 32 16 C32 0, 48 0, 64 0" stroke="#D4AF37" strokeWidth="1" />
          <path d="M0 0 C0 16, 0 32, 16 32 C0 32, 0 48, 0 64" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="8" cy="8" r="3" fill="#D4AF37" opacity="0.5" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 rotate-90 opacity-20">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 C16 0, 32 0, 32 16 C32 0, 48 0, 64 0" stroke="#D4AF37" strokeWidth="1" />
          <path d="M0 0 C0 16, 0 32, 16 32 C0 32, 0 48, 0 64" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="8" cy="8" r="3" fill="#D4AF37" opacity="0.5" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {children}
      </div>

      {/* Decorative bottom border */}
      {showBottomBorder && (
        <div className="absolute bottom-0 left-0 right-0 h-2">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
        </div>
      )}
    </section>
  );
}
