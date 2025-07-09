export interface Book {
  isbn13: number;
  cover: string;
  title: string;
  author: string;
  publisher: string;
  description: string;
  isLiked?: boolean;
}
