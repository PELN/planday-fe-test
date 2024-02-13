interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = [];
  // Calc number of pages needed to display all the items in the dataset
  // Math.ceil ensures that remaining items will have an additional page
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate array of numbers from totalPages to show in UI
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Decrement current page number by 1 to get the previous number
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Increment current page number by 1 to get the next number
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // When anchor link (page number) is clicked, update the current page state and display new data
  const handlePageClick = (
    pageNumber: number,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault(); // Prevent default action for anchor link so it doesn't reload
    onPageChange(pageNumber);
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        className={`px-2 md:px-4 py-2 bg-gray-200 text-black  rounded-md mr-2 ${
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        }`}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
      >
        Previous
      </button>

      <nav aria-label="pagination" className="flex items-center">
        <ul className="flex space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                href={`#${number}`}
                className={`px-3 md:px-4 py-2 text-black font-bold rounded-md ${
                  number === currentPage
                    ? "bg-fuchsia-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={(e) => handlePageClick(number, e)}
                aria-current={number === currentPage ? "page" : undefined}
                aria-label={`Page ${number}`}
              >
                {number === currentPage && currentPage === 1 && (
                  <span className="sr-only">first page</span>
                )}
                {number === currentPage && currentPage === totalPages && (
                  <span className="sr-only">last page</span>
                )}
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className={`px-2 md:px-4 py-2 bg-gray-200 text-black rounded-md ml-2 ${
          currentPage === totalPages && "opacity-50 cursor-not-allowed"
        }`}
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
