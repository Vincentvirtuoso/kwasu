import type {
  ID,
  ISODate,
  CourseCode,
  SemesterValue,
  AcademicLevel,
  SessionStr,
  Weekday,
} from "../shared/primitives";

export interface TimetableEntry {
  id: ID;
  courseId: ID;
  courseCode: CourseCode;
  courseTitle: string;
  lecturerName: string;
  venue: string;
  day: Weekday;
  startTime: string;
  endTime: string;
  level: AcademicLevel;
  departmentId: ID;
  session: SessionStr;
  semester: SemesterValue;
  createdAt: ISODate;
}

export interface PersonalTimetable {
  studentId: ID;
  session: SessionStr;
  semester: SemesterValue;
  generatedAt: ISODate;
  entries: TimetableEntry[];
  clashes: TimetableClash[];
}

export interface TimetableClash {
  entryA: TimetableEntry;
  entryB: TimetableEntry;
  day: Weekday;
}

export type TimetableByDay = Record<Weekday, TimetableEntry[]>;
