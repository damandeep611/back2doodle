"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'

export default function ImgToImgToolbar() {
  return (
     <motion.div 
      className="w-full h-full bg-gray-900 text-white rounded-xl p-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-500 rounded-lg">
          <Settings size={20} />
        </div>
        <h2 className="text-lg font-semibold">Image to Image</h2>
      </div>
      
      <div className="space-y-4">
        <div className="h-32 bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Img2Img Controls</span>
        </div>
        <div className="h-20 bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Transform Options</span>
        </div>
        <div className="h-40 bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Parameters</span>
        </div>
      </div>
    </motion.div>
  )
}
