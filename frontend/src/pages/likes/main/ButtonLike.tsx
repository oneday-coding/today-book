import { useState } from 'react';
import ConfirmModal from '../../../components/ConfirmModal';
import { useDeleteLikes } from '../../../hooks/useLikes';
import Toast from '../../../components/Toast';

interface ButtonLikeProps {
  isbn13: number;
}

export default function ButtonLike({ isbn13 }: ButtonLikeProps) {
  const [showModal, setShowModal] = useState(false);
  const { mutate: deleteLikes } = useDeleteLikes();
  const [showToast, setShowToast] = useState(false);

  function removeLike() {
    console.log('removeLike');
    setShowModal(false);

    deleteLikes(isbn13, {
      onSuccess: () => {
        console.log('좋아요 삭제 성공');
        setShowToast(true);
      },
      onError: (error) => {
        console.error('좋아요 삭제 실패:', error);
        // 에러 시 추가 처리 (예: 에러 메시지 표시)
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
      {showToast && <Toast message="찜 목록 삭제 성공" onClose={() => setShowToast(false)} />}
    </>
  );
}
