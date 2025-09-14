"use client"

import { Loader2, Sparkles } from 'lucide-react'
import React from 'react'

export default function LoadingState() {
  return (
    <div className='w-full h-96 border border-gray-600 rounded-lg flex items-center justify-center'>
      <div className='text-center space-y-4'>
        <div className='relative'>
          <div className='w-16 h-16 rounded-full flex items-center justify-center mx-auto'>
            <Loader2 className='w-8 h-8 animate-spin'/>
          </div>
          <div className='absolute -top-1 -right-1'>
            <Sparkles className='w-6 h-6 animate-pulse'/>
          </div>
        </div>
        <div className='space-y-2'>
          <p className='text-lg font-medium'>AI is working its magic</p>
          <p className='text-sm'>Processing your image with Nano Banana..</p>
        </div>
        <div className='w-48 rounded-full h-2 mx-auto overflow-hidden'>
          <div className='h-full bg-pink-500 rounded-full animate-pulse' style={{width: "60%"}}/>
        </div>
      </div>
      
    </div>
  )
}
