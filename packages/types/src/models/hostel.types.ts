import type { ID, ISODate, SessionStr } from "../shared/primitives";
import type { HostelGender } from "../enums/status.enum";

export interface HostelRoom {
  id: ID;
  block: string;
  roomNumber: string;
  capacity: number;
  occupied: number;
  gender: HostelGender;
  floor?: number;
  amenities?: string[];
  available: boolean;
}

export interface HostelAllocation {
  id: ID;
  studentId: ID;
  roomId: ID;
  room?: HostelRoom;
  session: SessionStr;
  allocatedAt: ISODate;
  revokedAt?: ISODate;
}

export interface HostelApplication {
  id: ID;
  studentId: ID;
  session: SessionStr;
  preference?: HostelGender;
  status: "pending" | "allocated" | "rejected";
  appliedAt: ISODate;
  processedAt?: ISODate;
}
