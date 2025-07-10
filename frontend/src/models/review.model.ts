export interface Review {
  id: number;
  bookIsbn13: string;
  content: string;
  createdAt: string;
  user: User;
}

interface User {
  id: string;
  nickname: string;
  image: string;
}
