import type { ID, ISODate, SessionStr } from "../shared/primitives";
import type { SiwesStatus } from "../enums/status.enum";

export interface SiwesRecord {
  id: ID;
  studentId: ID;
  session: SessionStr;
  companyName?: string;
  companyAddress?: string;
  supervisorName?: string;
  supervisorPhone?: string;
  supervisorEmail?: string;
  status: SiwesStatus;
  startDate?: ISODate;
  endDate?: ISODate;
  reportUrl?: string;
  itfFormUrl?: string;
  comments?: string;
  createdAt: ISODate;
  updatedAt: ISODate;
}

export interface SiwesLogEntry {
  id: ID;
  siwesId: ID;
  date: ISODate;
  activities: string;
  createdAt: ISODate;
}
