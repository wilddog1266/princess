import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { lerp } from '../../lib/utils';

const GLOW_EASE = 0.12; // glow inertia toward the exact pointer

/**
 * Custom pointer: a precise accent dot above a full-viewport canvas that paints
 * a warm glow trailing the cursor like a spotlight. The accent colour is read
 * from the --accent token and refreshed on theme change. Disabled on coarse
 * pointers and under reduced motion (native cursor kept).
 */
export function CursorEffect() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
  const enabled = fine && !prefersReducedMotion;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    root.classList.add('has-cursor');

    let accent = '216, 122, 94';
    let additive = false;
    const readTheme = () => {
      const hex = getComputedStyle(root).getPropertyValue('--accent').trim();
      const m = /^#?([0-9a-f]{6})$/i.exec(hex);
      if (m) {
        const n = parseInt(m[1], 16);
        accent = `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
      }
      additive = root.getAttribute('data-theme') === 'dark';
    };
    readTheme();
    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let px = -50;
    let py = -50;
    let gx = -50;
    let gy = -50;

    const onMove = (event: PointerEvent) => {
      px = event.clientX;
      py = event.clientY;
      root.style.setProperty('--cx', `${px}px`);
      root.style.setProperty('--cy', `${py}px`);
    };

    let raf = 0;
    const tick = () => {
      gx = lerp(gx, px, GLOW_EASE);
      gy = lerp(gy, py, GLOW_EASE);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = additive ? 'lighter' : 'source-over';
      const r = 46;
      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
      glow.addColorStop(0, `rgba(${accent}, ${additive ? 0.28 : 0.2})`);
      glow.addColorStop(1, `rgba(${accent}, 0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(gx, gy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      themeObserver.disconnect();
      cancelAnimationFrame(raf);
      root.classList.remove('has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="cursor-canvas" />
      <div aria-hidden className="cursor-dot" />
    </>
  );
}
