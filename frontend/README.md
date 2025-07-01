# Today Book - Frontend

오늘의 책을 추천해주는 웹 애플리케이션의 프론트엔드입니다.

## 🚀 기술 스택

### Core

- **React 19.1.0** - 사용자 인터페이스 라이브러리
- **TypeScript 5.8.3** - 정적 타입 검사
- **Vite 6.3.5** - 빌드 도구 및 개발 서버

### Routing & State Management

- **React Router DOM 7.6.2** - 클라이언트 사이드 라우팅
- **Zustand 5.0.5** - 상태 관리 라이브러리
- **TanStack React Query 5.80.6** - 서버 상태 관리

### Styling & UI

- **Tailwind CSS 3.4.17** - 유틸리티 우선 CSS 프레임워크
- **Swiper 11.2.8** - 터치 슬라이더 라이브러리

### HTTP Client

- **Axios 1.9.0** - HTTP 클라이언트

### Development Tools

- **ESLint 9.28.0** - 코드 린팅
- **Prettier 3.5.3** - 코드 포맷팅
- **PostCSS 8.5.4** - CSS 전처리기

## 📁 프로젝트 구조

```
frontend/
├── public/                 # 정적 파일
│   ├── icons/             # 아이콘 파일들
│   │   ├── button/        # 버튼 아이콘
│   │   └── nav/           # 네비게이션 아이콘
│   └── imgs/              # 이미지 파일들
├── src/
│   ├── api/               # API 관련 함수들
│   │   └── books.ts       # 책 관련 API
│   ├── components/        # 공통 컴포넌트
│   │   ├── BackBtn.tsx
│   │   ├── Logo.tsx
│   │   └── moreButton.tsx
│   ├── hooks/             # 커스텀 훅
│   │   ├── useBookDetail.ts
│   │   └── useBookList.ts
│   ├── layout/            # 레이아웃 컴포넌트
│   │   ├── BottomNav/     # 하단 네비게이션
│   │   └── Layout.tsx     # 메인 레이아웃
│   ├── lib/               # 유틸리티 라이브러리
│   │   └── axios.ts       # Axios 인스턴스 설정
│   ├── models/            # 타입 정의
│   │   └── book.model.ts  # 책 관련 타입
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── detail/        # 책 상세 페이지
│   │   ├── favorites/     # 즐겨찾기 페이지
│   │   ├── home/          # 홈 페이지
│   │   ├── list/          # 책 목록 페이지
│   │   ├── my/            # 마이 페이지
│   │   └── search/        # 검색 페이지
│   ├── router/            # 라우팅 설정
│   │   └── index.tsx      # 라우터 설정
│   ├── store/             # 상태 관리
│   │   └── searchStore.ts # 검색 관련 상태
│   ├── App.tsx            # 메인 앱 컴포넌트
│   └── main.tsx           # 앱 진입점
├── index.html             # HTML 템플릿
├── package.json           # 프로젝트 의존성
├── tailwind.config.js     # Tailwind CSS 설정
├── tsconfig.json          # TypeScript 설정
└── vite.config.ts         # Vite 설정
```

## 🛠️ 설치 및 실행

### Prerequisites

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 모드로 실행 (http://localhost:5173)
npm run dev
```

### 빌드

```bash
# 프로덕션 빌드
npm run build
```

### 빌드 미리보기

```bash
# 빌드된 파일 미리보기
npm run preview
```

### 코드 린팅

```bash
# ESLint로 코드 검사
npm run lint
```

## 🌐 주요 기능

### 페이지별 기능

- **홈 페이지** (`/`)

  - 오늘의 추천 도서
  - 신간 도서 슬라이더
  - 베스트셀러 섹션

- **검색 페이지** (`/search`)

  - 도서 검색 기능
  - 최근 검색 기록
  - 검색 결과 표시

- **도서 상세 페이지** (`/detail/:isbn13`)

  - 도서 상세 정보
  - 리뷰 섹션
  - 즐겨찾기 기능

- **도서 목록 페이지** (`/list/:bookType`)

  - 카테고리별 도서 목록
  - 페이지네이션

- **즐겨찾기 페이지** (`/favorites`)

  - 즐겨찾기한 도서 목록

- **마이 페이지** (`/my`)
  - 사용자 정보 관리

### 공통 기능

- **하단 네비게이션**: 홈, 검색, 즐겨찾기, 마이페이지 간 이동
- **반응형 디자인**: 모바일 우선 디자인
- **상태 관리**: Zustand를 통한 전역 상태 관리
- **API 통신**: Axios를 통한 백엔드 API 호출

## 🎨 디자인 시스템

### 색상

- **Main Blue**: `#4F46E5` (쨍한 파란색)
- **Main Gray**: `#F3F4F6` (회색)

### 폰트

- **Pacifico**: 로고 및 특별한 텍스트용

### 컴포넌트

- **BottomNav**: 하단 네비게이션 바
- **SearchWindow**: 검색 입력 창
- **Swiper**: 이미지 슬라이더
- **BookCard**: 도서 카드 컴포넌트

## 🔧 환경 설정

### 환경 변수

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
VITE_API_URL=http://localhost:3000
```

### 백엔드 연동

- 백엔드 서버는 `http://localhost:3000`에서 실행되어야 합니다
- API 엔드포인트는 `/api` 프리픽스를 사용합니다

## 👥 팀

- 프론트엔드 개발자
- 백엔드 개발자
