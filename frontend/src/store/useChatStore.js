import { create } from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from './useAuthStore'

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: JSON.parse(localStorage.getItem("messages")) || [],
    activeTab: localStorage.getItem("activeTab") || "chats",
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
    isUsersLoading: false,
    isMessageLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab) => {
        localStorage.setItem("activeTab", tab);
        set({ activeTab: tab })
    },

    setSelectedUser: (selectedUser) => {
        localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
        localStorage.setItem("messages", JSON.stringify([]));
        set({ selectedUser, messages: [] })
    },

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/contacts");
            set({ allContacts: res.data.data });
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMyChatPartners: async () => {

        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/chats");
            set({ chats: res.data.data });
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessageByUserId: async (userId) => {
        set({ isMessageLoading: true })
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            const newMessages = res.data.data;
            localStorage.setItem("messages", JSON.stringify(newMessages));
            set({ messages: newMessages })
        } catch (error) {
            toast.error(error.response?.data?.message || "Some error!!")
        } finally {
            set({ isMessageLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        };
        const messagesWithOptimistic = [...messages, optimisticMessage];
        localStorage.setItem("messages", JSON.stringify(messagesWithOptimistic));
        set((state) => ({
            messages: messagesWithOptimistic
        }));
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set((state) => {
                const updatedMessages = state.messages.map(msg =>
                    msg._id === tempId ? res.data.data : msg
                );
                localStorage.setItem("messages", JSON.stringify(updatedMessages));
                return { messages: updatedMessages };
            });
        } catch (error) {
            set((state) => {
                const revertedMessages = state.messages.filter(msg => msg._id !== tempId);
                localStorage.setItem("messages", JSON.stringify(revertedMessages));
                return {messages: revertedMessages}
            });
            toast.error(error.response?.data?.message || "Something is wrong")
        }
    },

    subscribeToMessages : () => {

        const {selectedUser, isSoundEnabled} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentBySelectedUser = newMessage.senderId === selectedUser._id;   
            if(!isMessageSentBySelectedUser) return;

            const currentMessages = get().messages;
            const updatedMessages = [...currentMessages, newMessage];
            localStorage.setItem("messages", JSON.stringify(updatedMessages));
            set({messages : updatedMessages});

            if(isSoundEnabled){
                const notificationSound = new Audio("/sounds/notification.mp3")
                notificationSound.currentTime = 0;
                notificationSound.play().catch((e) => console.log("Audio play failed", e))
            }
        })

    },

    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
}))