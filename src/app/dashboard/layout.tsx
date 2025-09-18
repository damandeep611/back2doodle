import React from 'react'
import Sidebar from './Sidebar'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex h-screen'>
      <Sidebar/>
      <div className='flex-1 overflow-auto'>
        {children}
      </div>
    </div>
  )
}
