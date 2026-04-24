import React, { useEffect, useRef, useState } from 'react';

interface AdSlotProps {
  id: string;
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  type?: 'display' | 'multiplex' | 'in-feed';
  className?: string;
}

/**
 * Professional AdSlot component with robust initialization logic.
 * Prevents "availableWidth=0" errors and handle re-renders gracefully.
 */
const AdSlot: React.FC<AdSlotProps> = ({ id, slot, format = 'auto', type = 'display', className = "" }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Shared check to see if we've already pushed to this specific element
    if (isInitialized) return;

    const currentAdRef = adRef.current;
    if (!currentAdRef) return;

    // We use a ResizeObserver to wait until the container has width
    // This solves the "availableWidth=0" error
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        
        // Fluid ads need at least 250px, others just need to be visible
        const minWidthRequired = type === 'in-feed' || format === 'fluid' ? 250 : 1;

        if (width >= minWidthRequired && !isInitialized) {
          try {
            // Check if adsbygoogle is available
            if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
              // Ensure we only push if there's an unitialized 'ins' tag inside
              const ins = currentAdRef.querySelector('ins.adsbygoogle');
              if (ins && !ins.hasAttribute('data-adsbygoogle-status')) {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
                setIsInitialized(true);
                observer.disconnect(); // Stop observing once initialized
              }
            }
          } catch (err) {
            console.error(`AdSense [${id}] error:`, err);
          }
        }
      }
    });

    observer.observe(currentAdRef);

    return () => {
      observer.disconnect();
    };
  }, [id, slot, format, type, isInitialized]);

  return (
    <div 
      ref={adRef}
      className={`ad-container my-8 mx-auto w-full max-w-7xl overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-t-lg">
        <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Advertisement</span>
        {process.env.NODE_ENV === 'development' && (
          <span className="text-[10px] text-neutral-300 font-mono italic">Dev Mode: {id}</span>
        )}
      </div>
      
      <div 
        className="relative bg-neutral-50 border-x border-b border-neutral-200 rounded-b-lg flex items-center justify-center min-h-[100px] md:min-h-[250px]"
        style={{ width: '100%', minWidth: '250px' }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textDecoration: 'none', minWidth: '250px' }}
          data-ad-client="ca-pub-1111265152760334"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        
        {/* Visual placeholder while waiting for ad load */}
        {!isInitialized && (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 pointer-events-none">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-neutral-400 animate-spin-slow" />
            <p className="mt-4 text-xs font-medium uppercase tracking-widest">Premium Space</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdSlot;
