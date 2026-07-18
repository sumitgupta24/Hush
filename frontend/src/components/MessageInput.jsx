import React, { useState, useRef } from 'react';
import useKeyboardSound from '../hooks/useKeyboardSound';
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';
import { Image, Send, X } from 'lucide-react';

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText('');
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="border-t border-white/10 bg-slate-950/50 backdrop-blur-sm">
      {imagePreview && (
        <div className="flex animate-slideUp items-center px-4 pt-3 md:px-6">
          <div className="relative rounded-2xl border border-white/10 bg-slate-900/70 p-2">
            <img src={imagePreview} alt="Preview" className="h-20 w-20 rounded-xl object-cover" />
            <button
              onClick={removeImage}
              className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500/90 text-white transition-all hover:bg-red-600"
              type="button"
              title="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2 px-3 py-3 md:px-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`btn-ghost flex-shrink-0 ${imagePreview ? 'text-primary-400' : ''}`}
          title="Add image"
        >
          <Image className="h-5 w-5" />
        </button>

        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />

        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          className="message-input m-0 flex-1"
          placeholder="Type your message..."
        />

        <button type="submit" disabled={!text.trim() && !imagePreview} className="btn-send" title="Send message">
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;