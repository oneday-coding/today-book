import { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number; // 표시 시간 (ms)
  fadeDuration?: number; // 사라지는 애니메이션 시간 (ms)
};

export default function Toast({
  message,
  onClose,
  duration = 2000,
  fadeDuration = 500,
}: ToastProps) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadingOut(true); // opacity 줄이기 시작
    }, duration);

    const removeTimer = setTimeout(() => {
      onClose();
    }, duration + fadeDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose, duration, fadeDuration]);

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-full shadow-md z-50 pointer-events-none`}
      style={{
        opacity: fadingOut ? 0 : 1,
        transform: fadingOut ? 'translate(-50%, 30px)' : 'translate(-50%, 0)',
        transition: `opacity ${fadeDuration}ms ease, transform ${fadeDuration}ms ease`,
      }}
    >
      {message}
    </div>
  );
}
