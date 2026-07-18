import { MessageCircle } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center space-y-5 py-10 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-primary-500/30 bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
        <MessageCircle className="h-10 w-10 text-primary-400" />
      </div>
      <div>
        <h4 className="mb-2 text-lg font-bold text-slate-100">No conversations yet</h4>
        <p className="px-6 text-sm text-slate-400">Start a new chat by selecting a contact from the contacts tab.</p>
      </div>
      <button
        onClick={() => setActiveTab('contacts')}
        className="rounded-2xl border border-primary-500/30 bg-primary-500/10 px-6 py-2.5 text-sm font-semibold text-primary-400 transition-all hover:border-primary-500/50 hover:bg-primary-500/20"
      >
        Find contacts
      </button>
    </div>
  );
}
export default NoChatsFound;