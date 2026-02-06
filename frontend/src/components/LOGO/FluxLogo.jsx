import React from "react";

const FluxNotesStack = () => {
  return (
    <div className="group flex shrink-0 items-center gap-2 sm:gap-3 select-none cursor-pointer">
      {/* Icon Wrapper */}
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="paper-grad" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Bottom Sheet */}
          <rect x="16" y="10" width="20" height="26" rx="4" 
            fill="white" fillOpacity="0.1" 
            className="transform transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-1 group-hover:rotate-6" 
          />
          
          {/* Middle Sheet */}
          <rect x="13" y="12" width="20" height="26" rx="4" 
            fill="white" fillOpacity="0.3" 
            className="transform transition-transform duration-500 group-hover:translate-x-1.5 group-hover:rotate-3" 
          />
          
          {/* Top Main Sheet */}
          <rect x="10" y="14" width="20" height="26" rx="4" 
            fill="url(#paper-grad)" stroke="white" strokeWidth="1.5" 
            className="transform transition-transform duration-500" 
          />

          {/* Text Lines */}
          <path d="M15 22H25" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" className="opacity-60" />
          <path d="M15 27H21" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" className="opacity-40" />
        </svg>
      </div>

      <div className="flex flex-col justify-center -space-y-1">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">Flux</h2>
        {/* Hidden on mobile (block on sm) to save space */}
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium hidden sm:block">Notes</span>
      </div>
    </div>
  );
};

export default FluxNotesStack;