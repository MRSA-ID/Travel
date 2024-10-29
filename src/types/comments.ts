import { Users } from "./users";

export interface Comments {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null;
  article?: articleCommentType;
  user?: Users;
}

export type articleCommentType = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null;
};

export interface CommentCreateRequest {
  content: string;
  article: number | null;
}

export interface CommentUpdateRequest {
  content: string;
}
