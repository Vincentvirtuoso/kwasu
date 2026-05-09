export enum UserRole {
  STUDENT = "student",
  CLASS_REP = "class-rep",
  ASSISTANT_REP = "assistant-rep",
}

export enum AdminRole {
  LECTURER = "lecturer",
  LEVEL_ADVISER = "level-adviser",
  EXAM_OFFICER = "exam-officer",
  BURSARY = "bursary",
  STUDENT_AFFAIRS = "student-affairs",
  HOSTEL_OFFICER = "hostel-officer",
  SUPER_ADMIN = "super-admin",
}

export type AnyRole = UserRole | AdminRole;
