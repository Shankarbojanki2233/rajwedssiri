'use client';

import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

const PETAL_COLORS = [
  '#FFB6C1', // Light pink
  '#FF69B4', // Hot pink
  '#FFC0CB', // Pink
  '#DB7093', // Pale violet red
  '#FFD700', // Gold
  '#FFDAB9', // Peach
  '#FF6347', // Tomato (for marigold)
  '#FF8C00', // Dark orange (for marigold)
];

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationId: number;
    const petals: Petal[] = [];
    const PETAL_COUNT = 25;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize petals
    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 12 + 6,
        speedX: Math.random() * 1.5 - 0.75,
        speedY: Math.random() * 1.5 + 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.6 + 0.3,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      });
    }

    function drawPetal(ctx: CanvasRenderingContext2D, petal: Petal) {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.globalAlpha = petal.opacity;
      ctx.fillStyle = petal.color;

      // Draw petal shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        petal.size / 2, -petal.size / 2,
        petal.size, -petal.size / 4,
        petal.size, 0
      );
      ctx.bezierCurveTo(
        petal.size, petal.size / 4,
        petal.size / 2, petal.size / 2,
        0, 0
      );
      ctx.fill();

      // Add subtle gradient
      ctx.globalAlpha = petal.opacity * 0.3;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(petal.size / 3, 0, petal.size / 4, petal.size / 6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((petal) => {
        petal.x += petal.speedX + Math.sin(petal.rotation) * 0.3;
        petal.y += petal.speedY;
        petal.rotation += petal.rotationSpeed;

        // Reset petal when it goes below screen
        if (petal.y > canvas.height + 20) {
          petal.y = -20;
          petal.x = Math.random() * canvas.width;
        }
        if (petal.x > canvas.width + 20) petal.x = -20;
        if (petal.x < -20) petal.x = canvas.width + 20;

        drawPetal(ctx, petal);
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  );
}
