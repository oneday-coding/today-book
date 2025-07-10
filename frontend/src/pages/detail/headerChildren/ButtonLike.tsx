import { useState } from 'react';
import useUserQuery from '../../../hooks/useUserQuery';
import { usePostLikes, useDeleteLikes } from '../../../hooks/useLikes';
import LoginRequireModal from '../../../components/modals/LoginRequireModal';
import useBookDetail from '../../../hooks/useBookDetail';
import { useQueryClient } from '@tanstack/react-query';

interface ButtonLikeProps {
  isbn13: number;
}

export default function ButtonLike({ isbn13 }: ButtonLikeProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { data: userInfo, isError: userError } = useUserQuery();
  const { data: bookData, isError: bookError } = useBookDetail(Number(isbn13));
  const queryClient = useQueryClient();
  const { mutate: postLike, isPending: isPostingLike } = usePostLikes();
  const { mutate: deleteLike, isPending: isDeletingLike } = useDeleteLikes();

  function toggleLikes() {
    if (!userInfo || userError) {
      setShowLoginModal(true);
      return;
    }
    if (bookData?.isLiked) {
      deleteLike(isbn13, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['books', Number(isbn13)] });
        },
        onError: () => {
          console.log('좋아요 삭제 실패');
        },
      });
    } else {
      postLike(
        { isbn13 },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books', Number(isbn13)] });
          },
          onError: () => {
            console.log('좋아요 추가 실패');
          },
        }
      );
    }
  }

  // 로그인 실패하거나 좋아요 조회 실패한 경우 빈 하트 아이콘 표시 (클릭 시 로그인 모달)
  const shouldShowLoginModal = !userInfo || userError || bookError;

  return (
    <>
      <button
        type="button"
        className="bg-100 w-[32px] h-[32px] shrink-0 ml-auto"
        style={{
          backgroundImage:
            shouldShowLoginModal || !bookData?.isLiked
              ? "url('/icons/button/heart.svg')"
              : "url('/icons/button/heart_filled.svg')",
        }}
        onClick={toggleLikes}
        disabled={isPostingLike || isDeletingLike}
      >
        <span className="sr-only">찜 버튼</span>
      </button>
      {showLoginModal && <LoginRequireModal onCancel={() => setShowLoginModal(false)} />}
    </>
  );
}
