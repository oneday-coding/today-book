import axios from '../lib/axios';

// 찜 추가
export const postLikes = async (isbn13: number) => {
  const response = await axios.post(`/api/likes/${isbn13}`);
  return response.data;
};

// 찜 삭제
export const deleteLikes = async (isbn13: number) => {
  const response = await axios.delete(`/api/likes/${isbn13}`);
  return response.data;
};

// 찜 목록 조회
export const getLikes = async () => {
  const response = await axios.get(`/api/likes/me`);
  return response.data;
};
