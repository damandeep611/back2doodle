"use client"
import React, { Suspense, useState } from 'react'
import CanvasArea from './CanvasArea'
import BottomToolbar from './PromptToolbar'
import dynamic from 'next/dynamic'



// Dynamically import toolbars for code splitting
const TextToImageToolbar = dynamic(() => import("./OptionsToolbar"), {
  loading: () => <ToolbarSkeleton />,
  ssr: false
})

const ImageToImageToolbar = dynamic(() => import("./toolbars/img-to-img-toolbar"), {
  loading: () => <ToolbarSkeleton />,
  ssr: false
})



const FaceSwapToolbar = dynamic(() => import('./toolbars/FaceSwapToolbar'), {
  loading: () => <ToolbarSkeleton />,
  ssr: false
})


// Loading skeleton component
const ToolbarSkeleton = () => (
  <div className="w-[340px] h-full bg-gray-900 rounded-xl p-4 animate-pulse">
    <div className="space-y-4">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-10 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="h-32 bg-gray-700 rounded"></div>
    </div>
  </div>
)




export type ToolbarType = 'text2img' | 'img2img' | 'faceswap' 


export default function ImageGenerator() {
  const [activeToolbar, setActiveToolbar] = useState<ToolbarType>("text2img")

   // Toolbar mapping for dynamic rendering
  const toolbarComponents = {
    text2img: TextToImageToolbar,
    img2img: ImageToImageToolbar,
    faceswap: FaceSwapToolbar,
    
  }

  const ActiveToolbarComponent = toolbarComponents[activeToolbar]
  return (
    <div className='h-screen flex flex-col p-2 '>
      <div className='flex flex-1 gap-2 min-h-0'>
        <div className='flex-1 flex flex-col gap-2 min-h-0'>
          {/* main canvas area */}
        <div className='flex-1 border border-gray-300 rounded-xl overflow-hidden'>
          <CanvasArea/>
        </div>
        {/* bottom toolbar below canvas area */}
        <div className='border border-gray-300 '>
          <BottomToolbar activeToolbar={activeToolbar} onToolbarChange={setActiveToolbar}/>
        </div>
        </div>
        {/* rightside image gen toolbar */}
        <div className='w-[340px]'>
          <Suspense fallback={<ToolbarSkeleton/>}>
            <ActiveToolbarComponent/>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
