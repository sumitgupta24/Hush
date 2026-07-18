import { useState, useRef } from 'react';
import { LogOut, Volume2, VolumeOff, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

const mouseClickSound = new Audio('/sounds/mouse-click.mp3');

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePicture: base64Image });
    };
  };

  return (
    <div className="border-b border-white/10 px-3 py-3 md:px-4">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            className="group relative flex-shrink-0 overflow-hidden rounded-2xl border border-primary-500/20 ring-1 ring-primary-500/10 transition-all hover:ring-primary-500/30"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={selectedImg || authUser.profilePicture || '/avatar.png'}
              alt="User image"
              className="h-12 w-12 object-cover md:h-13 md:w-13"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              Edit
            </div>
          </button>

          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-slate-100">{authUser.fullName}</h3>
              <span className="rounded-full border border-primary-500/20 bg-primary-500/10 p-1 text-primary-300">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online
            </p>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-1.5">
          <button
            className="btn-ghost"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((error) => console.log('Audio play failed:', error));
              toggleSound();
            }}
            title={isSoundEnabled ? 'Disable sounds' : 'Enable sounds'}
          >
            {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeOff className="h-4 w-4" />}
          </button>

          <button className="btn-ghost" onClick={logout} title="Logout">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;