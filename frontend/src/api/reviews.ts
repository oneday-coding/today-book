import axios from '../lib/axios';

// 리뷰 작성
export const postReview = async (isbn13: number, content: string) => {
  const response = await axios.post(`/api/reviews/${isbn13}`, { content });
  console.log('리뷰 작성 응답 : ', response);
  return response.data.item;
};

// 리뷰 조회
export const getReview = async (isbn13: number) => {
  const response = await axios.get(`/api/reviews/${isbn13}`);
  console.log('리뷰 조회 응답 : ', response);
  return response.data.item;
};

// 리뷰 수정
export const patchReview = async (isbn13: number, content: string) => {
  const response = await axios.patch(`/api/reviews/${isbn13}`, { content });
  console.log('리뷰 수정 응답 : ', response);
  return response.data.item;
};

// 리뷰 삭제
export const deleteReview = async (isbn13: number) => {
  const response = await axios.delete(`/api/reviews/${isbn13}`);
  console.log('리뷰 삭제 응답 : ', response);
  return response.data.item;
};
