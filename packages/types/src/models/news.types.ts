import type { ID, ISODate } from "../shared/primitives";
import type { AdminUserSummary } from "./user.types";

export type NewsCategory =
  | "university"
  | "academics"
  | "research"
  | "innovation"
  | "sports"
  | "leadership"
  | "events"
  | "alumni";

export interface NewsArticle {
  id: ID;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  category: NewsCategory;
  tags?: string[];
  authorId: ID;
  author?: AdminUserSummary;
  published: boolean;
  publishedAt?: ISODate;
  readTimeMinutes: number;
  createdAt: ISODate;
  updatedAt: ISODate;
}

export type NewsArticleSummary = Omit<NewsArticle, "body">;

export interface BlogPost extends NewsArticle {
  isStudentAuthored: boolean;
}
