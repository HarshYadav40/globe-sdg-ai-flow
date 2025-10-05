import { useEffect, useRef } from 'react';

export const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rotation = 0;

    const drawGlobe = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 20;

      // Outer glow
      const outerGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.2);
      outerGlow.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
      outerGlow.addColorStop(1, 'rgba(34, 197, 94, 0)');
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Globe sphere
      const gradient = ctx.createRadialGradient(centerX - radius / 3, centerY - radius / 3, 0, centerX, centerY, radius);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(0.5, '#1e40af');
      gradient.addColorStop(1, '#1e3a8a');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Latitude lines
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
      ctx.lineWidth = 1;
      for (let i = -2; i <= 2; i++) {
        const y = centerY + (radius * i) / 2.5;
        const width = Math.sqrt(radius * radius - Math.pow(y - centerY, 2)) * 2;
        
        ctx.beginPath();
        ctx.ellipse(centerX, y, width / 2, radius / 15, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude lines
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI + rotation;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        
        ctx.beginPath();
        ctx.ellipse(0, 0, radius / 4, radius, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Random dots (continents)
      ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
      for (let i = 0; i < 50; i++) {
        const angle = ((i * 137.5) / 360) * Math.PI * 2 + rotation;
        const latitude = (i % 7) - 3;
        const x = centerX + Math.cos(angle) * radius * 0.7;
        const y = centerY + Math.sin(angle) * radius * 0.3 + latitude * 20;
        
        const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        if (distFromCenter < radius) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rotation += 0.002;
    };

    const animate = () => {
      drawGlobe();
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="max-w-full animate-float"
      />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background pointer-events-none" />
    </div>
  );
};
