export enum AnnouncementStatus {
  DRAFT = "draft",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum ClearanceStatus {
  NOT_APPLIED = "not-applied",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum SiwesStatus {
  NOT_STARTED = "not-started",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum TicketStatus {
  OPEN = "open",
  IN_PROGRESS = "in-progress",
  RESOLVED = "resolved",
  CLOSED = "closed",
}

export enum TicketCategory {
  ACADEMIC = "academic",
  FINANCE = "finance",
  HOSTEL = "hostel",
  PORTAL = "portal",
  SIWES = "siwes",
  CLEARANCE = "clearance",
  OTHER = "other",
}

export enum ElectionStatus {
  UPCOMING = "upcoming",
  OPEN = "open",
  CLOSED = "closed",
  RESULTS = "results",
}

export enum PaymentStatus {
  UNPAID = "unpaid",
  PARTIAL = "partial",
  PAID = "paid",
}

export enum PaymentGateway {
  REMITA = "remita",
  PAYSTACK = "paystack",
  FLUTTERWAVE = "flutterwave",
}

export enum TransactionStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

export enum HostelGender {
  MALE = "male",
  FEMALE = "female",
  MIXED = "mixed",
}

export enum MaterialType {
  PDF = "pdf",
  DOC = "doc",
  PPT = "ppt",
  VIDEO = "video",
  IMAGE = "image",
  OTHER = "other",
}

export enum Semester {
  FIRST = "first",
  SECOND = "second",
}

export enum Grade {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}
