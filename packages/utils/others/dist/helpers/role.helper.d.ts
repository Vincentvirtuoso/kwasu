import { AdminRole, UserRole } from "@kwasu-portal/types";
export declare function hasRole(userRole: UserRole | AdminRole, allowed: Array<UserRole | AdminRole>): boolean;
export declare function canPostAnnouncement(role: UserRole): boolean;
export declare function canApproveAnnouncement(role: AdminRole): boolean;
export declare function isRep(role: UserRole): boolean;
//# sourceMappingURL=role.helper.d.ts.map