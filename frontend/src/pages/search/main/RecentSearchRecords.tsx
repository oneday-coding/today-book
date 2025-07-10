import { useRecentSearchStore } from '../../../store/useRecentSearchStore';
import useBookSearch from '../../../hooks/useBookSearch_old';
import { useResultSearchStore } from '../../../store/useResultSearchStore';
import { useQueryClient } from '@tanstack/react-query';

export default function SearchResults() {
  const { recentSearches, clearAllStorage, removeOneStorage } = useRecentSearchStore();
  const { searchBooks } = useBookSearch();

  const clearResults = useResultSearchStore((state) => state.clearResults);
  const searchQuery = useResultSearchStore((state) => state.searchQuery);
  const queryClient = useQueryClient();
  // 검색 결과 초기화
  function resetResults() {
    clearResults(); // 전역 검색어 초기화
    queryClient.invalidateQueries({ queryKey: ['search', searchQuery] }); // 캐시 초기화
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-[8px]">
        <p>최근 검색어</p>
        <button
          type="button"
          onClick={() => {
            clearAllStorage();
            resetResults();
          }}
        >
          전체 삭제
        </button>
      </div>

      <div className="flex gap-[8px] flex-wrap mb-[24px]">
        {recentSearches.map((keyword, index) => (
          <div
            key={index}
            className="rounded-full  inline-flex items-center py-[6px] px-[12px] bg-mainGray text-[14px]"
            onClick={() => {
              searchBooks(keyword);
            }}
          >
            {keyword}
            <button
              className="bg-100 ml-[8px] w-[14px] h-[14px]"
              style={{ backgroundImage: "url('/icons/button/xBtn.svg')" }}
              onClick={(e) => {
                e.stopPropagation();
                removeOneStorage(keyword);
              }}
            >
              <span className="sr-only">삭제</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
