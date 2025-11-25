import { create } from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from './useAuthStore'

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (selectedUser) => set({ selectedUser,messages : [] }),

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
            set({ messages: res.data.data })
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
        set((state) => ({
            messages: [...state.messages, optimisticMessage]
        }));
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set((state) => ({
                messages: state.messages.map(msg =>
                    msg._id === tempId ? res.data.data : msg
                )
            }));
        } catch (error) {
            set({ messages: messages });
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
            set({messages : [...currentMessages, newMessage]});

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