import React from 'react';

export const GrappeLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 select-none group">
      {/* Icon */}
      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
        <span className="text-white font-bold text-xl leading-none font-serif">G</span>
      </div>
      
      {/* Text */}
      <div className="flex flex-col leading-none justify-center items-start">
        <span className="text-white font-sans font-bold text-lg tracking-wide">GRAPPE</span>
        <span className="text-indigo-400 font-sans text-[0.6rem] tracking-[0.2em] uppercase">Intelligence</span>
      </div>
    </div>
  );
};