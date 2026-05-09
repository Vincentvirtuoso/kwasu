import type { ID, ISODate } from "../shared/primitives";

export type ProgrammeChangeStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected";

export interface ProgrammeChangeRequestBase {
  id: ID;
  studentId: ID;
  currentDepartmentId: ID;
  currentDepartment?: string;
  currentFacultyId: ID;
  currentFaculty?: string;
  targetDepartmentId: ID;
  targetDepartment?: string;
  targetFacultyId: ID;
  targetFaculty?: string;
  reason: string;
  status: ProgrammeChangeStatus;
  rejectionReason?: string;
  reviewedById?: ID;
  reviewedAt?: ISODate;
  createdAt: ISODate;
  updatedAt: ISODate;
}
