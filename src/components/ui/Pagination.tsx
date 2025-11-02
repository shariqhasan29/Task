export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: any;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    return [...Array(totalPages)].map((_, index) => {
      const page = index + 1;
      const showPage =
        page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;

      if (!showPage) {
        if (
          (page === currentPage - 2 && page > 2) ||
          (page === currentPage + 2 && page < totalPages - 1)
        ) {
          return (
            <span key={page} className="text-gray-500">
              ...
            </span>
          );
        }
        return null;
      }

      return (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-lg text-sm font-medium ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="mt-8 flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-lg text-sm font-medium ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Prev
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg text-sm font-medium ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
