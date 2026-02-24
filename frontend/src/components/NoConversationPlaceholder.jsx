import { MessageCircle } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-24 h-24 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 rounded-2xl flex items-center justify-center mb-6">
        <MessageCircle className="size-12 text-primary-400" />
      </div>
      <h3 className="text-2xl font-bold text-slate-100 mb-2 font-['Plus_Jakarta_Sans']">Select a conversation</h3>
      <p className="text-slate-400 max-w-md text-base">
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;