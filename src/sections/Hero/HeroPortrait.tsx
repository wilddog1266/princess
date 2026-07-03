import { useEffect, useRef, type MouseEvent } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { clamp, lerp } from '../../lib/utils';

// Cache-bust in dev: the portrait files are swapped frequently but keep the same
// names, so the browser otherwise serves a stale copy and edits never appear.
const CACHE_BUST = import.meta.env.DEV ? `?t=${Date.now()}` : '';
const TOP_SRC = `/portraits/top.png${CACHE_BUST}`;
const BACK_SRC = `/portraits/back.png${CACHE_BUST}`;
const PORTRAIT_W = 1536;
const PORTRAIT_H = 1024;

// 3D float: the plane sits PLANE_Z toward the viewer inside PERSPECTIVE. The
// reveal is painted in the plane's flat local space, which perspective then
// projects outward by PROJECTION — so the cursor is pre-divided by it (relative
// to the plane centre) to make the revealed window land exactly under the
// pointer. Keep these in sync with the matching CSS (perspective / translateZ).
const PERSPECTIVE = 1400;
const PLANE_Z = 30;
const PROJECTION = PERSPECTIVE / (PERSPECTIVE - PLANE_Z);

// Same cover/object-position as the .hero-portrait <img>, so the canvas-drawn
// `back` aligns pixel-for-pixel with the `top` photo above it.
const OBJECT_X = 0.5;
const OBJECT_Y = 0.22;

const HEAD_EASE = 0.16; // reveal head follows the pointer with soft inertia
const TRAIL_EASE = 0.07; // lagging warm glow → short comet tail
const FADE_EASE = 0.12; // enter/leave presence of the reveal
const TRAIL_DECAY = 3.2; // 1/s — how fast the revealed contrail fades to nothing
const BRUSH_SPACING = 0.22; // stamp gap as a fraction of the brush radius

/**
 * The hero centerpiece. Two perfectly-registered frames of the same muse fill
 * the (full-height, right-bleed) parent panel: `top` (glasses, hair up) is
 * always shown as an <img>; `back` (no glasses, hair down) is painted into a
 * canvas through a soft brush that follows the pointer and leaves a fading
 * contrail — the viewer "develops" the alternate frame along the cursor's path,
 * which then dissolves like a jet trail. A warm glow rides the pointer. The
 * plane floats toward the viewer (translateZ + drop-shadow). Driven by one rAF
 * loop, lerped for inertia. Skipped under reduced motion (static `top`).
 */
