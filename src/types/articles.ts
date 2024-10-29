import { Users } from "@/types/users";
import { Category } from "@/types/category";

export interface RequestArticle {
  title: string;
  description: string;
  cover_image_url: string;
  category: number | null;
}

export interface ArticlesList {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null;
  user: Users;
  category: Category | null;
  comments: CommentsType;
  localizations: [unknown];
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null;
  comments?: CommentsType;
  category: Category;
  user?: Users;
}

export type CommentsType = CommentType[] | [];

type CommentType = {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null;
  user?: Users;
};
