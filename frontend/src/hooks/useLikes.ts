// hooks/useLikes.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLikes, postLikes, deleteLikes } from '../api/likes';

// 찜 목록 조회
export const useGetLikes = () => {
  return useQuery({
    queryKey: ['likes'],
    queryFn: () => getLikes(),
    staleTime: 1000 * 60,
    retry: false, // 실패 시 자동 재시도 안 함
    refetchOnWindowFocus: false, // 창 다시 활성화 시 재요청 안 함
  });
};

// 찜 추가
export const usePostLikes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isbn13 }: { isbn13: number }) => postLikes(isbn13),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    },
  });
};

// 찜 삭제
export const useDeleteLikes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isbn13: number) => deleteLikes(isbn13),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    },
  });
};
