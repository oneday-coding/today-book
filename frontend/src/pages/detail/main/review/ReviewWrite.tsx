import { useState } from 'react';
import { usePostReview } from '../../../../hooks/useReviews';
import { useParams } from 'react-router-dom';
import LoginRequiredModal from '../../../../components/modals/LoginRequireModal';
import AlertModal from '../../../../components/modals/alertModal';
import type { AxiosError } from 'axios';

export default function ReviewWrite() {
  const { isbn13 } = useParams();
  if (!isbn13) return <div>책 정보를 찾을 수 없습니다.</div>;

  const { mutate: postReview, isPending } = usePostReview();
  const maxTextLength = 100;
  const [text, setText] = useState<string>('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showDepleReviewAlertModal, setShowDepleReviewAlertModal] = useState(false);

  function limitTextLength(text: string) {
    if (text.length > maxTextLength) {
      setText(text.slice(0, maxTextLength));
      return;
    }
    setText(text);
  }

  // 리뷰 작성
  function addReview() {
    if (text.trim() === '') {
      setShowAlertModal(true);
      return;
    }
    postReview(
      { isbn13: Number(isbn13), content: text },
      {
        onSuccess: () => {
          setText('');
          console.log('리뷰 작성 성공');
        },
        onError: (error) => {
          const axiosError = error as AxiosError;
          console.log('리뷰 작성 실패: ', error);
          if (axiosError?.response?.status === 409) {
            console.log('한 사람당, 리뷰 1개 등록 가능 => 이미 리뷰 등록했음');
            setShowDepleReviewAlertModal(true);
          } else {
            // 그 외 에러 => 로그인 확인 팝업 띄우기
            setShowLoginModal(true);
          }
        },
      }
    );
  }

  return (
    <div>
      {/* 리뷰 작성 */}
      <div className="p-[16px] bg-cardBg rounded-md mb-[24px]">
        <textarea
          className="w-full h-[100px] p-[13px] border border-gray-300 bg-white rounded-md"
          placeholder="이 책에 대한 리뷰를 작성해주세요."
          value={text}
          onChange={(e) => limitTextLength(e.target.value)}
        ></textarea>
        <div className="text-textGray text-xs flex justify-between items-center mt-[8px]">
          <p>
            <span>{text.length}</span> / {maxTextLength}
          </p>
          <button
            className={`text-sm mt-[8px] bg-mainBlue text-white px-[16px] py-[8px] rounded-[8px]
              ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={addReview}
            disabled={isPending}
          >
            {isPending ? '리뷰 작성 중...' : '리뷰 작성'}
          </button>
        </div>
        {showLoginModal && <LoginRequiredModal onCancel={() => setShowLoginModal(false)} />}
        {showAlertModal && (
          <AlertModal
            message="한 글자 이상 입력해주세요."
            onConfirm={() => setShowAlertModal(false)}
          />
        )}
        {showDepleReviewAlertModal && (
          <AlertModal
            message="이미 리뷰를 작성하셨습니다."
            onConfirm={() => setShowDepleReviewAlertModal(false)}
          />
        )}
      </div>
    </div>
  );
}
