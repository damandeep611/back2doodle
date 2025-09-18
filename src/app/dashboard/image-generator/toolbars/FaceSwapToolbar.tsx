"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'

export default function FaceSwapToolbar() {
  return (
     <motion.div 
      className=" h-full bg-gray-900 text-white rounded-xl p-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-6 ">
        <div className="p-2 bg-pink-500 rounded-lg">
          <Settings size={20} />
        </div>
        <h2 className="text-lg font-semibold">Face Swap</h2>
      </div>
      
      <div className="space-y-4">
        <div className="h-32 bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Face Detection</span>
        </div>
        <div className="h-20 bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Swap Options</span>
        </div>
        <div className="h-40 bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Blend Settings</span>
        </div>
      </div>
    </motion.div>
  )
}
