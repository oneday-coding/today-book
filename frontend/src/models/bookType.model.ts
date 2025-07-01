export type BookType = 'today' | 'new' | 'best';

export const bookTypeMap: Record<BookType, string> = {
  today: "오늘의 책",
  new: "신간 도서",
  best: "베스트 셀러",
};