export function HeroPortrait() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const interactive = !prefersReducedMotion;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef({ rx: 0, ry: 0, on: 0 });
  const state = useRef({ rx: 0, ry: 0, on: 0, tx: 0, ty: 0, sx: 0, sy: 0 });
  const snap = useRef(true);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!interactive) return;

    const display = canvasRef.current;
    const dctx = display?.getContext('2d');
    if (!display || !dctx) return;

    const mask = document.createElement('canvas');
    const mctx = mask.getContext('2d');
    // `figure` is the back photo pre-graded and pre-clipped to the silhouette,
    // rebuilt only on layout — so each frame just stamps the trail mask and
    // composites two bitmaps, with no per-frame image filter or gradient fill.
    const figure = document.createElement('canvas');
    const fctx = figure.getContext('2d');
    if (!mctx || !fctx) return;

    const back = new Image();
    back.src = BACK_SRC;

    let cw = 0;
    let ch = 0;
    let radius = 200;

    const layout = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      cw = rect.width;
      ch = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      for (const c of [display, mask, figure]) {
        c.width = Math.round(cw * dpr);
        c.height = Math.round(ch * dpr);
      }
      dctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = clamp(Math.min(cw, ch) * 0.3, 150, 300);

      if (!back.complete || !back.naturalWidth) return;
      const iw = back.naturalWidth;
      const ih = back.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) * OBJECT_X;
      const dy = (ch - dh) * OBJECT_Y;

      fctx.clearRect(0, 0, cw, ch);
      fctx.filter = 'contrast(1.04) saturate(1.06)';
      fctx.globalCompositeOperation = 'source-over';
      fctx.drawImage(back, dx, dy, dw, dh);
      fctx.filter = 'none';
      // Same silhouette / left-fade ellipse the top photo uses, baked in once.
      fctx.globalCompositeOperation = 'destination-in';
      fctx.save();
      fctx.translate(0.78 * cw, 0.32 * ch);
      fctx.scale(1.35 * cw, 1.05 * ch);
      const fade = fctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      fade.addColorStop(0.48, 'rgba(0,0,0,1)');
      fade.addColorStop(1, 'rgba(0,0,0,0)');
      fctx.fillStyle = fade;
      fctx.fillRect(-1, -1, 2, 2);
      fctx.restore();
      fctx.globalCompositeOperation = 'source-over';
    };

    layout();
    back.decode().then(layout).catch(() => undefined);
    const ro = new ResizeObserver(layout);
    if (containerRef.current) ro.observe(containerRef.current);

    const stamp = (x: number, y: number, alpha: number) => {
      const g = mctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, `rgba(255,255,255,${alpha})`);
      g.addColorStop(0.34, `rgba(255,255,255,${alpha * 0.85})`);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      mctx.fillStyle = g;
      mctx.beginPath();
      mctx.arc(x, y, radius, 0, Math.PI * 2);
      mctx.fill();
    };

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const s = state.current;
      const t = target.current;
      if (snap.current) {
        s.rx = t.rx;
        s.ry = t.ry;
        s.sx = t.rx;
        s.sy = t.ry;
        snap.current = false;
      }
      s.rx = lerp(s.rx, t.rx, HEAD_EASE);
      s.ry = lerp(s.ry, t.ry, HEAD_EASE);
      s.on = lerp(s.on, t.on, FADE_EASE);
      s.tx = lerp(s.tx, t.rx, TRAIL_EASE);
      s.ty = lerp(s.ty, t.ry, TRAIL_EASE);

      const el = containerRef.current;
      if (el) {
        el.style.setProperty('--reveal-x', `${s.rx}px`);
        el.style.setProperty('--reveal-y', `${s.ry}px`);
        el.style.setProperty('--reveal-on', `${s.on}`);
        el.style.setProperty('--trail-x', `${s.tx}px`);
        el.style.setProperty('--trail-y', `${s.ty}px`);
      }

      if (cw > 0 && ch > 0) {
        // Decay the existing trail (frame-rate independent) → contrail fade.
        mctx.globalCompositeOperation = 'destination-out';
        mctx.fillStyle = `rgba(0,0,0,${1 - Math.exp(-TRAIL_DECAY * dt)})`;
        mctx.fillRect(0, 0, cw, ch);

        // Lay fresh reveal along the pointer's path so fast moves stay continuous.
        mctx.globalCompositeOperation = 'source-over';
        if (s.on > 0.02 && back.complete) {
          const dx = s.rx - s.sx;
          const dy = s.ry - s.sy;
          const dist = Math.hypot(dx, dy);
          const steps = Math.max(1, Math.floor(dist / (radius * BRUSH_SPACING)));
          for (let i = 1; i <= steps; i++) {
            const u = i / steps;
            stamp(s.sx + dx * u, s.sy + dy * u, s.on);
          }
        }
        s.sx = s.rx;
        s.sy = s.ry;

        // Composite: the pre-graded, pre-clipped figure kept only where the
        // trail mask has alpha → the revealed contrail.
        dctx.clearRect(0, 0, cw, ch);
        dctx.globalCompositeOperation = 'source-over';
        dctx.drawImage(figure, 0, 0, cw, ch);
        dctx.globalCompositeOperation = 'destination-in';
        dctx.drawImage(mask, 0, 0, cw, ch);
        dctx.globalCompositeOperation = 'source-over';
      }

      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame.current);
      ro.disconnect();
    };
  }, [interactive]);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const t = target.current;
    t.rx = cx + (event.clientX - rect.left - cx) / PROJECTION;
    t.ry = cy + (event.clientY - rect.top - cy) / PROJECTION;
    t.on = 1;
  };

  const handleEnter = () => {
    snap.current = true;
  };

  const handleLeave = () => {
    target.current.on = 0;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={interactive ? handleMove : undefined}
      onMouseEnter={interactive ? handleEnter : undefined}
      onMouseLeave={interactive ? handleLeave : undefined}
      className="hero-enter size-full [perspective:1400px]"
    >
      <div className="hero-plane relative size-full">
        <img
          src={TOP_SRC}
          alt="Portrait of a Princess studio muse"
          width={PORTRAIT_W}
          height={PORTRAIT_H}
          loading="eager"
          decoding="async"
          className="hero-portrait absolute inset-0 size-full [transform:translateZ(30px)]"
        />
        {interactive && (
          <>
            <canvas
              ref={canvasRef}
              aria-hidden
              className="hero-reveal-canvas absolute inset-0 size-full [transform:translateZ(30px)]"
            />
            <div aria-hidden className="hero-glow hero-glow--trail" />
            <div aria-hidden className="hero-glow" />
          </>
        )}
      </div>
    </div>
  );
}
