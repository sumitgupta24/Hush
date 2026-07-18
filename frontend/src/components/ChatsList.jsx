import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import UsersLoadingSkeleton from './UsersLoadingSkeleton';
import NoChatsFound from './NoChatsFound';
import { useAuthStore } from '../store/useAuthStore';

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, []);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <button
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className="group w-full rounded-2xl border border-white/10 bg-slate-900/50 p-2.5 text-left transition-all duration-200 hover:border-primary-500/20 hover:bg-slate-800/70"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex-shrink-0">
              <img
                src={chat.profilePicture || '/avatar.png'}
                alt={chat.fullName}
                className="h-11 w-11 rounded-2xl object-cover ring-1 ring-slate-700/50 transition-all group-hover:ring-primary-500/30"
              />
              {onlineUsers.includes(chat._id) && <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-500" />}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-semibold text-slate-100 transition-colors group-hover:text-primary-300">{chat.fullName}</h4>
              <p className="truncate text-xs text-slate-400">Open conversation</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default ChatsList;