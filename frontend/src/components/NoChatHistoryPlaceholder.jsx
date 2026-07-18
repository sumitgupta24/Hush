import { MessageCircle } from 'lucide-react';

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary-500/30 bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
        <MessageCircle className="h-10 w-10 text-primary-400" />
      </div>
      <h3 className="mb-3 font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-100">Start your conversation with {name}</h3>
      <div className="mb-6 flex max-w-md flex-col space-y-3">
        <p className="text-base text-slate-400">This is the beginning of your conversation. Send a message to start chatting!</p>
        <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <button className="rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-semibold text-primary-400 transition-all hover:border-primary-500/50 hover:bg-primary-500/20">👋 Say Hello</button>
        <button className="rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-semibold text-primary-400 transition-all hover:border-primary-500/50 hover:bg-primary-500/20">🤝 How are you?</button>
        <button className="rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-semibold text-primary-400 transition-all hover:border-primary-500/50 hover:bg-primary-500/20">📅 Meet up soon?</button>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;