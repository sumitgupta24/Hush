import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore();
    const {onlineUsers} = useAuthStore();
    const isOnline = onlineUsers.includes(selectedUser._id)

    useEffect(() => {
        const handleEscKey = (event) => {
            if(event.key === 'Escape') setSelectedUser(null)
        }

        window.addEventListener("keydown", handleEscKey);

        return () => window.removeEventListener("keydown", handleEscKey)
    },[setSelectedUser])

    return (
        <div className="flex justify-between items-center bg-slate-900/40 backdrop-blur-sm border-b border-slate-700/30 px-3 md:px-4 py-2 h-fit">
            <div className="flex items-center space-x-2 min-w-0">
                <div className="relative flex-shrink-0">
                    <img 
                        src={selectedUser.profilePicture || "/avatar.png"} 
                        alt={selectedUser.fullName}
                        className="w-8 h-8 md:w-9 md:h-9 rounded-lg object-cover ring-1 ring-primary-500/20"
                    />
                    {isOnline && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 ring-1 ring-slate-900"></span>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-slate-100 font-semibold text-xs md:text-sm truncate leading-tight">{selectedUser.fullName}</h3>
                    <p className="text-slate-400 text-xs leading-tight">
                        {isOnline ? (
                            <span className="flex items-center gap-0.5">
                                <span className="w-1 h-1 rounded-full bg-green-500"></span>
                                Online
                            </span>
                        ) : (
                            "Offline"
                        )}
                    </p>
                </div>
            </div>
            <button 
                onClick={() => setSelectedUser(null)}
                className="btn-ghost"
                title="Close (ESC)"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    )
}

export default ChatHeader