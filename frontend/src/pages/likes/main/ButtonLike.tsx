import { useState } from 'react';
import ConfirmModal from '../../../components/modals/ConfirmModal';
import { useDeleteLikes } from '../../../hooks/useLikes';
import Toast from '../../../components/modals/Toast';
import { useQueryClient } from '@tanstack/react-query';

interface ButtonLikeProps {
  isbn13: number;
}

export default function ButtonLike({ isbn13 }: ButtonLikeProps) {
  const [showModal, setShowModal] = useState(false);
  const { mutate: deleteLikes } = useDeleteLikes();
  const [showToast, setShowToast] = useState(false);
  const queryClient = useQueryClient();

  function removeLike() {
    setShowModal(false);

    deleteLikes(isbn13, {
      onSuccess: () => {
        setShowToast(true);
        queryClient.invalidateQueries({ queryKey: ['likes', 'me'] }); // 1. 찜 목록 쿼리 캐시 무효화
        queryClient.invalidateQueries({ queryKey: ['books', isbn13] }); // 2. 해당 책 상세 쿼리 캐시 무효화 (key는 실제 상세조회에 쓰는 key와 맞춰야 함)
      },
      onError: (error) => {
        console.error('좋아요 삭제 실패:', error);
        alert('좋아요 삭제에 실패했습니다. 다시 시도해주세요.');
      },
    });
  }

  return (
    <>
      <button
        className="absolute top-[8px] right-[8px] w-[19%] aspect-square bg-100 rounded-full bg-white"
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
        style={{ backgroundImage: "url('/icons/button/heart_filled.svg')" }}
      >
        <span className="sr-only">찜 버튼</span>
      </button>
      {showModal && (
        <ConfirmModal
          title="찜 목록에서 삭제"
          message="선택한 도서를 찜 목록에서 삭제하시겠습니까?"
          onConfirm={removeLike}
          onCancel={() => setShowModal(false)}
        />
      )}
      {showToast && (
        <Toast
          message="찜 목록 삭제 성공"
          onClose={() => setShowToast(false)}
          duration={3000}
          fadeDuration={600}
        />
      )}
    </>
  );
}
