"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
            query: query,
            include_adult: false,
            language: "en-US",
            page: 1,
        },
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTM1MDAzOWE4YmJlOTQzODZjYzU4YzQ5NTMwNzI2OCIsIm5iZiI6MTc0MzcxNjgyMy43NjQsInN1YiI6IjY3ZWYwMWQ3NjZkNzAxNDJiNjk5MWI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Z1ioj8xFQTPba7StLoJV3UXjvFTn2-8iVVIynYSfVU",
            accept: "application/json",
              },
        });

    const rawResults = response.data.results || [];
    const filteredResults = rawResults.filter(
      (movie) => movie.vote_average >= 4 && movie.vote_count >= 100
    );
    setResults(filteredResults);
    setError(null);
    
      } catch (err) {
        console.error(err);
        setError("Failed to fetch results.");
      }
    };

    fetchResults();
  }, [query]); 

return (
  <div className="min-h-screen bg-black text-white px-6 py-8">
    <h1 className="text-2xl font-bold mb-2">
      Results for: <span className="text-[#2cd7fd]">{query}</span>
    </h1>

    {error && <p className="text-red-500 mb-4">{error}</p>}

    {results.length === 0 ? (
      <p className="text-gray-400">No results found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {results.map((movie) => (
          <div
            key={movie.id}
            className="bg-zinc-900 rounded-xl shadow-md hover:shadow-yellow-500/20 transition duration-300 overflow-hidden"
          >
            <Image
              className="w-full h-[400px] object-cover"
              width={500}
              height={750}
              alt={`Poster for ${movie.title}`}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/images/images.jpeg"
              }
            />
            <div className="p-4">
              <h2
                className="text-lg font-semibold text-[#2cd7fd] cursor-pointer hover:underline flex items-center justify-center mx-auto"
                onClick={() => router.push(`/movies/${movie.id}`)}
              >
                {movie.title}
              </h2>
              <p className="text-sm text-gray-400 mb-2 mt-2 bg-gray-800 rounded-xl w-40 flex items-center justify-center mx-auto ">
                Rating:{" "}
                <span className="text-gray-400">
                  {(movie.vote_average).toFixed(1)} / 10
                </span>
              </p>
              <p className="text-sm text-gray-300 ">
                {movie.overview || "No overview available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

}
