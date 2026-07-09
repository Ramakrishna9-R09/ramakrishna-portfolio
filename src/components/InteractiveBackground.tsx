import { useEffect, useRef } from 'react';

interface InteractiveBackgroundProps {
  activeTheme?: 'purple' | 'emerald' | 'indigo';
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
}

export default function InteractiveBackground({ activeTheme = 'purple' }: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize random floating stars
    const stars: Star[] = [];
    const starCount = 40;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.05 + 0.01,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const getThemeColor = (alpha: number) => {
      if (activeTheme === 'emerald') return `rgba(244, 244, 245, ${alpha})`;
      if (activeTheme === 'indigo') return `rgba(244, 244, 245, ${alpha})`;
      return `rgba(255, 255, 255, ${alpha})`;
    };

    const gap = 52; // density of warp grid

    const animate = () => {
      ctx.fillStyle = '#030014';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw and float stars
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      // 2. Generate elastic warp grid
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      const points: { x: number; y: number; alpha: number }[][] = [];
      const mouse = mouseRef.current;

      for (let c = 0; c < cols; c++) {
        points[c] = [];
        for (let r = 0; r < rows; r++) {
          const x0 = c * gap;
          const y0 = r * gap;
          const dx = mouse.x - x0;
          const dy = mouse.y - y0;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200; // warp influence radius
          let x = x0;
          let y = y0;
          let alpha = 0.025; // default subtle grid line alpha

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            const angle = Math.atan2(dy, dx);
            
            // Warp coordinates toward the cursor (funnel effect)
            const displacement = -force * 25; // negative draws toward mouse
            x += Math.cos(angle) * displacement;
            y += Math.sin(angle) * displacement;

            alpha = 0.025 + force * 0.12; // glow lines near mouse
          }

          points[c][r] = { x, y, alpha };
        }
      }

      // 3. Draw grid lines
      ctx.lineWidth = 0.8;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const p = points[c][r];

          // Right neighbor line
          if (c < cols - 1) {
            const pRight = points[c + 1][r];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pRight.x, pRight.y);
            const avgAlpha = (p.alpha + pRight.alpha) / 2;
            ctx.strokeStyle = getThemeColor(avgAlpha);
            ctx.stroke();
          }

          // Bottom neighbor line
          if (r < rows - 1) {
            const pBottom = points[c][r + 1];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pBottom.x, pBottom.y);
            const avgAlpha = (p.alpha + pBottom.alpha) / 2;
            ctx.strokeStyle = getThemeColor(avgAlpha);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none transition-colors duration-500 bg-[#030014]"
    />
  );
}
