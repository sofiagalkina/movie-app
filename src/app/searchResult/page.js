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
    setResults(response.data.results || []);


        console.log("Search query:", query);
        console.log("API call with params:", {
        title: query,
        type: "movie",
        rows: 10,
        sortOrder: "ASC",
        sortField: "id",
        });


        setResults(response.data.results || []);
        console.log("Search results from the API: ", response.data.results)
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch results.");
      }
    };

    fetchResults();
  }, [query]); // <== THIS DEPENDENCY MUST EXIST

  return (
    <div className="text-white">
      <h1>Results for: {query}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((movie) => (
            <div
              key={movie.id}
              className="mb-2"
            
            >
              <span className="text-blue-400 underline cursor-pointer" onClick={() => router.push(`/movies/${movie.id}`)} >{movie.title}</span> - <span>{movie.vote_average}</span>
              <p>{movie.overview}</p>
              <Image 
                className="movie-image"
                width={200}
                height={450}
                 alt={`Poster for ${movie.title}`}
                src={
                movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/images/images.jpeg" 
                }
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
