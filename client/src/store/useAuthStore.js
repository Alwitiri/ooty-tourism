import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (user, token) => set({ user, token }),

      register: async (name, email, password) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        set({ user: data.data.user, token: data.data.token });
        return data.data.user;
      },

      login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        set({ user: data.data.user, token: data.data.token });
        return data.data.user;
      },

      logout: () => set({ user: null, token: null }),
    }),
    { name: 'ooty-auth-storage' }
  )
);
