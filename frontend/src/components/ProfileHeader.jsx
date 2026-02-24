import { useState, useRef } from "react";
import { LogOut, Volume2, VolumeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [ selectedImg, setSelectedImg ] = useState(null)

  const fileInputRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({profilePicture: base64Image});
    }
  }

  return (
    <div className="px-3 md:px-4 py-2 h-fit border-b border-slate-700/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {/* AVATAR */}
          <button
            className="size-8 md:size-9 rounded-lg overflow-hidden relative group flex-shrink-0 ring-1 ring-primary-500/20 hover:ring-primary-500/40 transition-all"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={selectedImg || authUser.profilePicture || "/avatar.png"}
              alt="User image"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-xs font-medium">Change</span>
            </div>
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* USERNAME & ONLINE TEXT */}
          <div className="min-w-0 flex-1">
            <h3 className="text-slate-100 font-semibold text-xs md:text-sm truncate leading-tight">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs leading-tight flex items-center gap-0.5">
              <span className="w-1 h-1 rounded-full bg-green-500"></span>
              Online
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-0.5 items-center flex-shrink-0">
          {/* SOUND TOGGLE BTN */}
          <button
            className="btn-ghost"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
            title={isSoundEnabled ? "Disable sounds" : "Enable sounds"}
          >
            {isSoundEnabled ? (
              <Volume2 className="size-4" />
            ) : (
              <VolumeOff className="size-4" />
            )}
          </button>

          {/* LOGOUT BTN */}
          <button
            className="btn-ghost"
            onClick={logout}
            title="Logout"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader