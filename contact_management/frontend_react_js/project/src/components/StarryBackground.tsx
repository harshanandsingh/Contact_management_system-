import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
}

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create stars
    const stars: Star[] = [];
    const starCount = Math.floor(canvas.width * canvas.height / 3000);
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.05 + 0.01
      });
    }
    
    // Add a few bigger stars
    for (let i = 0; i < starCount / 20; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1.5,
        opacity: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.08 + 0.04
      });
    }
    
    // Drawing function for stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a dark blue radial gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0, 
        canvas.width / 2, 
        canvas.height / 2, 
        canvas.width / 1.5
      );
      gradient.addColorStop(0, '#0f172a'); // Dark blue center
      gradient.addColorStop(0.5, '#0f1a30'); // Slightly lighter
      gradient.addColorStop(1, '#0f0d20'); // Very dark blue/purple edge
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(Date.now() * star.speed) * 0.3 + star.opacity})`;
        ctx.fill();
        
        // Move stars slightly
        star.y += star.speed;
        
        // Reset stars that go out of bounds
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      // Add a few small nebula-like clouds
      for (let i = 0; i < 5; i++) {
        const x = (i / 5) * canvas.width + (Math.sin(Date.now() * 0.0001 + i) * 100);
        const y = (Math.cos(Date.now() * 0.0001 + i) * 100) + canvas.height / 2;
        
        const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, 150);
        nebulaGradient.addColorStop(0, 'rgba(83, 82, 237, 0.03)');
        nebulaGradient.addColorStop(0.5, 'rgba(125, 95, 255, 0.02)');
        nebulaGradient.addColorStop(1, 'rgba(74, 0, 224, 0)');
        
        ctx.fillStyle = nebulaGradient;
        ctx.beginPath();
        ctx.arc(x, y, 150, 0, Math.PI * 2);
        ctx.fill();
      }
      
      requestAnimationFrame(drawStars);
    };
    
    const animationId = requestAnimationFrame(drawStars);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};