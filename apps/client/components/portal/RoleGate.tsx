"use client";
import type { ReactNode } from "react";
import { useRole } from "@/hooks/useRole";
import { useAuth } from "@/hooks/useAuth";
import { UserRole, AdminRole } from "@kwasu-portal/types";

interface RoleGateProps {
  allow: Array<UserRole | AdminRole>;
  fallback?: ReactNode;
  children: ReactNode;
}

export function RoleGate({ allow, fallback = null, children }: RoleGateProps) {
  const { loading } = useAuth();
  const { role } = useRole();

  if (loading) return null;

  if (!role) return <>{fallback}</>;

  const permitted = (allow as string[]).includes(role);

  return permitted ? <>{children}</> : <>{fallback}</>;
}

export function RepOnly({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <RoleGate
      allow={[UserRole.CLASS_REP, UserRole.ASSISTANT_REP]}
      fallback={fallback}
    >
      {children}
    </RoleGate>
  );
}

export function ClassRepOnly({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <RoleGate allow={[UserRole.CLASS_REP]} fallback={fallback}>
      {children}
    </RoleGate>
  );
}

export function StudentOnly({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <RoleGate
      allow={[UserRole.STUDENT, UserRole.CLASS_REP, UserRole.ASSISTANT_REP]}
      fallback={fallback}
    >
      {children}
    </RoleGate>
  );
}
