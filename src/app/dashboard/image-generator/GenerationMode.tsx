"use client"
import { Clock, Sparkles, Zap } from 'lucide-react';
import React, { useState } from 'react'
import { motion } from 'framer-motion';

interface GenerationModesTypes {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  time: string;
}


  const generationModes: GenerationModesTypes[] = [
    { id: 'fast', name: 'Fast', icon: Clock, color: 'text-blue-400', time: '~30s' },
    { id: 'standard', name: 'Standard', icon: Zap, color: 'text-green-400', time: '~60s' },
    { id: 'premium', name: 'Premium', icon: Sparkles, color: 'text-purple-400', time: '~120s' }
  ];
export default function GenerationMode() {
    const [generationMode, setGenerationMode] = useState<'standard' | 'fast' | 'premium'>('standard');


  return (
    <div>
        
        <div className="flex space-x-2">
          {generationModes.map((mode) => {
            const isSelected = generationMode === mode.id;
            return (
              <motion.button
                key={mode.id}
                onClick={() => setGenerationMode("standard")}
                className={`flex-1 p-3 rounded-lg border transition-all duration-200 ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20'
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between space-y-1">
                  <mode.icon size={14} className={isSelected ? mode.color : 'text-gray-400'} />
                  <div className={`text-[10px] font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {mode.name}
                  </div>
                  <div className={`text-[10px] ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                    {mode.time}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
  )
}
