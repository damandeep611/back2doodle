import ImageAnalysis from '@/components/image-analysis/image-analysis'
import React from 'react'
import Sidebar from './Sidebar'

export default function DashbordPage() {
  return (
    <div className='flex min-h-screen '>
      <Sidebar/>
      <ImageAnalysis/>
    </div>
  )
}
