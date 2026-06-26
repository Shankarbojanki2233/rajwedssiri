import { cn } from '@/lib/utils';

interface RangoliDividerProps {
  className?: string;
  variant?: 'simple' | 'ornate' | 'lotus';
}

export default function RangoliDivider({ className, variant = 'ornate' }: RangoliDividerProps) {
  if (variant === 'simple') {
    return (
      <div className={cn('flex items-center justify-center gap-4 py-6', className)}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
        <span className="text-2xl text-gold">✦</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
      </div>
    );
  }

  if (variant === 'lotus') {
    return (
      <div className={cn('flex items-center justify-center gap-3 py-6', className)}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-gold/60" />
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-gold" aria-hidden="true">
          <g fill="currentColor" opacity="0.8">
            {/* Center circle */}
            <circle cx="20" cy="20" r="4" />
            {/* Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <ellipse
                key={angle}
                cx="20"
                cy="8"
                rx="3.5"
                ry="8"
                transform={`rotate(${angle} 20 20)`}
                opacity="0.6"
              />
            ))}
          </g>
        </svg>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/30 to-gold/60" />
      </div>
    );
  }

  // Ornate variant
  return (
    <div className={cn('flex items-center justify-center gap-3 py-8', className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/70" />
      <div className="flex items-center gap-2">
        <span className="text-lg text-gold/60">❋</span>
        <svg width="50" height="24" viewBox="0 0 50 24" className="text-gold" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7">
            <path d="M0 12 Q12 0 25 12 Q38 24 50 12" />
            <path d="M0 12 Q12 24 25 12 Q38 0 50 12" />
            <circle cx="25" cy="12" r="3" fill="currentColor" />
          </g>
        </svg>
        <span className="text-lg text-gold/60">❋</span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/70" />
    </div>
  );
}
