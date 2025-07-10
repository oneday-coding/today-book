import { useState } from 'react';
import { useDeleteReview, useGetReview, usePatchReview } from '../../../../hooks/useReviews';
import type { Review } from '../../../../models/review.model';
import { useParams } from 'react-router-dom';
import useUserQuery from '../../../../hooks/useUserQuery';
import dayjs from 'dayjs';

export default function ReviewList() {
  const { isbn13 } = useParams();
  // 리뷰 데이터
  const { data: reviews = [], isLoading, isError } = useGetReview(Number(isbn13));
  const patchReview = usePatchReview();
  const deleteReview = useDeleteReview();
  const [showAll, setShowAll] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState('');
  // 유저 데이터
  const { data: userData, isError: userError } = useUserQuery();

  if (isLoading) return <p className="error-message">리뷰 불러오는 중...</p>;
  if (isError) return <p className="error-message">리뷰 불러오는 중 오류가 발생했습니다.</p>;
  if (reviews.length === 0) return <p className="error-message">리뷰가 없습니다.</p>;

  const handleEdit = (id: number, currentContent: string) => {
    setEditingId(id);
    setEditedContent(currentContent);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContent('');
  };

  const handleSave = () => {
    patchReview.mutate({ isbn13: Number(isbn13), content: editedContent });
    setEditingId(null);
    setEditedContent('');
  };

  const handleDelete = () => {
    deleteReview.mutate(Number(isbn13));
  };

  // 날짜 포맷팅
  function formatDate(date: string) {
    return dayjs(date).format('YYYY.MM.DD HH:mm');
  }

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div>
      {displayedReviews.map((review: Review) => (
        <div
          key={review.id}
          className="space-y-4 p-[16px] mb-[24px] shadow-[inset_0_-1px_2px_-1px_rgba(0,0,0,0.1)]"
        >
          <div className="flex items-center justify-between mb-[8px]">
            <div className="flex items-center">
              <img
                className="w-[40px] h-[40px] rounded-full mr-[8px]"
                src={review.user.image || '/imgs/user_dummy_review.png'}
                alt={`${review.user.nickname}의 프로필`}
              />
              <p className="text-[14px] text-mainBlack">{review.user.nickname}</p>
            </div>

            {/* 리뷰 수정 */}
            {!userError && review.user.id === userData?.id && (
              <div className="text-[12px] text-gray-500 space-x-2 flex items-center gap-[8px]">
                {editingId === review.id ? (
                  <>
                    <button
                      onClick={() => handleSave()}
                      className="text-blue-600 flex items-center"
                    >
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
            )}
          </div>

          {editingId === review.id ? (
            <textarea
              className="w-full h-[100px] p-[16px] border border-gray-300 rounded-md"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <p className="text-[14px] mb-[8px]">{review.content}</p>
          )}
          <p className="mt-2 text-textGray text-xs">작성일: {formatDate(review.createdAt)}</p>
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
