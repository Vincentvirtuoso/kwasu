import type { ID, ISODate } from "../shared/primitives";
import type { ElectionStatus } from "../enums/status.enum";
import type { UserSummary } from "./user.types";

export interface Election {
  id: ID;
  title: string;
  description?: string;
  status: ElectionStatus;
  startDate: ISODate;
  endDate: ISODate;
  candidates: Candidate[];
  totalVotes?: number;
  hasVoted?: boolean;
  createdAt: ISODate;
}

export interface Candidate {
  id: ID;
  electionId: ID;
  studentId: ID;
  student?: UserSummary;
  position: string;
  manifesto?: string;
  photoUrl?: string;
  voteCount?: number;
}

export interface ElectionVote {
  id: ID;
  electionId: ID;
  voterId: ID;
  candidateId: ID;
  votedAt: ISODate;
}

export interface ElectionResult {
  election: Election;
  candidates: Array<Candidate & { voteCount: number; percentage: number }>;
  winner?: Candidate;
  totalVotes: number;
}
