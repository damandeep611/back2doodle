"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Image, Palette, Sparkles, Wand2 } from 'lucide-react';

interface ModelOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const modelOptions: ModelOption[] = [
  {
    id: 'Seeddream',
    name: 'Seeddream 4.0',
    description: 'OpenAI\'s latest image generation model',
    icon: Zap
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'High-quality artistic image generation',
    icon: Palette
  },
  {
    id: 'stable-diffusion-xl',
    name: 'Stable Diffusion XL',
    description: 'Open-source high-resolution model',
    icon: Image
  },
  {
    id: 'nano-banana',
    name: 'Nano-Banana',
    description: 'AI-powered creative content generation',
    icon: Sparkles
  },
  {
    id: 'flux',
    name: 'Flux 1.0',
    description: 'Creative generative AI for enterprises',
    icon: Wand2
  }
];

export default function ModelSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelOption>(modelOptions[0]);

  const handleSelect = (model: ModelOption) => {
    setSelectedModel(model);
    setIsOpen(false);
  };

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
            <selectedModel.icon size={16} className="text-blue-400" />
          </div>
          <div>
            <div className="text-white font-medium text-sm">{selectedModel.name}</div>
            <div className="text-gray-400 text-xs">{selectedModel.description}</div>
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
            {modelOptions.map((model, index) => {
              const isSelected = selectedModel.id === model.id;
              return (
                <motion.button
                  key={model.id}
                  onClick={() => handleSelect(model)}
                  className={`w-full px-4 py-2 flex items-center space-x-3 text-left transition-colors duration-150 ${
                    isSelected 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-700 text-gray-100'
                  } ${index !== modelOptions.length - 1 ? 'border-b border-gray-700' : ''}`}
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
  );
}