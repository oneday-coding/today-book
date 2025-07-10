interface AlertModalProps {
  message: string;
  onConfirm: () => void;
}

export default function AlertModal({ message, onConfirm }: AlertModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[16px] w-[320px] px-[24px] py-[32px] text-center shadow-lg">
        <h2 className="text-[14px] text-mainBlack mb-6">{message}</h2>
        <button
          onClick={onConfirm}
          className="w-full h-[44px] bg-mainBlue text-white rounded-[8px] text-[14px] font-medium"
        >
          확인
        </button>
      </div>
    </div>
  );
}
