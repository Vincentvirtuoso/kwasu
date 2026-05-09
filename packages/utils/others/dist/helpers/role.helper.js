import { AdminRole, UserRole } from "@kwasu-portal/types";
export function hasRole(userRole, allowed) {
    return allowed.includes(userRole);
}
export function canPostAnnouncement(role) {
    return hasRole(role, [UserRole.CLASS_REP, UserRole.ASSISTANT_REP]);
}
export function canApproveAnnouncement(role) {
    return hasRole(role, [AdminRole.LEVEL_ADVISER, AdminRole.SUPER_ADMIN]);
}
export function isRep(role) {
    return role === UserRole.CLASS_REP || role === UserRole.ASSISTANT_REP;
}
//# sourceMappingURL=role.helper.js.map