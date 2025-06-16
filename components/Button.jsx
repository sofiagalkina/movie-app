"use client";
import React, { useState } from "react";
import Image from "next/image";
import refreshIcon from "../images/refresh.png";
import { useRouter } from "next/navigation";
import style from "../styles/Home.module.css";
import axios from "axios";

// Fetch a movie by ID
async function fetchRandomMovie() {
  try {
    const randomPage = Math.floor(Math.random() * 500) + 1; // Max 500 pages

    const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        include_adult: false,
        language: "en-US",
        page: randomPage,
        vote_count_gte: 100, // Filter out obscure ones
        vote_average_gte: 4,

      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTM1MDAzOWE4YmJlOTQzODZjYzU4YzQ5NTMwNzI2OCIsIm5iZiI6MTc0MzcxNjgyMy43NjQsInN1YiI6IjY3ZWYwMWQ3NjZkNzAxNDJiNjk5MWI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Z1ioj8xFQTPba7StLoJV3UXjvFTn2-8iVVIynYSfVU`,
        accept: "application/json",
      },
    });

    const results = response.data.results;
    if (!results.length) return null;

    const randomMovie = results[Math.floor(Math.random() * results.length)];

    console.log("Random movie:", randomMovie);
    return randomMovie;

  } catch (error) {
    console.error("Failed to fetch random movie:", error.response?.status);
    return null;
  }
}


const Button = ({ text = "Get a movie", cn = "", className = "" }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

const handleClick = async () => {
  setLoading(true);

  const movie = await fetchRandomMovie();

  if (movie) {
    router.push(`/movies/${movie.id}`);
  } else {
    console.error("Failed to find a random movie.");
    setLoading(false);
  }
};


  return (
    <div
      className={`${style.update} ${className}`}
      onClick={!loading ? handleClick : null}
      style={{
        backgroundColor: loading ? "#c8c8c8" : "#ebb305",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: 1,
        transition: "background-color 0.3s ease",
      }}
    >
      <Image
        className={`${style.icon} ${loading ? style.rotate : ""}`}
        src={refreshIcon}
        alt="A Movie Button"
        width={14}
        height={14}
      />
      <span>{loading ? "Loading..." : text}</span>
    </div>
  );
};

export default Button;