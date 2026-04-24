import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface AdSlotProps {
  id: string;
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  type?: 'display' | 'multiplex' | 'in-feed';
  className?: string;
}

/**
 * Professional AdSlot component for Google AdSense.
 */
const AdSlot: React.FC<AdSlotProps> = ({ id, slot, format = 'auto', type = 'display', className = "" }) => {
  useEffect(() => {
    try {
      // In production, this would trigger the actual AdSense script
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container my-8 mx-auto w-full max-w-7xl overflow-hidden ${className}`}>
      {/* Label for development/debug view */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-t-lg">
        <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Advertisement</span>
        <span className="text-[10px] text-neutral-300 font-mono">{id}</span>
      </div>
      
      {/* The Ad Slot Area */}
      <div 
        className="relative bg-neutral-50 border-x border-b border-neutral-200 rounded-b-lg flex items-center justify-center min-h-[100px] md:min-h-[250px]"
        style={{ width: '100%' }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textDecoration: 'none' }}
          data-ad-client="ca-pub-1111265152760334"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        
        {/* Placeholder overlay that only shows if ads aren't loading (optional design touch) */}
        {!window.location.hostname.includes('localhost') && (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-5 pointer-events-none">
            <svg className="w-12 h-12 text-neutral-900 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium">Space for Premium Advertisement</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdSlot;
