import { useState, useEffect } from "react";
import "./App.css";
import data from "./data.json";
import Card from "./components/Card/Card";
import Pagination from "./components/Pagination/Pagination";
import Search from "./components/Search/Search";

const itemsPerPage = 6;

interface CardData {
  title: string;
  description: string;
  imagePath: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<CardData[]>([]);
  const [query, setQuery] = useState("");
  const [noResults, setNoResults] = useState<boolean>(false);

  // TODO: error handling - check if data is fetched

  // Get current cards whenever currentPage or query changes
  useEffect(() => {
    // Filter data array based on search query
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    // Calc where the current page starts and ends in the stack
    const indexOfFirstCard = (currentPage - 1) * itemsPerPage;
    const indexOfLastCard = indexOfFirstCard + itemsPerPage;
    // Pick out the cards that should be displayed on the current page
    const newData = filteredData.slice(indexOfFirstCard, indexOfLastCard);
    setCurrentData(newData);

    setNoResults(filteredData.length === 0); // Show a msg for the user if no results are found
  }, [currentPage, query]);

  // Handle page change via pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (value: string) => {
    setQuery(value);

    // Reset to first page when search query changes in order to use search from any page
    setCurrentPage(1);
  };

  // Calculate search results count for accessibility
  const resultsCount = data.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  ).length;

  return (
    <div
      role="main"
      className="absolute inset-0 w-full bg-gradient-to-b from-slate-900 to-black"
    >
      <div className="container mx-auto px-5 pt-9 pb-9">
        <header>
          <h1 className="text-fuchsia-600 animate-blur text-center text-6xl font-bold uppercase py-9">
            Neon signs
          </h1>
        </header>

        <Search
          value={query}
          onChange={handleSearchChange}
          resultsCount={resultsCount}
        />

        {noResults && (
          <div className="text-center">
            <div className=" py-8 mt-8 h-60">
              <p className="text-3xl text-white-500 uppercase">oops!</p>
              <p className="text-xl text-white-500 pt-3">
                We couldn't find any results..
              </p>
            </div>
          </div>
        )}

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="cards-grid"
        >
          {currentData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
        <Pagination
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
