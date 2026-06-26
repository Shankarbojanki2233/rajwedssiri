'use client';

import { useCallback, useEffect, useRef } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  gravity: number;
}

const CONFETTI_COLORS = [
  '#D4AF37', '#800020', '#C41E3A', '#006A4E',
  '#FFD700', '#FF6347', '#FF69B4', '#FFA500',
  '#9370DB', '#20B2AA', '#FF1493', '#FFB6C1',
];

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

export default function Confetti({ active, duration = 4000 }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const piecesRef = useRef<ConfettiPiece[]>([]);

  const launch = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: ConfettiPiece[] = [];
    const PIECE_COUNT = 150;

    for (let i = 0; i < PIECE_COUNT; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20,
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 8,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        opacity: 1,
        gravity: 0.05 + Math.random() * 0.05,
      });
    }

    piecesRef.current = pieces;
    const startTime = Date.now();

    function animate() {
      if (!canvas || !ctx) return;
      const elapsed = Date.now() - startTime;
      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      piecesRef.current.forEach((piece) => {
        piece.x += piece.speedX;
        piece.speedY += piece.gravity;
        piece.y += piece.speedY;
        piece.rotation += piece.rotationSpeed;
        piece.opacity = Math.max(0, 1 - elapsed / duration);

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation);
        ctx.globalAlpha = piece.opacity;
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size / 2);
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();
  }, [duration]);

  useEffect(() => {
    if (active) {
      launch();
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [active, launch]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100]"
      aria-hidden="true"
    />
  );
}
