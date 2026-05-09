"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { apiClient } from "@/lib/api";
import type { User, ApiResponse } from "@kwasu-portal/types";

interface AuthSession {
  user: User;
}

export function useAuth() {
  const {
    user,
    loading,
    initialized,
    setUser,
    setLoading,
    setInitialized,
    logout: clearStore,
  } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    if (initialized) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchSession = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get<ApiResponse<AuthSession>>("/auth/me");
        if (!cancelled) {
          setUser(res.data.user);
        }
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    fetchSession();
    return () => {
      cancelled = true;
    };
  }, [initialized, setUser, setLoading, setInitialized]);

  const login = useCallback(
    async (
      matricNo: string,
      password: string,
    ): Promise<{ ok: boolean; error?: string }> => {
      setLoading(true);
      try {
        const res = await apiClient.post<ApiResponse<AuthSession>>(
          "/auth/login",
          {
            matricNo,
            password,
          },
        );
        setUser(res.data.user);
        setInitialized(true);
        return { ok: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Login failed";
        return { ok: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [setUser, setLoading, setInitialized],
  );

  const logout = useCallback(async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch {
    } finally {
      clearStore();
      router.replace("/login");
    }
  }, [clearStore, router]);

  const refresh = useCallback(async () => {
    try {
      const res = await apiClient.get<ApiResponse<AuthSession>>("/auth/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  }, [setUser]);

  return {
    user,
    loading,
    initialized,
    isAuthenticated: !!user,

    fullName: user ? `${user.firstName} ${user.lastName}` : null,
    initials: user
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : null,
    matricNo: user?.matricNo ?? null,
    avatarUrl: user?.avatarUrl ?? null,

    login,
    logout,
    refresh,
  };
}
