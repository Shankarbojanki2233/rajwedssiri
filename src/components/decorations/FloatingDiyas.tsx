'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface DiyaItem {
  id: number;
  style: {
    left: string;
    bottom: string;
    animationDelay: string;
    animationDuration: string;
  };
}

interface FloatingDiyasProps {
  className?: string;
  count?: number;
}

export default function FloatingDiyas({ className, count = 5 }: FloatingDiyasProps) {
  const [mounted, setMounted] = useState(false);
  const [diyas, setDiyas] = useState<DiyaItem[]>([]);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      const generated = Array.from({ length: count }).map((_, i) => ({
        id: i,
        style: {
          left: `${15 + (i * 70) / count}%`,
          bottom: `${10 + Math.random() * 30}%`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        },
      }));
      setDiyas(generated);
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, [count]);

  if (!mounted) return null;

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {diyas.map((diya) => (
        <div
          key={diya.id}
          className="absolute animate-float-diya"
          style={diya.style}
        >
          {/* Diya SVG */}
          <svg width="32" height="40" viewBox="0 0 32 40">
            {/* Flame glow */}
            <circle cx="16" cy="10" r="8" fill="#FFD700" opacity="0.3">
              <animate
                attributeName="r"
                values="6;9;6"
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.2;0.4;0.2"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Flame */}
            <path
              d="M16 4 Q20 10 18 16 Q16 18 14 16 Q12 10 16 4"
              fill="#FF8C00"
              opacity="0.9"
            >
              <animate
                attributeName="d"
                values="M16 4 Q20 10 18 16 Q16 18 14 16 Q12 10 16 4;M16 2 Q21 10 18 16 Q16 19 14 16 Q11 10 16 2;M16 4 Q20 10 18 16 Q16 18 14 16 Q12 10 16 4"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
            {/* Inner flame */}
            <path
              d="M16 8 Q18 12 17 16 Q16 17 15 16 Q14 12 16 8"
              fill="#FFD700"
              opacity="0.9"
            />
            {/* Diya bowl */}
            <ellipse cx="16" cy="28" rx="12" ry="4" fill="#C2B280" />
            <path
              d="M4 28 Q4 20 16 18 Q28 20 28 28"
              fill="#D4AF37"
              opacity="0.8"
            />
            {/* Base */}
            <ellipse cx="16" cy="32" rx="8" ry="3" fill="#B8860B" />
          </svg>
        </div>
      ))}
    </div>
  );
}
