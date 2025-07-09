type ConfirmModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({ title, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="bg-white rounded-md w-[300px] p-5 shadow-md">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="text-gray-500 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="text-mainBlue font-medium px-3 py-1 rounded hover:bg-blue-50 transition"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
