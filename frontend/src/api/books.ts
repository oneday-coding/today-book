import axios from '../lib/axios';

// 책 '목록' GET
export async function getBookList(type: string, page: number, limit: number) {
  try {
    // /api/books?type='today'&page=1&limit=10
    const res = await axios.get(`/api/books?type=${type}&page=${page}&limit=${limit}`);
    return res.data.item;
  } catch (err) {
    console.error('책 목록 GET 요청 실패 : ', err);
    throw err;
  }
}

// 책 '상세' GET
export async function getBookDetail(isbn13: number) {
  try {
    const res = await axios.get(`/api/books/${isbn13}`);
    return res.data.item;
  } catch (err) {
    console.error ('책 목록 GET 요청 실패 : ', err);
    throw err;
  }
}

// 책 '검색' GET
export async function getBookSearch(keyword: string, page: number, limit: number) {
  try {
    const res = await axios.get(`/api/books/search?keyword=${keyword}&page=${page}&limit=${limit}`);
    return res.data.item;
  }
  catch (err) {
    console.error('책 검색 GET 요청 실패 : ', err);
    throw err;
  }
}