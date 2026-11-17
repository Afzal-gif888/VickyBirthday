import React, { useEffect, useRef } from 'react';

interface CosmicBackgroundProps {
  theme?: 'fairytale' | 'birthday' | 'luxury';
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  type: 'star' | 'heart' | 'petal' | 'dust';
  size: number;
  rotation: number;
  rotationSpeed: number;
}

interface Butterfly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  wingAngle: number;
  wingSpeed: number;
  size: number;
  color: string;
  glowColor: string;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ theme = 'fairytale' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color palettes based on theme
    const isLuxury = theme === 'luxury';
    const isFairytale = theme === 'fairytale';

    const starColors = isLuxury
      ? ['#ffd700', '#fce7b2', '#ff9999', '#ffccdd']
      : ['#ffffff', '#ffd1dc', '#f3c4fb', '#c8b6ff'];

    // Generate Particles
    const particleCount = Math.min(100, Math.floor((width * height) / 12000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const pType = Math.random() < 0.65 ? 'star' : Math.random() < 0.85 ? 'heart' : 'petal';
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: pType === 'heart' ? -(Math.random() * 0.6 + 0.3) : (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        maxAlpha: Math.random() * 0.5 + 0.5,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        type: pType,
        size: Math.random() * 6 + 6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Interactive sparkle trail
    const interactiveParticles: Particle[] = [];
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      for (let i = 0; i < 2; i++) {
        interactiveParticles.push({
          x: clientX + (Math.random() - 0.5) * 16,
          y: clientY + (Math.random() - 0.5) * 16,
          radius: Math.random() * 2.5 + 1,
          color: Math.random() > 0.5 ? '#f43f5e' : '#ffd700',
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5 - 0.5,
          alpha: 1,
          maxAlpha: 1,
          pulseSpeed: 0.03,
          type: 'dust',
          size: 4,
          rotation: 0,
          rotationSpeed: 0,
        });
      }
      if (interactiveParticles.length > 50) {
        interactiveParticles.splice(0, interactiveParticles.length - 50);
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Glowing butterflies
    const butterflies: Butterfly[] = [
      {
        x: width * 0.2,
        y: height * 0.4,
        vx: 0.8,
        vy: -0.3,
        wingAngle: 0,
        wingSpeed: 0.12,
        size: 9,
        color: '#ff90b3',
        glowColor: 'rgba(255, 144, 179, 0.6)',
      },
      {
        x: width * 0.8,
        y: height * 0.6,
        vx: -0.6,
        vy: 0.2,
        wingAngle: 1.5,
        wingSpeed: 0.14,
        size: 11,
        color: '#ffd166',
        glowColor: 'rgba(255, 209, 102, 0.6)',
      },
      {
        x: width * 0.5,
        y: height * 0.8,
        vx: 0.5,
        vy: -0.4,
        wingAngle: 3,
        wingSpeed: 0.11,
        size: 8,
        color: '#c77dff',
        glowColor: 'rgba(199, 125, 255, 0.6)',
      },
    ];

    // Helper: draw heart
    const drawHeart = (cx: number, cy: number, size: number, color: string, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.translate(cx, cy);
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.3);
      ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Helper: draw butterfly
    const drawButterfly = (b: Butterfly) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      const wingSpread = Math.sin(b.wingAngle);

      // Glow
      ctx.shadowColor = b.glowColor;
      ctx.shadowBlur = 12;

      // Left wing
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.ellipse(-b.size * 0.5 * Math.abs(wingSpread), -b.size * 0.2, b.size * Math.abs(wingSpread), b.size * 0.6, -0.4, 0, Math.PI * 2);
      ctx.fill();

      // Right wing
      ctx.beginPath();
      ctx.ellipse(b.size * 0.5 * Math.abs(wingSpread), -b.size * 0.2, b.size * Math.abs(wingSpread), b.size * 0.6, 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(0, 0, 1.5, b.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft nebula background gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        20,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );

      if (isLuxury) {
        bgGrad.addColorStop(0, '#2b0713');
        bgGrad.addColorStop(0.5, '#18040a');
        bgGrad.addColorStop(1, '#080104');
      } else if (isFairytale) {
        bgGrad.addColorStop(0, '#2d113f');
        bgGrad.addColorStop(0.45, '#170826');
        bgGrad.addColorStop(1, '#07020d');
      } else {
        bgGrad.addColorStop(0, '#36122d');
        bgGrad.addColorStop(0.5, '#19071c');
        bgGrad.addColorStop(1, '#09020e');
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Update & render stars/hearts
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse alpha
        p.alpha += p.pulseSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.15) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.size, p.color, p.alpha);
        } else if (p.type === 'petal') {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = isLuxury ? '#b31b3e' : '#ff9ebb';
          ctx.globalAlpha = p.alpha * 0.8;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.8, p.size * 0.4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Twinkling Star
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Render interactive user sparkles
      for (let i = interactiveParticles.length - 1; i >= 0; i--) {
        const ip = interactiveParticles[i];
        ip.x += ip.speedX;
        ip.y += ip.speedY;
        ip.alpha -= ip.pulseSpeed;

        if (ip.alpha <= 0) {
          interactiveParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = ip.alpha;
        ctx.fillStyle = ip.color;
        ctx.shadowColor = ip.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(ip.x, ip.y, ip.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render glowing butterflies
      butterflies.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
        b.wingAngle += b.wingSpeed;

        // Gentle wandering
        b.vx += (Math.random() - 0.5) * 0.05;
        b.vy += (Math.random() - 0.5) * 0.05;
        b.vx = Math.max(-1.2, Math.min(1.2, b.vx));
        b.vy = Math.max(-1.0, Math.min(1.0, b.vy));

        if (b.x < -20) b.x = width + 20;
        if (b.x > width + 20) b.x = -20;
        if (b.y < -20) b.y = height + 20;
        if (b.y > height + 20) b.y = -20;

        drawButterfly(b);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ willChange: 'transform' }}
    />
  );
};
