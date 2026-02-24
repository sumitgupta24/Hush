import { MessageCircle } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-5">
      <div className="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 rounded-2xl flex items-center justify-center">
        <MessageCircle className="w-10 h-10 text-primary-400" />
      </div>
      <div>
        <h4 className="text-slate-100 font-bold text-lg mb-2">No conversations yet</h4>
        <p className="text-slate-400 text-sm px-6">
          Start a new chat by selecting a contact from the contacts tab
        </p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-6 py-2.5 text-sm font-semibold text-primary-400 bg-primary-500/10 border border-primary-500/30 rounded-lg hover:bg-primary-500/20 hover:border-primary-500/50 transition-all"
      >
        Find contacts
      </button>
    </div>
  );
}
export default NoChatsFound;