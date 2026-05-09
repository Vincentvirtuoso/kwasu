import type { ID, ISODate, AcademicLevel } from "../shared/primitives";
import type { AnnouncementStatus } from "../enums/status.enum";
import type { UserRole } from "../enums/roles.enum";
import type { UserSummary } from "./user.types";
import type { AdminUserSummary } from "./user.types";
export interface Announcement {
    id: ID;
    title: string;
    body: string;
    status: AnnouncementStatus;
    authorId: ID;
    author?: UserSummary;
    authorRole: UserRole;
    classLevel: AcademicLevel;
    departmentId: ID;
    rejectionReason?: string;
    reviewedById?: ID;
    reviewedBy?: AdminUserSummary;
    reviewedAt?: ISODate;
    publishedAt?: ISODate;
    createdAt: ISODate;
    updatedAt: ISODate;
}
export type AnnouncementSummary = Pick<Announcement, "id" | "title" | "status" | "authorId" | "classLevel" | "departmentId" | "publishedAt" | "createdAt">;
export interface WhatsAppLink {
    id: ID;
    label: string;
    url: string;
    classLevel: AcademicLevel;
    departmentId: ID;
    addedById: ID;
    addedBy?: UserSummary;
    createdAt: ISODate;
}
//# sourceMappingURL=announcement.types.d.ts.map