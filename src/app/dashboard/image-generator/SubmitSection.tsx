"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {  Minus, Plus, Zap } from "lucide-react";

interface GenerateControlsProps {
  onGenerate?: (quantity: number) => void;
  onReset?: () => void;
  isGenerating?: boolean;
}

export default function SubmitSection({
  onGenerate,
  onReset,
  isGenerating = false,
}: GenerateControlsProps) {
  const [quantity, setQuantity] = useState(1);
 
  const [credits] = useState(20);
  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(4, prev + delta)))
  }
  const handleGenerate = ()=> {
    if(!isGenerating && onGenerate) {
      onGenerate(quantity)
    }
  }
  const handleReset = ()=> {
    if(onReset){
      onReset()
    }
  }

  return (
    <div className="flex items-end gap-2 p-2 bg-gray-900 rounded-lg">
      {/* Quantity Dropdown */}
      <div className="relative">
        <span className="text-gray-300 text-xs font-medium ">Quantity</span>
      <div className="flex flex-col items-center ">
         <button onClick={()=> handleQuantityChange(1)} disabled={quantity >= 4 || isGenerating} className="bg-gray-800 cursor-pointer ">
        <Plus size={14}/>
       </button>
       <div className="">
        {quantity}
       </div>
       <button
       onClick={()=> handleQuantityChange(-1)} disabled={quantity <= 1 || isGenerating}
         className="bg-gray-800 cursor-pointer">
        <Minus size={14}/>
       </button>
      </div>

        
      </div>

      {/* Generate Button */}
      <motion.button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg transition-colors h-12"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span>Generate</span>
        <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded">
          <Zap className="w-3 h-3 text-yellow-400" />
          <span className="text-sm font-bold">{credits}</span>
        </div>
      </motion.button>

      {/* Reset Button */}
      <motion.button
        className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white font-medium px-4 py-3 rounded-lg transition-colors h-12"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        Reset
      </motion.button>
    </div>
  );
}
