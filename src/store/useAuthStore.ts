import { create } from 'zustand';
import {
    onAuthStateChanged,
    type User,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: User | null) => void;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true,
    error: null,
    setUser: (user) => set({ user, isLoading: false }),
    setError: (error) => set({ error }),
    signInWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    logout: async () => {
        set({ isLoading: true });
        try {
            await signOut(auth);
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    }
}));

// Initialize auth listener
onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
});
