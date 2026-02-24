import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import ChatHeader from './ChatHeader';
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton';
import MessageInput from './MessageInput';

function ChatContainer() {
  const { selectedUser, getMessageByUserId, messages, isMessagesLoading, subscribeToMessages, unsubscribeToMessages } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessageByUserId(selectedUser._id)
    subscribeToMessages()

    return () => unsubscribeToMessages()
  }, [selectedUser, getMessageByUserId, subscribeToMessages, unsubscribeToMessages])

  useEffect(() => {
    if(messageEndRef.current){
      messageEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  },[messages ])

  return (
    <>
      <ChatHeader />
      <div className='flex-1 overflow-y-auto px-4 md:px-6 py-3 md:py-4 bg-gradient-to-b from-transparent to-slate-950/20'>
        {messages.length > 0 ? (
          <div className="mx-auto space-y-2.5 md:space-y-3">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex animate-slideUp ${msg.senderId === authUser._id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ${msg.senderId === authUser._id
                    ? "msg-bubble-sent"
                    : "msg-bubble-received"
                    }`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg mb-2 max-w-full object-cover max-h-64 sm:max-h-80" />
                  )}
                  {msg.text && <p className="text-sm md:text-base leading-relaxed break-words">{msg.text}</p>}
                  <p className={`text-xs mt-2 opacity-70 ${msg.senderId === authUser._id ? "text-white" : "text-slate-400"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  )
}

export default ChatContainer