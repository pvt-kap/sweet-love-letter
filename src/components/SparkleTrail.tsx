import { useEffect, useCallback, useRef } from "react";

const SparkleTrail = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const throttleRef = useRef(0);

  const createSparkle = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - throttleRef.current < 50) return;
    throttleRef.current = now;

    const sparkle = document.createElement("div");
    sparkle.className = "sparkle-particle";
    const size = 4 + Math.random() * 6;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    sparkle.style.cssText = `
      position: fixed;
      left: ${x + offsetX}px;
      top: ${y + offsetY}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      background: radial-gradient(circle, hsl(35 60% 55%), hsl(38 70% 75%));
      box-shadow: 0 0 ${size * 2}px hsl(35 60% 55% / 0.6);
      animation: sparkle-fade 0.8s ease-out forwards;
    `;

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => createSparkle(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) createSparkle(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, [createSparkle]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50" />;
};

export default SparkleTrail;
