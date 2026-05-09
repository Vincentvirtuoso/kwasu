import type { ID, ISODate } from "../shared/primitives";
import type { NotificationEvent } from "../enums/notification.enum";

export interface Notification {
  id: ID;
  recipientId: ID;
  event: NotificationEvent;
  title: string;
  body: string;
  metadata?: NotificationMetadata;
  read: boolean;
  readAt?: ISODate;
  createdAt: ISODate;
}

export type NotificationMetadata =
  | MaterialUploadedMeta
  | AssignmentPostedMeta
  | ResultPublishedMeta
  | AnnouncementMeta
  | FeeMeta
  | TicketMeta
  | GenericMeta;

export interface MaterialUploadedMeta {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  materialId: string;
  title: string;
}

export interface AssignmentPostedMeta {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  assignmentId: string;
  title: string;
  dueDate: string;
}

export interface ResultPublishedMeta {
  session: string;
  semester: string;
}

export interface AnnouncementMeta {
  announcementId: string;
  title: string;
  reason?: string;
}

export interface FeeMeta {
  invoiceId: string;
  amount: number;
  dueDate?: string;
}

export interface TicketMeta {
  ticketId: string;
  subject: string;
  status: string;
}

export interface GenericMeta {
  [key: string]: unknown;
}
