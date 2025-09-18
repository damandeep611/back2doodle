'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Share2, Heart, MoreHorizontal, ZoomIn, ZoomOut, Wand2 } from 'lucide-react'
import { demoImages } from '@/lib/demo-images'


export default function CanvasArea() {
  const [images, setImages] = useState(demoImages)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [zoomLevel, setZoomLevel] = useState(100)

  const toggleLike = (id: number) => {
    setImages(prev => prev.map(img => 
      img.id === id 
        ? { ...img, isLiked: !img.isLiked, likes: img.isLiked ? img.likes - 1 : img.likes + 1 }
        : img
    ))
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Generated Images</h2>
          <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
            {images.length} images
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setZoomLevel(prev => Math.max(50, prev - 25))}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-sm text-gray-600 min-w-[50px] text-center">{zoomLevel}%</span>
          <button 
            onClick={() => setZoomLevel(prev => Math.min(200, prev + 25))}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-auto p-4">
        <div 
          className="grid  gap-4 transition-all duration-300"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${200 * (zoomLevel / 100)}px, 1fr))`
          }}
        >
          <AnimatePresence>
            {images.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                onHoverStart={() => setSelectedImage(image.id)}
                onHoverEnd={() => setSelectedImage(null)}
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden">
                  <motion.img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedImage === image.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex gap-2">
                      <motion.button
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Download size={16} className="text-white" />
                      </motion.button>
                      <motion.button
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 size={16} className="text-white" />
                      </motion.button>
                      <motion.button
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MoreHorizontal size={16} className="text-white" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>

                {/* Image details */}
                <div className="p-3">
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {image.prompt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <motion.button
                      onClick={() => toggleLike(image.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                        image.isLiked 
                          ? 'text-red-500 bg-red-50' 
                          : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart 
                        size={12} 
                        className={image.isLiked ? 'fill-current' : ''} 
                      />
                      {image.likes}
                    </motion.button>
                    
                    <span className="text-xs text-gray-400">
                      Just now
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {images.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center h-full text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Wand2 size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No images generated yet</h3>
            <p className="text-center max-w-sm">
              Use the toolbar to start generating amazing images with AI
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}