import React from 'react'
import { useChatStore } from '../store/useChatStore';
import ActiveTab from '../components/ActiveTab'
import ChatsList from '../components/ChatsList';
import ChatContainer from '../components/ChatContainer';
import ContactList from '../components/ContactList'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder';
import ProfileHeader from '../components/ProfileHeader';
import BorderAnimation from '../components/BorderAnimation';

function ChatPage() {
  const {activeTab, selectedUser} = useChatStore();

  return (
    <div className="relative w-full h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] rounded-2xl overflow-hidden">
      <BorderAnimation>
        {/* LEFT SIDE - Sidebar */}
        <div className={`${selectedUser ? 'hidden md:flex' : 'flex w-full'} md:w-80 bg-slate-900/40 backdrop-blur-xl flex-col border-r border-slate-700/30 shadow-2xl overflow-hidden`}>
          <ProfileHeader />
          <ActiveTab />

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE - Chat Area */}
        <div className={`${selectedUser ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-slate-950/40 backdrop-blur-xl overflow-hidden`}>
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimation>
    </div>
  )
}


export default ChatPage;