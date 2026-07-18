import { MessageCircle } from 'lucide-react';

const NoConversationPlaceholder = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-primary-500/30 bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
        <MessageCircle className="h-12 w-12 text-primary-400" />
      </div>
      <h3 className="mb-2 font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-100">Select a conversation</h3>
      <p className="max-w-md text-base text-slate-400">Choose a contact from the sidebar to start chatting or continue a previous conversation.</p>
    </div>
  );
};

export default NoConversationPlaceholder;