import type { ID, ISODate, SessionStr } from "../shared/primitives";

export type CalendarEventType =
  | "registration"
  | "exam"
  | "result"
  | "holiday"
  | "resumption"
  | "convocation"
  | "other";

export interface AcademicCalendarEvent {
  id: ID;
  title: string;
  description?: string;
  type: CalendarEventType;
  startDate: ISODate;
  endDate: ISODate;
  session: SessionStr;
  allDay: boolean;
  createdAt: ISODate;
}

export interface AcademicSession {
  id: ID;
  label: SessionStr;
  isCurrent: boolean;
  startDate: ISODate;
  endDate: ISODate;
}
