import { useState } from 'react';
import { usePostReview } from '../../../../hooks/useReviews';
import { useParams } from 'react-router-dom';
import LoginRequiredModal from '../../../../components/LoginRequireModal';

export default function ReviewWrite() {
  const { isbn13 } = useParams();
  const { mutate: postReview } = usePostReview();
  const maxTextLength = 500;
  const [text, setText] = useState<string>('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  function limitTextLength(text: string) {
    if (text.length > maxTextLength) {
      setText(text.slice(0, maxTextLength));
      return;
    }
    setText(text);
  }

  // 리뷰 작성
  async function addReview() {
    postReview(
      { isbn13: Number(isbn13), content: text },
      {
        onSuccess: () => {
          setText('');
          console.log('리뷰 작성 성공');
        },
        onError: () => {
          console.log('리뷰 작성 실패');
          setShowLoginModal(true);
        },
      }
    );
  }

  return (
    <div>
      {/* 리뷰 작성 */}
      <div className="p-[16px] bg-cardBg rounded-md mb-[24px]">
        <textarea
          className="w-full h-[100px] p-[12px] border border-gray-300 rounded-md text-sm"
          placeholder="이 책에 대한 리뷰를 작성해주세요."
          value={text}
          onChange={(e) => limitTextLength(e.target.value)}
        ></textarea>
        <div className="text-textGray text-xs flex justify-between items-center mt-[8px]">
          <p>
            <span>{text.length}</span> / {maxTextLength}
          </p>
          <button
            className="text-sm mt-[8px] bg-mainBlue text-white px-[16px] py-[8px] rounded-[8px]"
            onClick={addReview}
          >
            리뷰 작성
          </button>
        </div>
        {showLoginModal && <LoginRequiredModal onCancel={() => setShowLoginModal(false)} />}
      </div>
    </div>
  );
}
