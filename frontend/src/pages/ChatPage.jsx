import React from 'react';
import { useChatStore } from '../store/useChatStore';
import ActiveTab from '../components/ActiveTab';
import ChatsList from '../components/ChatsList';
import ChatContainer from '../components/ChatContainer';
import ContactList from '../components/ContactList';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder';
import ProfileHeader from '../components/ProfileHeader';
import BorderAnimation from '../components/BorderAnimation';

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative h-[calc(100vh-2rem)] w-full overflow-hidden rounded-[28px] md:h-[calc(100vh-3rem)]">
      <BorderAnimation>
        <div className={`${selectedUser ? 'hidden md:flex' : 'flex w-full'} flex-col overflow-hidden border-r border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(2,6,23,0.95))] md:w-[360px]`}>
          <ProfileHeader />
          <ActiveTab />
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {activeTab === 'chats' ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        <div className={`${selectedUser ? 'flex' : 'hidden'} flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.1),transparent_25%),linear-gradient(135deg,rgba(2,6,23,0.95),rgba(15,23,42,0.95))] md:flex`}>
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimation>
    </div>
  );
}

export default ChatPage;