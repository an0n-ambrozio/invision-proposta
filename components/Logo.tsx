import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Icon: Dotted Sun/Burst */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500 fill-current">
          {/* Inner Circle */}
          <circle cx="50" cy="50" r="10" />
          
          {/* First Ring */}
          <circle cx="50" cy="20" r="5" />
          <circle cx="50" cy="80" r="5" />
          <circle cx="20" cy="50" r="5" />
          <circle cx="80" cy="50" r="5" />
          <circle cx="29" cy="29" r="5" />
          <circle cx="71" cy="71" r="5" />
          <circle cx="29" cy="71" r="5" />
          <circle cx="71" cy="29" r="5" />

          {/* Outer Ring - Smaller dots */}
          <circle cx="50" cy="5" r="3" />
          <circle cx="50" cy="95" r="3" />
          <circle cx="5" cy="50" r="3" />
          <circle cx="95" cy="50" r="3" />
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col leading-none justify-center">
        <span className="text-white font-sans font-semibold text-lg tracking-[0.1em]">INVISION</span>
        <span className="text-slate-400 font-sans font-light text-[0.6rem] tracking-[0.2em] lowercase">investments</span>
      </div>
    </div>
  );
};
