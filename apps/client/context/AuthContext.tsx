"use client";

import { dummyUsers } from "@/data/users";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { User } from "@kwasu-portal/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authLoading: boolean;
  authError: string | null;
  login: (credentials: {
    matricNo: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<{ success: boolean; error?: string | undefined | unknown }>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fakeDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 500));

const isValidPassword = (input: string, storedHash: string) => {
  return input === storedHash;
};

function setSessionCookie(active: boolean) {
  if (active) {
    document.cookie = "session=true; path=/; max-age=86400; SameSite=Lax";
  } else {
    document.cookie = "session=; path=/; max-age=0; SameSite=Lax";
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users] = useState<User[]>(dummyUsers);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("dummy_user");
      if (savedUser) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse saved user:", error);
      localStorage.removeItem("dummy_user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setAuthError(null), []);

  const login = useCallback(
    async ({ matricNo, password }: { matricNo: string; password: string }) => {
      setAuthLoading(true);
      setAuthError(null);
      try {
        await fakeDelay();

        const foundUser = users.find(
          (u) => u.matricNo.toLowerCase() === matricNo.toLowerCase(),
        );

        if (!foundUser) {
          throw new Error("Invalid matricNo or password.");
        }

        if (!isValidPassword(password, foundUser.passwordHash)) {
          throw new Error("Invalid matricNo or password.");
        }

        setUser(foundUser);
        setSessionCookie(true);
        localStorage.setItem("dummy_user", JSON.stringify(foundUser));
        return { success: true };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Login failed.";
        setAuthError(message);
        return { success: false, error };
      } finally {
        setAuthLoading(false);
      }
    },
    [users],
  );

  const logout = useCallback(async () => {
    setAuthLoading(true);
    try {
      await fakeDelay();
      setUser(null);
      setSessionCookie(false);
      localStorage.removeItem("dummy_user");
    } catch (error) {
      setAuthError("Logout failed. Please try again.");
      console.error(error);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        authLoading,
        authError,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
