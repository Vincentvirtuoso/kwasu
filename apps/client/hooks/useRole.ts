"use client";
import { useAuth } from "@/context/AuthContext";
// import { useAuth } from "./useAuth";
import { UserRole, AdminRole } from "@kwasu-portal/types";
import {
  canPostAnnouncement,
  isRep,
  hasRole,
} from "@kwasu-portal/utils-others";

export function useRole() {
  const { user, isLoading: loading } = useAuth();
  const role = user?.role ?? null;

  return {
    role,
    loading,

    isStudent: role === UserRole.STUDENT,
    isClassRep: role === UserRole.CLASS_REP,
    isAssistantRep: role === UserRole.ASSISTANT_REP,
    isRep: role ? isRep(role) : false,

    canAnnounce: role ? canPostAnnouncement(role) : false,
    canManageLinks: role ? hasRole(role, [UserRole.CLASS_REP]) : false,

    can: (allowed: Array<UserRole | AdminRole>): boolean => {
      if (!role) return false;
      return (allowed as string[]).includes(role);
    },
  };
}

export function useAuthLoading(): boolean {
  return useAuth().isLoading;
}

export function useUserRole(): UserRole | null {
  return useRole().role ?? null;
}

export function useIsRep(): boolean {
  return useRole().isRep;
}

export function useCanAnnounce(): boolean {
  return useRole().canAnnounce;
}
