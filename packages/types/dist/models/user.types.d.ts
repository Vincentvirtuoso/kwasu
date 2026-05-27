import type { ID, ISODate, MatricNo, AcademicLevel, SessionStr } from "../shared/primitives";
import type { UserRole, AdminRole } from "../enums/roles.enum";
export interface Faculty {
    id: ID;
    name: string;
    code: string;
    createdAt: ISODate;
}
export interface Department {
    id: ID;
    name: string;
    code: string;
    facultyId: ID;
    faculty?: Faculty;
}
export interface User {
    id: ID;
    matricNo: MatricNo;
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    phone?: string;
    passwordHash: string;
    avatarUrl?: string;
    role: UserRole;
    level: AcademicLevel;
    session: SessionStr;
    departmentId: ID;
    department?: Department;
    facultyId: ID;
    faculty?: Faculty;
    isActive: boolean;
    createdAt: ISODate;
    updatedAt: ISODate;
}
export type UserSummary = Pick<User, "id" | "firstName" | "lastName" | "matricNo" | "avatarUrl" | "role" | "level">;
export interface AdminUser {
    id: ID;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    role: AdminRole;
    staffId: string;
    departmentId?: ID;
    department?: Department;
    isActive: boolean;
    createdAt: ISODate;
    updatedAt: ISODate;
}
export type AdminUserSummary = Pick<AdminUser, "id" | "firstName" | "lastName" | "staffId" | "avatarUrl" | "role">;
export interface UpdateProfilePayload {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    phone?: string;
    avatarUrl?: string;
}
export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export interface NotificationPreferences {
    userId: ID;
    academic: boolean;
    finance: boolean;
    announcements: boolean;
    services: boolean;
    elections: boolean;
    pushEnabled: boolean;
    emailEnabled: boolean;
}
//# sourceMappingURL=user.types.d.ts.map