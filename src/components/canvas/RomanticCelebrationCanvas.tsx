import React, { useEffect, useRef } from 'react';

interface RomanticCelebrationCanvasProps {
  type: 'always' | 'hug';
}

interface CelebrationParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  drag: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
  flipAngle: number;
  flipSpeed: number;
  color: string;
  kind: 'heart' | 'envelope' | 'petal' | 'star' | 'ribbon';
}

export const RomanticCelebrationCanvas: React.FC<RomanticCelebrationCanvasProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: CelebrationParticle[] = [];
    const colors = type === 'always'
      ? ['#e11d48', '#f43f5e', '#ffd700', '#fda4af', '#be123c', '#fff1f2', '#ff4d6d']
      : ['#f43f5e', '#fb7185', '#be123c', '#ffe4e6', '#ffd700', '#ff758f', '#a4133c'];

    const originX = width / 2;
    const originY = height * 0.42;

    // Spawn 120-140 custom romantic paper elements
    const totalCount = Math.min(140, Math.floor((width * height) / 4500));

    for (let i = 0; i < totalCount; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = Math.random() * 14 + (type === 'always' ? 4 : 2);
      const kindRand = Math.random();
      const kind: CelebrationParticle['kind'] =
        kindRand < 0.45 ? 'heart' :
        kindRand < 0.65 ? 'petal' :
        kindRand < 0.82 ? 'envelope' :
        kindRand < 0.92 ? 'ribbon' : 'star';

      particles.push({
        x: originX + (Math.random() - 0.5) * 30,
        y: originY + (Math.random() - 0.5) * 30,
        vx: Math.cos(angle) * speed * (type === 'hug' ? 0.75 : 1),
        vy: Math.sin(angle) * speed - (type === 'hug' ? 5 : 4),
        gravity: type === 'hug' ? 0.12 : 0.18,
        drag: 0.982,
        size: Math.random() * 8 + (kind === 'envelope' ? 12 : 8),
        alpha: 1,
        decay: Math.random() * 0.003 + 0.002,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.1 + 0.04,
        color: colors[Math.floor(Math.random() * colors.length)],
        kind,
      });
    }

    // Helper: Draw paper heart
    const drawHeart = (p: CelebrationParticle) => {
      const s = p.size;
      ctx.beginPath();
      const topCurve = s * 0.3;
      ctx.moveTo(0, topCurve);
      ctx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, topCurve);
      ctx.bezierCurveTo(-s / 2, (s + topCurve) / 2, 0, s, 0, s * 1.3);
      ctx.bezierCurveTo(0, s, s / 2, (s + topCurve) / 2, s / 2, topCurve);
      ctx.bezierCurveTo(s / 2, 0, 0, 0, 0, topCurve);
      ctx.closePath();
      ctx.fill();
    };

    // Helper: Draw miniature love letter envelope
    const drawEnvelope = (p: CelebrationParticle) => {
      const w = p.size * 1.4;
      const h = p.size * 0.9;
      // White envelope rectangle
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.strokeStyle = '#fda4af';
      ctx.lineWidth = 1;
      ctx.strokeRect(-w / 2, -h / 2, w, h);

      // Envelope flap lines
      ctx.beginPath();
      ctx.moveTo(-w / 2, -h / 2);
      ctx.lineTo(0, h * 0.1);
      ctx.lineTo(w / 2, -h / 2);
      ctx.strokeStyle = '#fda4af';
      ctx.stroke();

      // Red wax heart stamp
      ctx.fillStyle = '#e11d48';
      ctx.beginPath();
      ctx.arc(0, h * 0.1, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    // Helper: Draw rose petal
    const drawPetal = (p: CelebrationParticle) => {
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 1.1, p.size * 0.6, 0.4, 0, Math.PI * 2);
      ctx.fill();
    };

    // Helper: Draw ribbon
    const drawRibbon = (p: CelebrationParticle) => {
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 1.6, p.size * 0.35, 0.6, 0, Math.PI * 2);
      ctx.fill();
    };

    // Helper: Draw gold star
    const drawStar = (p: CelebrationParticle) => {
      const s = p.size * 0.8;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
        const aMid = a + Math.PI / 4;
        ctx.lineTo(Math.cos(aMid) * (s * 0.3), Math.sin(aMid) * (s * 0.3));
      }
      ctx.closePath();
      ctx.fill();
    };

    let active = true;

    const render = () => {
      if (!active) return;
      ctx.clearRect(0, 0, width, height);

      let aliveCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;

        p.x += p.vx;
        p.y += p.vy;

        p.rotation += p.rotationSpeed;
        p.flipAngle += p.flipSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > height + 40) {
          continue;
        }

        aliveCount++;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        // 3D paper flip effect
        ctx.scale(Math.cos(p.flipAngle), 1);

        ctx.fillStyle = p.color;

        if (p.kind === 'heart') {
          drawHeart(p);
        } else if (p.kind === 'envelope') {
          drawEnvelope(p);
        } else if (p.kind === 'petal') {
          drawPetal(p);
        } else if (p.kind === 'ribbon') {
          drawRibbon(p);
        } else {
          drawStar(p);
        }

        ctx.restore();
      }

      if (aliveCount > 0) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      active = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ willChange: 'transform' }}
    />
  );
};
