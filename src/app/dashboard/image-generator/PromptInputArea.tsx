"use client"
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {  Sparkles } from 'lucide-react';

export default function PromptInputArea() {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (prompt.trim()) {
      console.log('Generating image with prompt:', prompt);
      // Handle prompt submission here
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  React.useEffect(() => {
    adjustTextareaHeight();
  }, [prompt]);

  return (
    <div className="w-full">
     

      {/* Textarea Container */}
      <motion.div
        className={`relative bg-gray-800 border rounded-xl transition-all duration-300 ${
          isFocused 
            ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
            : 'border-gray-600 hover:border-gray-500'
        }`}
        whileHover={{ scale: 1.01 }}
        animate={{
          boxShadow: isFocused 
            ? '0 0 20px rgba(59, 130, 246, 0.15)' 
            : '0 0 0px rgba(59, 130, 246, 0)'
        }}
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyPress}
          placeholder="A majestic dragon flying over a mystical forest at sunset..."
          className="w-full bg-transparent text-gray-100 placeholder-gray-500 px-4 py-3 pr-12 resize-none outline-none text-sm leading-relaxed min-h-[80px] max-h-[120px]"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 transparent' }}
        />

        {/* Character Count & Actions */}
        <div className="flex items-center justify-between px-4 pb-3">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>{prompt.length}/500</span>
            {prompt.length > 450 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-amber-400"
              >
                • Approaching limit
              </motion.span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Enhance Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 px-2 py-1 text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-md transition-colors"
              onClick={() => {
                // Add AI enhancement logic here
                console.log('Enhancing prompt...');
              }}
            >
              <Sparkles size={12} />
              <span>Enhance</span>
            </motion.button>

          
          </div>
        </div>

        {/* Gradient Border Effect */}
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 -z-10 blur-sm"
          />
        )}
      </motion.div>
    </div>
  );
}