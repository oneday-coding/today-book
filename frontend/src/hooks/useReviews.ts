// hooks/useReviews.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReview, postReview, deleteReview, patchReview } from '../api/reviews';

// 리뷰 조회
export const useGetReview = (isbn13: number) => {
  return useQuery({
    queryKey: ['reviews', isbn13],
    queryFn: () => getReview(isbn13),
    staleTime: 1000 * 60,
  });
};

// 리뷰 작성
export const usePostReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isbn13, content }: { isbn13: number; content: string }) =>
      postReview(isbn13, content),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.isbn13] });
    },
  });
};

// 리뷰 수정
export const usePatchReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isbn13, content }: { isbn13: number; content: string }) =>
      patchReview(isbn13, content),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.isbn13] });
    },
  });
};

// 리뷰 삭제
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isbn13: number) => deleteReview(isbn13),
    onSuccess: (_data, isbn13) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', isbn13] });
    },
  });
};
