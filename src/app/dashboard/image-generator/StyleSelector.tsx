"use client"
import { Camera, ChevronDown, Film, Palette, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

interface StyleOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{size?: number; className?: string}>;
}

const styleOptions: StyleOption[] = [
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese animation style artwork',
    icon: Sparkles,
    
  },
  {
    id: 'realistic',
    name: 'Realistic',
    description: 'Photorealistic and natural images',
    icon: Camera,
   
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'Movie-like dramatic scenes',
    icon: Film,
    
  },
  {
    id: 'artistic',
    name: 'Artistic',
    description: 'Creative and painterly styles',
    icon: Palette,
   
  }
]

export default function StyleSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption>(styleOptions[0])

  const handleSelect = (style: StyleOption)=> {
    setSelectedStyle(style);
    setIsOpen(false)
  }
  return (
    <div className="relative mx-auto w-full">
      {/* Selected Option Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 flex items-center justify-between text-left transition-colors duration-200"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center">
            <selectedStyle.icon size={16} className="text-blue-400" />
          </div>
          <div>
            <div className="text-white font-medium text-sm">{selectedStyle.name}</div>
            <div className="text-gray-400 text-xs">{selectedStyle.description}</div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-gray-400" />
        </motion.div>
      </motion.button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {styleOptions.map((model, index) => {
              const isSelected = selectedStyle.id === model.id;
              return (
                <motion.button
                  key={model.id}
                  onClick={() => handleSelect(model)}
                  className={`w-full px-4 py-2 flex items-center space-x-3 text-left transition-colors duration-150 ${
                    isSelected 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-700 text-gray-100'
                  } ${index !== styleOptions.length - 1 ? 'border-b border-gray-700' : ''}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    isSelected ? 'bg-blue-500' : 'bg-gray-700'
                  }`}>
                    <model.icon size={16} className={isSelected ? 'text-white' : 'text-blue-400'} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{model.name}</div>
                    <div className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                      {model.description}
                    </div>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
