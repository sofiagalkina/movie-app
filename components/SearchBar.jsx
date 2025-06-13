"use client"; 
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await axios.get("https://imdb236.p.rapidapi.com/api/imdb/search", {
        params: { 
          title: query,
          type: "movie",
          rows: 10,
          sortOrder: "ASC",
          sortField: "id",
        },
        headers: {
          'x-rapidapi-key': '0cea453a33msh4502e8811584130p136ef0jsnf29f9bfdebb6',
          'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        },
      });

      setResults(response.data.results);
      setError(null);
      router.push(`/searchResult?query=${encodeURIComponent(query)}`);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch results.");
    }
  };

return (
  <div className="w-full max-w-md flex items-center gap-2">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for a movie..."
      className="flex-1  py-3 text-lg border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
    <button
      onClick={handleSearch}
      className="px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl transition whitespace-nowrap"
    >
      Search
    </button>
  </div>
);


}

export default SearchBar;
