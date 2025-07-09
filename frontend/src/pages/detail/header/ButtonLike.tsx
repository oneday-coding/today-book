import { useState } from 'react';
import useUserQuery from '../../../hooks/useUserQuery';
import { usePostLikes, useDeleteLikes } from '../../../hooks/useLikes';
import LoginRequireModal from '../../../components/LoginRequireModal';
import useBookDetail from '../../../hooks/useBookDetail';

interface ButtonLikeProps {
  isbn13: number;
}

export default function ButtonLike({ isbn13 }: ButtonLikeProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 로그인 상태 확인
  const { data: userInfo, isError: userError } = useUserQuery();

  // 좋아요 상태 확인
  const { data: bookData, isError: bookError } = useBookDetail(Number(isbn13));
  const isLiked = bookData?.isLiked;

  // 좋아요 추가/삭제 뮤테이션
  const { mutate: postLike } = usePostLikes();
  const { mutate: deleteLike } = useDeleteLikes();

  function toggleLikes() {
    // 로그인하지 않은 경우 또는 로그인 실패한 경우 로그인 모달 표시
    if (!userInfo || userError) {
      setShowLoginModal(true);
      return;
    }

    // 로그인된 경우 좋아요 토글
    if (isLiked) {
      // 이미 좋아요가 되어있으면 삭제
      deleteLike(isbn13, {
        onSuccess: () => {
          console.log('좋아요 삭제 성공');
        },
        onError: () => {
          console.log('좋아요 삭제 실패');
        },
      });
    } else {
      // 좋아요가 안되어있으면 추가
      postLike(
        { isbn13 },
        {
          onSuccess: () => {
            console.log('좋아요 추가 성공');
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
        className="bg-100 w-[32px] h-[32px] shrink-0"
        style={{
          backgroundImage:
            shouldShowLoginModal || !isLiked
              ? "url('/icons/button/heart.svg')"
              : "url('/icons/button/heart_filled.svg')",
        }}
        onClick={toggleLikes}
      >
        <span className="sr-only">찜 버튼</span>
      </button>

      {showLoginModal && <LoginRequireModal onCancel={() => setShowLoginModal(false)} />}
    </>
  );
}
