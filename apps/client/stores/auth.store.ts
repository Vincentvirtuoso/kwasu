"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@kwasu-portal/types";
import { apiClient } from "@/lib/api";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  initialized: boolean;

  setUser: (user: User | null) => void;
  setTokens: (access: string | null, refresh: string | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (v: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: true,
      initialized: false,

      setUser: (user) => set({ user }),
      setTokens: (access, refresh) =>
        set({ accessToken: access, refreshToken: refresh }),
      setLoading: (loading) => set({ loading }),
      setInitialized: (v) => set({ initialized: v }),

      login: async (email, password) => {
        set({ loading: true });
        try {
          const response = await apiClient.post<{
            user: User;
            accessToken: string;
            refreshToken: string;
          }>("/auth/login", { email, password });
          const { user, accessToken, refreshToken } = response;
          set({
            user,
            accessToken,
            refreshToken,
            loading: false,
            initialized: true,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: async () => {
        const refreshToken = get().refreshToken;
        if (refreshToken) {
          try {
            await apiClient.post("/auth/logout", { refreshToken });
          } catch (err) {
            console.log(err);
          }
        }
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          loading: false,
          initialized: true,
        });
        sessionStorage.removeItem("kwasu-auth");
      },

      refreshAccessToken: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) return null;
        try {
          const response = await apiClient.post<{ accessToken: string }>(
            "/auth/refresh",
            {
              refreshToken,
            },
          );
          const { accessToken } = response;
          set({ accessToken });
          return accessToken;
        } catch {
          get().logout();
          return null;
        }
      },
    }),
    {
      name: "kwasu-auth",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
