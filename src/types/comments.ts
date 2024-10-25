export interface Comments {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null;
}

export interface CommentCreateRequest {
  content: string;
  article: number;
}

export interface CommentUpdateRequest {
  content: string;
}
