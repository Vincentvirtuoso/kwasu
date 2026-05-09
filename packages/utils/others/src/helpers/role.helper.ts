import { AdminRole, UserRole } from "@kwasu-portal/types";

export function hasRole(
  userRole: UserRole | AdminRole,
  allowed: Array<UserRole | AdminRole>,
): boolean {
  return allowed.includes(userRole);
}

export function canPostAnnouncement(role: UserRole): boolean {
  return hasRole(role, [UserRole.CLASS_REP, UserRole.ASSISTANT_REP]);
}

export function canApproveAnnouncement(role: AdminRole): boolean {
  return hasRole(role, [AdminRole.LEVEL_ADVISER, AdminRole.SUPER_ADMIN]);
}

export function isRep(role: UserRole): boolean {
  return role === UserRole.CLASS_REP || role === UserRole.ASSISTANT_REP;
}
