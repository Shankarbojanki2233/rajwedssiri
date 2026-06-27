'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SparkleItem {
  id: number;
  style: {
    width: string;
    height: string;
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  };
}

interface SparklesProps {
  className?: string;
  count?: number;
}

export default function Sparkles({ className, count = 20 }: SparklesProps) {
  const [mounted, setMounted] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleItem[]>([]);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      const generated = Array.from({ length: count }).map((_, i) => ({
        id: i,
        style: {
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${Math.random() * 2 + 2}s`,
        },
      }));
      setSparkles(generated);
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, [count]);

  if (!mounted) return null;

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle absolute rounded-full bg-gold"
          style={sparkle.style}
        />
      ))}
    </div>
  );
}
