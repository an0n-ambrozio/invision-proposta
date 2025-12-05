import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pillar } from '../types';
import { Check, Plus } from 'lucide-react';

interface PillarCardProps {
  pillar: Pillar;
  index: number;
}

export const PillarCard: React.FC<PillarCardProps> = ({ pillar, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group cursor-pointer rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/60 transition-colors duration-500 ${isOpen ? 'ring-2 ring-amber-500/50' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={pillar.image} 
          alt={pillar.title} 
          className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-700 scale-105 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/40" />
      </div>

      <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[400px]">
        {/* Header Section */}
        <div className="mb-auto">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-full bg-slate-950/50 backdrop-blur border border-white/10 text-amber-500 shadow-lg">
                <pillar.icon size={28} strokeWidth={1.5} />
              </div>
              {pillar.isBonus && (
                <span className="px-3 py-1 text-xs font-bold tracking-wider text-slate-900 bg-amber-400 rounded-full shadow-lg shadow-amber-500/20">
                  BÔNUS
                </span>
              )}
           </div>
           
           <h3 className="serif text-2xl md:text-3xl font-light text-white mb-2 group-hover:text-amber-400 transition-colors drop-shadow-md">
             {pillar.title}
           </h3>
           <p className="text-slate-300 text-sm font-medium tracking-wide uppercase">
             {pillar.hours}
           </p>
        </div>

        {/* Description Section */}
        <div>
          <p className="text-slate-200 leading-relaxed mb-6 border-l-2 border-amber-500/50 pl-4 drop-shadow-sm">
            {pillar.description}
          </p>

          <div className="flex items-center text-amber-500 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
            <Plus size={16} className={`mr-2 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
            {isOpen ? "Menos detalhes" : "Ver detalhes"}
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-6"
              >
                <ul className="space-y-3">
                  {pillar.features.map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start text-sm text-slate-300"
                    >
                      <Check size={16} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};