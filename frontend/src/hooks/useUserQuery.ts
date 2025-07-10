import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../api/login';

export default function useUserQuery() {
  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: getUserInfo,
    retry: false, // 실패 시 자동 재시도 안 함
    refetchOnWindowFocus: false, // 창 다시 활성화 시 재요청 안 함
    staleTime: 0, // 즉시 데이터 갱신 (페이지 이동 시마다 새로 요청)
    // staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
    refetchOnMount: true,
  });
}
