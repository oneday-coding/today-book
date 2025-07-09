import { useState } from 'react';
import { useDeleteReview, useGetReview, usePutReview } from '../../../../hooks/useReviews';
import type { Review } from '../../../../models/review.model';
import { useParams } from 'react-router-dom';

export default function ReviewList() {
  // 임시 데이터
  // const [reviews, setReviews] = useState<Review[]>([
  //   {
  //     id: 1,
  //     name: '홍길동',
  //     content: '이 책은 정말 좋아요!',
  //     date: '2025-01-01',
  //     image: '',
  //   },
  //   {
  //     id: 2,
  //     name: '김보민',
  //     content: '어느날 소년이 시골에서 이상한 생물체를 마주하게 되는데...',
  //     date: '2025-01-01',
  //     image: '',
  //   },
  // ]);

  const putReview = usePutReview();
  const deleteReview = useDeleteReview();
  const { isbn13 } = useParams();
  console.log(isbn13);
  const { data: reviews = [], isLoading, isError } = useGetReview(Number(isbn13));
  console.log('reviews: ', reviews);
  const [showAll, setShowAll] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState('');

  // const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  if (isLoading) return <p>리뷰 불러오는 중...</p>;
  if (isError) return <p>리뷰 불러오는 중 오류가 발생했습니다.</p>;

  const handleEdit = (id: number, currentContent: string) => {
    setEditingId(id);
    setEditedContent(currentContent);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContent('');
  };

  // 리뷰 수정
  const handleSave = () => {
    putReview.mutate({ isbn13: Number(isbn13), content: editedContent });
    setEditingId(null);
    setEditedContent('');
  };

  const handleDelete = () => {
    deleteReview.mutate(Number(isbn13));
  };

  return (
    <div>
      {reviews.map((review: Review) => (
        <div
          key={review.id}
          className="space-y-4 p-[16px] mb-[24px] shadow-[inset_0_-1px_2px_-1px_rgba(0,0,0,0.1)]"
        >
          <div className="flex items-center justify-between mb-[8px]">
            <div className="flex items-center">
              <img
                className="w-[40px] h-[40px] rounded-full mr-[8px]"
                src={review.image || '/imgs/user_dummy_review.png'}
                alt={`${review.name}의 프로필`}
              />
              <p className="text-[14px] text-mainBlack">{review.name}</p>
            </div>
            <div className="text-[12px] text-gray-500 space-x-2 flex items-center gap-[8px]">
              {editingId === review.id ? (
                <>
                  <button onClick={() => handleSave()} className="text-blue-600 flex items-center">
                    <img src="/icons/actions/complete.svg" alt="완료" className="w-4 h-4" />
                    완료
                  </button>
                  <button onClick={handleCancel} className="text-gray-600 flex items-center">
                    <img src="/icons/actions/cancel.svg" alt="취소" className="w-4 h-4" />
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(review.id, review.content)}
                    className="text-gray-600 flex items-center"
                  >
                    <img src="/icons/actions/edit.svg" alt="수정" className="w-4 h-4" />
                    수정
                  </button>
                  <button onClick={() => handleDelete()} className="flex items-center">
                    <img src="/icons/actions/delete.svg" alt="삭제" className="w-4 h-4" />
                    삭제
                  </button>
                </>
              )}
            </div>
          </div>

          {editingId === review.id ? (
            <textarea
              className="w-full h-[100px] p-2 border border-gray-300 rounded-md"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <p className="text-[14px] mb-[8px]">{review.content}</p>
          )}
          <p className="mt-2 text-textGray text-xs">작성일: {review.date}</p>
        </div>
      ))}

      {!showAll && reviews.length > 2 && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full h-[38px] rounded-lg border-[1px] border-[#E5E7EB]"
        >
          전체 리뷰 보기
        </button>
      )}
    </div>
  );
}
