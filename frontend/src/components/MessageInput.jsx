import React, { useState } from 'react'
import useKeyboardSound from '../hooks/useKeyboardSound';
import { useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';
import { Image, Send, X } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if(!text.trim() && !imagePreview) return;
    if(isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if(fileInputRef.current) fileInputRef.current.value = ""
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file)
  };

  const removeImage = () => {
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = ""
  };

  return (
    <div className="border-t border-slate-700/30 bg-slate-950/40 backdrop-blur-sm">
      {imagePreview && (
        <div className="px-4 md:px-6 pt-2 flex items-center animate-slideUp">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700/50 shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-red-500/80 hover:bg-red-600 flex items-center justify-center text-white transition-all"
              type="button"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="px-4 md:px-6 py-2.5 md:py-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`btn-ghost flex-shrink-0 ${imagePreview ? "text-primary-400" : ""}`}
          title="Add image"
        >
          <Image className="w-5 h-5" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          className="flex-1 message-input m-0"
          placeholder="Type your message..."
        />

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="btn-send"
          title="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}

export default MessageInput