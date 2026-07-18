import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { MessageCircle, Users } from 'lucide-react';

function ActiveTab() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="sticky top-0 flex gap-2 border-b border-white/10 bg-slate-900/20 p-2.5 backdrop-blur-sm">
      <button
        onClick={() => setActiveTab('chats')}
        className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
          activeTab === 'chats'
            ? 'border border-primary-500/30 bg-primary-500/15 text-primary-300 shadow-lg shadow-primary-500/10'
            : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
        }`}
      >
        <MessageCircle className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">Chats</span>
      </button>

      <button
        onClick={() => setActiveTab('contacts')}
        className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
          activeTab === 'contacts'
            ? 'border border-primary-500/30 bg-primary-500/15 text-primary-300 shadow-lg shadow-primary-500/10'
            : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
        }`}
      >
        <Users className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">Contacts</span>
      </button>
    </div>
  );
}

export default ActiveTab;