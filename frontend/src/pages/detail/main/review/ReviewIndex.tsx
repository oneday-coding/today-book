import { useParams } from 'react-router-dom';
import { useGetReview } from '../../../../hooks/useReviews';
import ReviewList from './ReviewList';
import ReviewWrite from './ReviewWrite';

export default function ReviewIndex() {
  const { isbn13 } = useParams();
  const { data: reviews = [] } = useGetReview(Number(isbn13));

  return (
    <div className="mt-[48px]">
      <div className="flex justify-between items-center mb-[16px]">
        <h3 className="text-[18px]">리뷰</h3>
        <p className="text- text-textGray">
          총 <span>{reviews.length}</span>개
        </p>
      </div>

      {/* 리뷰 작성 */}
      <ReviewWrite />

      {/* 리뷰 목록 */}
      <ReviewList />
    </div>
  );
}
