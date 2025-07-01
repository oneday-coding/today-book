import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../api/login';

export default function useUserQuery() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => getMyInfo(),
    retry: false, // 실패 시 자동 재시도 안 함
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
    refetchOnWindowFocus: false, // 창 다시 활성화 시 재요청 안 함
  });
}
