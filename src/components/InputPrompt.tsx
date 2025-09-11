import { Lightbulb } from 'lucide-react'
import React from 'react'



export default function InputPrompt() {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between py-2'>
        <p className='text-sm'>Edit Prompt</p>
        <div className='flex items-center justify-between gap-2'>
          <Lightbulb size={14}/>
          <p className='text-sm'>Examples</p>
        </div>
      </div>
      <div>
       <textarea placeholder="Describe how you want to modify your image... (e.g., 'Add a sunset in the background' or 'Make it look like a painting')" className=' text-sm w-full rounded-xl h-24 px-4 py-2 border border-dashed'/>
      </div>
    </div>
  )
}
