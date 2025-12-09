export interface Book {
  title: string;
  author: string;
  description: string;
  relevance: string;
  isbn?: string;
  publishedYear?: string;
  category?: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  SEARCHING = 'SEARCHING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface SearchError {
  message: string;
}
