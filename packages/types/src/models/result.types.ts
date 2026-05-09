import type {
  ID,
  ISODate,
  SemesterValue,
  SessionStr,
  CourseCode,
} from "../shared/primitives";
import type { Grade } from "../enums/status.enum";

export interface CourseResult {
  id: ID;
  studentId: ID;
  courseId: ID;
  courseCode: CourseCode;
  courseTitle: string;
  creditUnits: number;
  score: number;
  grade: Grade;
  gradePoint: number;
  semester: SemesterValue;
  session: SessionStr;
  publishedAt: ISODate;
}

export interface SemesterSummary {
  studentId: ID;
  session: SessionStr;
  semester: SemesterValue;
  gpa: number;
  totalUnits: number;
  totalPoints: number;
  results: CourseResult[];
}

export interface AcademicRecord {
  studentId: ID;
  cgpa: number;
  classOfDegree: string;
  totalUnitsEarned: number;
  semesters: SemesterSummary[];
}

export interface Transcript {
  student: {
    matricNo: string;
    fullName: string;
    department: string;
    faculty: string;
    level: number;
    session: string;
  };
  record: AcademicRecord;
  issuedAt: ISODate;
}
