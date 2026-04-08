import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'patient' | 'clinician' | 'pharmacist' | 'admin' | null;

interface UserProfile {
  id: string;
  role: Role;
  first_name: string;
  last_name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (role: Role, name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (role, name) => {
        const [first_name, ...rest] = name.split(' ');
        const last_name = rest.join(' ');
        set({
          isAuthenticated: true,
          user: {
            id: Math.random().toString(36).substr(2, 9),
            role,
            first_name,
            last_name,
          },
        });
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'continua-auth-storage', // localStorage key
    }
  )
);
