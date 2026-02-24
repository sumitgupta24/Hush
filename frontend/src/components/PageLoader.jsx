import React from 'react'
import { Loader2 } from "lucide-react"

function PageLoader() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'>
      <div className='flex flex-col items-center gap-4'>
        <div className='relative w-16 h-16'>
          <div className='absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg opacity-20 blur-xl animate-pulse'></div>
          <div className='relative w-full h-full flex items-center justify-center'>
            <Loader2 className="size-10 text-primary-400 animate-spin" />
          </div>
        </div>
        <p className='text-slate-400 text-sm font-medium'>Loading...</p>
      </div>
    </div>
  )
}

export default PageLoader