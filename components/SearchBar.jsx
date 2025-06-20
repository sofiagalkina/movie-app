"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function SearchBar({className = ""}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const inappropriateKeywords = [
    "prostitute", "prostitution", "stripper", "sex", "erotic", "affair", 
    "nudity", "porn", "hooker", "adult film", "fetish", "orgy", "brothel",
    "incest", "rape", "molest", "naked", "lust", "seduce", "affairs"
  ];

  const isFamilyFriendly = (overview) => {
    if (!overview) return true;
    const lower = overview.toLowerCase();
    return !inappropriateKeywords.some((word) => lower.includes(word));
  };

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          query,
          include_adult: false,
          vote_count_gte: 100,
          vote_average_gte: 4,
          language: "en-US"
        },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTM1MDAzOWE4YmJlOTQzODZjYzU4YzQ5NTMwNzI2OCIsIm5iZiI6MTc0MzcxNjgyMy43NjQsInN1YiI6IjY3ZWYwMWQ3NjZkNzAxNDJiNjk5MWI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Z1ioj8xFQTPba7StLoJV3UXjvFTn2-8iVVIynYSfVU`,
          accept: "application/json"
        },
      });

      const filteredResults = response.data.results.filter(
        (movie) =>
          movie.vote_average >= 4 &&
          movie.vote_count >= 100 &&
          isFamilyFriendly(movie.overview)
      );

      setResults(filteredResults);
      setError(null);
      router.push(`/searchResult?query=${encodeURIComponent(query)}`);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch results.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-2 w-full ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
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
