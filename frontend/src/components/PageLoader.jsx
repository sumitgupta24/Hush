import React from 'react'
import { Loader2 } from 'lucide-react'

function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)]">
      <div className="glass-panel flex flex-col items-center gap-4 px-8 py-8">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 opacity-20 blur-xl animate-pulse" />
          <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70">
            <Loader2 className="size-8 animate-spin text-primary-400" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-100">Preparing your workspace</p>
          <p className="text-sm text-slate-400">Just a moment...</p>
        </div>
      </div>
    </div>
  )
}

export default PageLoader