import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { MessageCircle, Users } from 'lucide-react'

function ActiveTab() {
  const {activeTab, setActiveTab} =  useChatStore();
  return (
    <div className="flex gap-2 p-2.5 border-b border-slate-700/30 sticky top-0 bg-slate-900/40 backdrop-blur-sm">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
          activeTab === "chats" 
            ? "bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-300 border border-primary-500/30" 
            : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/30"
        }`}
      >
        <MessageCircle className="w-4 h-4 flex-shrink-0" />
        <span className="hidden sm:inline">Chats</span>
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
          activeTab === "contacts" 
            ? "bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-300 border border-primary-500/30" 
            : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/30"
        }`}
      >
        <Users className="w-4 h-4 flex-shrink-0" />
        <span className="hidden sm:inline">Contacts</span>
      </button>
    </div>
  )
}

export default ActiveTab