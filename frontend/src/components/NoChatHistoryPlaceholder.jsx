import { MessageCircle } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 rounded-2xl flex items-center justify-center mb-5">
        <MessageCircle className="size-10 text-primary-400" />
      </div>
      <h3 className="text-2xl font-bold text-slate-100 mb-3 font-['Plus_Jakarta_Sans']">
        Start your conversation with {name}
      </h3>
      <div className="flex flex-col space-y-3 max-w-md mb-6">
        <p className="text-slate-400 text-base">
          This is the beginning of your conversation. Send a message to start chatting!
        </p>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent mx-auto"></div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <button className="px-4 py-2 text-sm font-semibold text-primary-400 bg-primary-500/10 border border-primary-500/30 rounded-full hover:bg-primary-500/20 hover:border-primary-500/50 transition-all">
          👋 Say Hello
        </button>
        <button className="px-4 py-2 text-sm font-semibold text-primary-400 bg-primary-500/10 border border-primary-500/30 rounded-full hover:bg-primary-500/20 hover:border-primary-500/50 transition-all">
          🤝 How are you?
        </button>
        <button className="px-4 py-2 text-sm font-semibold text-primary-400 bg-primary-500/10 border border-primary-500/30 rounded-full hover:bg-primary-500/20 hover:border-primary-500/50 transition-all">
          📅 Meet up soon?
        </button>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;