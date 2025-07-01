/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind의 class이름이 포함된 파일에 대한 경로를 구성하는 부분을 추가합니다.
  // src경로 내부에 자바스크립트, 타입스크립트, jsx를 리턴하는 파일들을 모두 작성 해줍니다.
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['"Pacifico"', 'cursive'], // 별명: pacifico
      },
      colors: {
        mainBlue: '#4F46E5', // 쨍한 파란색
        mainGray: '#F3F4F6', // gray
        searchBg: '#F3F4F6', // 검색창 배경색
        cardBg: '#F9FAFB', // 카드 배경색
        textGray: '#9CA3AF', // 텍스트 회색
        // 추가 색상들
        textPrimary: '#1F2937', // 주요 텍스트 색상
        textSecondary: '#374151', // 보조 텍스트 색상
        textTertiary: '#6B7280', // 3차 텍스트 색상
      },
      spacing: {
        // 공통 간격 값들 (rem 단위)
        xs: '0.5rem', // 8px
        sm: '0.75rem', // 12px
        md: '1rem', // 16px
        lg: '1.5rem', // 24px
        xl: '2rem', // 32px
        '2xl': '3rem', // 48px
        // 작은 간격들
        1: '0.25rem', // 4px
        2: '0.125rem', // 2px
      },
      borderRadius: {
        xs: '0.5rem', // 8px
        sm: '0.75rem', // 12px
        md: '1rem', // 16px
        lg: '1.5rem', // 24px
        xl: '2rem', // 32px
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
      },
      aspectRatio: {
        book: '80/112',
      },
    },
  },
  plugins: [],
};
