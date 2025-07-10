import Loading from '../../../components/Loading';
import { useGetLikes } from '../../../hooks/useLikes';
import BookLiked from './BookLiked';
import type { Book } from '../../../models/book.model';
import useUserQuery from '../../../hooks/useUserQuery';
import LoginRequiredModal from '../../../components/modals/LoginRequireModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Like {
  book: Book;
  bookIsbn13: string;
  id: number;
  userId: string;
}

export default function LikeMainIndex() {
  const navigate = useNavigate();
  const { isError: userError } = useUserQuery();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { data: likes, isLoading, isError } = useGetLikes();
  // 훅은 무조건 컴포넌트 최상단에서 호출 => 조건부 뒤에 하면 어떨때는 선언되고, 어떨때는 선언안되고해서
  // 상태를 일관되게 기억 못함

  useEffect(() => {
    if (userError) {
      setShowLoginModal(true);
    }
  }, [userError]);

  if (showLoginModal)
    return (
      <LoginRequiredModal
        onCancel={() => {
          navigate('/login');
        }}
      />
    );

  console.log('likes: ', likes);
  if (isError) return <div>찜 목록을 불러오는 중 오류가 발생했습니다.</div>;
  if (isLoading) return <Loading />;
  if (likes.length === 0) return <div>찜 목록이 비어있습니다.</div>;

  return (
    <div className="grid grid-cols-2 gap-sm">
      {likes.map((like: Like) => (
        <BookLiked key={like.book.isbn13} bookData={like.book} />
      ))}
    </div>
  );
}
