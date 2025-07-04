"use client";
import React, { useState } from "react";
import Image from "next/image";
import refreshIcon from "../images/refresh.png";
import { useRouter } from "next/navigation";
import style from "../styles/Home.module.css";
import axios from "axios";

// Keywords to filter out
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

// Fetch a random movie
async function fetchRandomMovie() {
  try {
    const randomPage = Math.floor(Math.random() * 500) + 1;

    const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        include_adult: false,
        language: "en-US",
        page: randomPage,
        vote_count_gte: 100,
        vote_average_gte: 4,
      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTM1MDAzOWE4YmJlOTQzODZjYzU4YzQ5NTMwNzI2OCIsIm5iZiI6MTc0MzcxNjgyMy43NjQsInN1YiI6IjY3ZWYwMWQ3NjZkNzAxNDJiNjk5MWI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Z1ioj8xFQTPba7StLoJV3UXjvFTn2-8iVVIynYSfVU`,
        accept: "application/json",
      },
    });

    const results = response.data.results.filter(
      (movie) =>
        movie.vote_average >= 4 &&
        movie.vote_count >= 100 &&
        isFamilyFriendly(movie.overview)
    );

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
      className={`${style.update} ${cn} ${className}  `}
      onClick={!loading ? handleClick : null}
      style={{
        backgroundColor: loading ? "#c8c8c8" : "#ebb305",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: 1,
        transition: "background-color 0.3s ease",
      }}
    >
      <Image
        className={`${style.icon} ${loading ? style.rotate : ""} `}
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
