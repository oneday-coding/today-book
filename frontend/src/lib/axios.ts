import axios from 'axios';

// 여러 API 요청에 대해 공통 설정을 담은 인스턴스를 생성하는 함수.
const instance = axios.create({
  // 모든 요청 URL 앞에 붙는 기본 주소. .env에서 VITE_API_URL 값을 가져오고, 없으면 http://localhost:3000을 기본으로 사용.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  // baseURL: 'http://localhost:3000',
  // 요청 시 쿠키, 인증정보(세션) 를 포함시켜 백엔드에 전달하도록 설정.
  withCredentials: true,
});

// 응답 인터셉터
// Axios의 응답에 대해 모든 응답을 가로채서 처리할 수 있는 기능.
instance.interceptors.response.use(
  (response) => response, // 성공한 응답은 그대로 리턴.
  (error) => {
    // 에러가 발생한 응답을 처리.
    const originalRequest = error.config;

    // 401 에러 && 요청 URL이 /login이 아닐 경우만 리다이랙트
    if (error.response?.status === 401 && !originalRequest.url.include('/login')) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
    // 리다이렉트 외에도, 에러는 다시 Promise로 throw해서 해당 요청을 보낸 컴포넌트에서 .catch() 등으로도 에러 처리를 할 수 있도록 함.
  }
);

export default instance;
