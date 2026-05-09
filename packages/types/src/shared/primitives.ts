export type ID = string;
export type ISODate = string;
export type MatricNo = string;
export type StaffID = string;
export type CourseCode = string;
export type SessionStr = string;

export type SemesterValue = "first" | "second";

export type AcademicLevel = 100 | 200 | 300 | 400 | 500;

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export interface UploadedFile {
  url: string;
  publicId: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface Timestamps {
  createdAt: ISODate;
  updatedAt: ISODate;
}

export interface SoftDeletable extends Timestamps {
  deletedAt?: ISODate;
}
