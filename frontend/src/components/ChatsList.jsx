import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton'
import NoChatsFound from "./NoChatsFound"
import { useAuthStore } from '../store/useAuthStore';

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const {onlineUsers} = useAuthStore()

  useEffect(() => {
    getMyChatPartners()
  }, [])

  if (isUsersLoading) return <UsersLoadingSkeleton />
  if (chats.length === 0) return <NoChatsFound />

  return (
    <>
      {chats.map(chat => (
        <button
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className="w-full card-hover p-2.5 rounded-lg text-left transition-all duration-200 group"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex-shrink-0">
              <img 
                src={chat.profilePicture || "/avatar.png"} 
                alt={chat.fullName}
                className="size-10 rounded-lg object-cover ring-1 ring-slate-700/50 group-hover:ring-primary-500/30 transition-all"
              />
              {onlineUsers.includes(chat._id) && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 ring-1 ring-slate-800"></span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-slate-100 font-semibold text-xs md:text-sm truncate group-hover:text-primary-400 transition-colors">{chat.fullName}</h4>
              <p className="text-slate-400 text-xs truncate">Chat</p>
            </div>
          </div>
        </button>
      ))}
    </>
  )
}

export default ChatsList