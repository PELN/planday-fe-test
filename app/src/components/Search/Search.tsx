interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  resultsCount: number;
}

const Search = ({ value, onChange, resultsCount }: SearchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex justify-end py-6">
      <form role="search">
        <label htmlFor="searchInput" className="sr-only">
          Search by title:
        </label>
        <input
          type="search"
          id="searchInput"
          placeholder="Search by title..."
          value={value}
          onChange={handleChange}
          className="border px-4 py-2 rounded-md text-black block"
          aria-label="Search by title"
        />
      </form>
      {/* Live region to announce the number of search results for screen readers */}
      <div aria-live="assertive" className="sr-only">
        {resultsCount === 0
          ? "No results found"
          : `${resultsCount} results found`}
      </div>
    </div>
  );
};

export default Search;
