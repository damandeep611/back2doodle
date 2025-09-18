'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Image, 
  Wand2, 
 
  User
} from 'lucide-react'
import { ToolbarType } from './page'

interface BottomToolbarProps {
  activeToolbar: ToolbarType
  onToolbarChange: (toolbar: ToolbarType) => void
}

interface ToolbarOption {
  id: ToolbarType
  label: string
  icon: React.ReactNode
  description: string
}

const toolbarOptions: ToolbarOption[] = [
  {
    id: 'text2img',
    label: 'Text2Img',
    icon: <Wand2 size={20} />,
    description: 'Generate images from text prompts'
  },
  {
    id: 'img2img',
    label: 'Img2Img',
    icon: <Image size={20} />,
    description: 'Transform existing images'
  },
 
  
  {
    id: 'faceswap',
    label: 'Face Swap',
    icon: <User size={20} />,
    description: 'Swap faces in images'
  },
  
]

export default function BottomToolbar({ activeToolbar, onToolbarChange }: BottomToolbarProps) {
  return (
    <motion.div 
      className="bg-black/90 backdrop-blur-xl border border-gray-700 rounded-2xl p-2"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-center gap-1">
        {toolbarOptions.map((option) => {
          const isActive = activeToolbar === option.id
          
          return (
            <motion.button
              key={option.id}
              onClick={() => onToolbarChange(option.id)}
              className={`
                relative flex flex-col items-center justify-center p-3 rounded-xl
                transition-all duration-200 group min-w-[80px]
                ${isActive 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active indicator background */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"
                  layoutId="activeBackground"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Icon and label */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <motion.div
                  animate={{ 
                    rotateY: isActive ? [0, 10, 0] : 0,
                    scale: isActive ? 1.1 : 1 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {option.icon}
                </motion.div>
                <span className="text-xs font-medium">{option.label}</span>
              </div>

              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                            bg-black/90 text-white text-xs px-2 py-1 rounded-md
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200
                            pointer-events-none whitespace-nowrap">
                {option.description}
              </div>
            </motion.button>
          )
        })}
      </div>
      
      {/* Bottom indicator dots */}
      <div className="flex justify-center mt-2 gap-1">
        {toolbarOptions.map((option) => (
          <motion.div
            key={`dot-${option.id}`}
            className={`w-1 h-1 rounded-full transition-all duration-300 ${
              activeToolbar === option.id ? 'bg-white' : 'bg-gray-600'
            }`}
            animate={{
              scale: activeToolbar === option.id ? 1.5 : 1,
              opacity: activeToolbar === option.id ? 1 : 0.5
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}