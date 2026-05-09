import type { SemesterValue, AcademicLevel } from "../shared/primitives";
import type { TicketCategory } from "../enums/status.enum";

export interface LoginRequest {
  matricNo: string;
  password: string;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
}

export interface RegisterCoursesRequest {
  courseIds: string[];
}

export interface UploadMaterialRequest {
  courseId: string;
  title: string;
  description?: string;
}

export interface CreateAssignmentRequest {
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore?: number;
}

export interface SubmitAssignmentRequest {
  textContent?: string;
  fileUrl?: string;
}

export interface GradeSubmissionRequest {
  score: number;
  feedback?: string;
}

export interface CreateAnnouncementRequest {
  title: string;
  body: string;
  classLevel: AcademicLevel;
  departmentId: string;
}

export interface ReviewAnnouncementRequest {
  action: "approve" | "reject";
  rejectionReason?: string;
}

export interface CreateWhatsAppLinkRequest {
  label: string;
  url: string;
  classLevel: AcademicLevel;
  departmentId: string;
}

export interface UploadTimetableRequest {
  session: string;
  semester: SemesterValue;
  departmentId: string;
  level: AcademicLevel;
}

export interface PublishResultsRequest {
  session: string;
  semester: SemesterValue;
}

export interface SubmitRatingRequest {
  courseId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  session: string;
  semester: SemesterValue;
}

export interface CreateTicketRequest {
  subject: string;
  body: string;
  category: TicketCategory;
  priority?: "low" | "medium" | "high";
}

export interface RespondToTicketRequest {
  body: string;
  attachments?: string[];
}

export interface CastVoteRequest {
  candidateId: string;
}

export interface ProgrammeChangeRequest {
  targetDepartmentId: string;
  targetFacultyId: string;
  reason: string;
}

export interface CreateNewsArticleRequest {
  title: string;
  excerpt: string;
  body: string;
  category: string;
  coverImage?: string;
  tags?: string[];
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface DateRangeParams {
  from?: string;
  to?: string;
}

export type ListParams = PaginationParams & SortParams & DateRangeParams;
