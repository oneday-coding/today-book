import { useInfiniteQuery } from '@tanstack/react-query';
import { getBookSearch } from '../api/books';
import type { Book } from '../models/book.model';

export default function useBookSearch(keyword: string, limit: number = 10) {
  return useInfiniteQuery<
    Book[], // 각 페이지의 데이터
    Error // 에러 타입
  >({
    queryKey: ['search', keyword],
    queryFn: async ({ pageParam = 1 }) => {
      return await getBookSearch(keyword, pageParam as number, limit);
    },
    initialPageParam: 1, // 필수 추가
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length < limit || nextPage > 5 ? undefined : nextPage;
    },
    enabled: !!keyword,
    staleTime: 1000 * 60 * 5,
  });
}
