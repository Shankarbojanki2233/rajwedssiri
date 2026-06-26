import { cn } from '@/lib/utils';

interface ToranamProps {
  className?: string;
}

export default function Toranam({ className }: ToranamProps) {
  return (
    <div className={cn('pointer-events-none relative w-full', className)} aria-hidden="true">
      <svg
        viewBox="0 0 1200 100"
        className="w-full"
        preserveAspectRatio="xMidYMin meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main garland rope */}
        <path
          d="M0 10 Q150 80 300 10 Q450 80 600 10 Q750 80 900 10 Q1050 80 1200 10"
          fill="none"
          stroke="#2d5a27"
          strokeWidth="4"
          opacity="0.8"
        />
        {/* Secondary rope */}
        <path
          d="M0 15 Q150 85 300 15 Q450 85 600 15 Q750 85 900 15 Q1050 85 1200 15"
          fill="none"
          stroke="#3a7a33"
          strokeWidth="3"
          opacity="0.5"
        />

        {/* Mango leaves */}
        {[75, 225, 375, 525, 675, 825, 975, 1125].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${i % 2 === 0 ? 45 : 50})`}>
            {/* Leaf cluster */}
            <ellipse cx="0" cy="0" rx="8" ry="20" fill="#3a7a33" opacity="0.9"
              transform="rotate(-15)" />
            <ellipse cx="5" cy="2" rx="7" ry="18" fill="#2d5a27" opacity="0.8"
              transform="rotate(10)" />
            <ellipse cx="-5" cy="2" rx="7" ry="18" fill="#4a8a43" opacity="0.7"
              transform="rotate(-35)" />
            {/* Small flower/marigold at junction */}
            <circle cx="0" cy="-5" r="5" fill="#D4AF37" opacity="0.8" />
            <circle cx="0" cy="-5" r="3" fill="#FFD700" opacity="0.9" />
          </g>
        ))}

        {/* Center marigold decoration */}
        {[150, 450, 750, 1050].map((x, i) => (
          <g key={`m-${i}`} transform={`translate(${x}, 75)`}>
            <circle cx="0" cy="0" r="8" fill="#FF8C00" opacity="0.9" />
            <circle cx="0" cy="0" r="5" fill="#FFD700" opacity="0.8" />
            <circle cx="0" cy="0" r="2.5" fill="#FF6347" opacity="0.7" />
          </g>
        ))}
      </svg>
    </div>
  );
}
