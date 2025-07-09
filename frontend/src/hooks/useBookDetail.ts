import { useQuery } from '@tanstack/react-query';
import { getBookDetail } from '../api/books';
import type { Book } from '../models/book.model';

export default function useBookDetail(isbn13: number) {
  // useQuery 사용 버전
  return useQuery({
    queryKey: ['book', 'detail', isbn13],
    queryFn: async () => {
      const result = await getBookDetail(isbn13);
      return result[0] as Book; // API 응답이 배열이므로 첫 번째 요소 반환
    },
    enabled: !!isbn13, // isbn13이 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
    retry: false, // 실패 시 자동 재시도 안 함
    refetchOnWindowFocus: false, // 창 다시 활성화 시 재요청 안 함
  });

  // useState, useEffect 사용 버전전
  // const [bookData, setBookData] = useState<Book | null>(null);;
  // const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   getBookDetail(isbn13)
  //     .then((result) => {
  //       setBookData(result[0])
  //     })
  //     .catch((error) => setError(error));
  // }, []);
  // return { bookData, error };
}
