import type { ID, ISODate } from "../shared/primitives";
import type { TicketStatus, TicketCategory } from "../enums/status.enum";
import type { UserSummary } from "./user.types";
import type { AdminUserSummary } from "./user.types";
export interface Ticket {
    id: ID;
    studentId: ID;
    student?: UserSummary;
    subject: string;
    body: string;
    status: TicketStatus;
    category: TicketCategory;
    priority: "low" | "medium" | "high";
    responses: TicketResponse[];
    createdAt: ISODate;
    updatedAt: ISODate;
    resolvedAt?: ISODate;
}
export interface TicketResponse {
    id: ID;
    ticketId: ID;
    responderId: ID;
    responder?: UserSummary | AdminUserSummary;
    body: string;
    isStaff: boolean;
    attachments?: string[];
    createdAt: ISODate;
}
export interface CreateTicketPayload {
    subject: string;
    body: string;
    category: TicketCategory;
    priority?: "low" | "medium" | "high";
}
//# sourceMappingURL=ticket.types.d.ts.map