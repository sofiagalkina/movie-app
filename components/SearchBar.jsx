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
  <div className="w-full flex items-center gap-2">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for a movie..."
      className="px-2 text-lg text-black border border-gray-300 rounded-lg bg-white placeholder-gray-400"
    />
    <button
      onClick={handleSearch}
      className="text-white"
    >
      Search
    </button>
  </div>
);


}

export default SearchBar;
