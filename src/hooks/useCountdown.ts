'use client';

import { useState, useEffect } from 'react';
import { getTimeRemaining } from '@/lib/utils';

export function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(targetDate);
      setTimeLeft(remaining);
      if (remaining.total <= 0) {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { ...timeLeft, isComplete };
}
