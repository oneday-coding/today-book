import { useInfiniteQuery } from '@tanstack/react-query';
import type { Book } from '../models/book.model';
import { getBookList } from '../api/books';

export default function useBookList(type: string, limit: number = 10) {
  return useInfiniteQuery<
    Book[], // 각 페이지의 데이터
    Error // 에러 타입
  >({
    queryKey: ['books', type, limit],
    queryFn: async ({ pageParam = 1 }) => {
      return await getBookList(type, pageParam as number, limit);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // 5페이지 초과 시 요청 중단 (원래는 이런걸 안쓰는게 맞지만, 알라딘 api에서 100개 넘어가면 첫번째꺼부터 다시 보여줌)
      if (nextPage > 5 || lastPage.length < limit) return undefined;

      return lastPage.length < limit || nextPage > 5 ? undefined : nextPage;
    },
    enabled: !!type,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
