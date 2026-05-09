export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: PaginationMeta;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: Record<string, string[]>;
}

export interface PaginationMeta {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UploadResponse {
  url: string;
  publicId: string;
  mimeType: string;
  sizeBytes: number;
  originalName: string;
}

export interface SuccessResponse {
  success: true;
  message: string;
}

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalCourses: number;
  pendingClearance: number;
  unreadTickets: number;
  feeCollection: number;
  feeTarget: number;
}
