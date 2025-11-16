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
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimation>
        {/* LEFT SIDE */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTab />

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimation>
    </div>
  )
}

export default ChatPage;