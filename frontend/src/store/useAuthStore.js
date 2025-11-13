import {create} from 'zustand';

export const useAuthStore  = create((set) => ({
    authUser: {name: "Sumit",_id:24,age:22},
    isLoading: false
}))