import { X } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') setSelectedUser(null);
    };

    window.addEventListener('keydown', handleEscKey);

    return () => window.removeEventListener('keydown', handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex h-fit items-center justify-between border-b border-white/10 bg-slate-900/40 px-3 py-3 backdrop-blur-sm md:px-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="relative flex-shrink-0">
          <img
            src={selectedUser.profilePicture || '/avatar.png'}
            alt={selectedUser.fullName}
            className="h-9 w-9 rounded-2xl object-cover ring-1 ring-primary-500/20 md:h-10 md:w-10"
          />
          {isOnline && <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-500" />}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-slate-100">{selectedUser.fullName}</h3>
          <p className="text-xs leading-tight text-slate-400">
            {isOnline ? (
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Online
              </span>
            ) : (
              'Offline'
            )}
          </p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)} className="btn-ghost" title="Close (ESC)">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ChatHeader;