import type { ID, ISODate } from "../shared/primitives";
import type { AnyRole } from "../enums/roles.enum";

export interface AuditLog {
  id: ID;
  actorId: ID;
  actorRole: AnyRole;
  action: AuditAction;
  resource: string;
  resourceId?: ID;
  metadata?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
  createdAt: ISODate;
}

export type AuditAction =
  | "create"
  | "update"
  | "delete"
  | "login"
  | "logout"
  | "publish"
  | "approve"
  | "reject"
  | "upload"
  | "download"
  | "view";
