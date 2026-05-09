import { useState, useEffect, useRef } from "react";

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export default function Counter({ target, prefix = "", suffix = "", decimals = 0, duration = 2500 }: CounterProps) {
  const [displayCount, setDisplayCount] = useState(0);
  const prevTargetRef = useRef(target);
  const currentCountRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const startValue = currentCountRef.current;
    const diff = target - startValue;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easedPercentage = 1 - Math.pow(1 - percentage, 3); // Ease out cubic
      const currentValue = startValue + (diff * easedPercentage);
      
      currentCountRef.current = currentValue;
      setDisplayCount(currentValue);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  const displayValue = displayCount.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span>{prefix}{displayValue}{suffix}</span>
  );
}
