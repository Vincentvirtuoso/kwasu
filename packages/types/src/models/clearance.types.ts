import type { ID, ISODate, SessionStr } from "../shared/primitives";
import type { ClearanceStatus } from "../enums/status.enum";

export interface ClearanceDepartment {
  name: string;
  cleared: boolean;
  clearedAt?: ISODate;
  comments?: string;
}

export interface Clearance {
  id: ID;
  studentId: ID;
  session: SessionStr;
  status: ClearanceStatus;
  departments: ClearanceDepartment[];
  comments?: string;
  approvedAt?: ISODate;
  createdAt: ISODate;
  updatedAt: ISODate;
}
