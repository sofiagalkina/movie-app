"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import React, { useState, useEffect } from "react";
import style from "../../../styles/Index.module.css";
import Image from "next/image";
import Button from "../../../components/Button";


  


export default function MoviePage ()  {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    const KNOWN_GENRES = [
      "Action", "Adventure", "SciFi", "Sci-Fi", "Comedy", "Romance", "Crime", "Drama",
      "Horror", "Thriller", "Fantasy", "Mystery", "Biography", "Animation", "Documentary",
      "Music", "Musical", "Family", "War", "Western", "History", "Sport", "Reality-TV"
    ];

    const extractGenres = (compoundString) => {
      let remaining = compoundString;
      const result = [];
    
      while (remaining.length > 0) {
        const match = KNOWN_GENRES.find((genre) =>
          remaining.startsWith(genre)
        );
        if (match) {
          result.push(match === "SciFi" ? "Sci-Fi" : match); // Normalize if needed
          remaining = remaining.slice(match.length);
        } else {
          // If no match found, break to avoid infinite loop
          break;
        }
      }
    
      return result;
    };
    

    

    useEffect(() => {
        if (id) {
            axios
                .get(`https://imdb236.p.rapidapi.com/imdb/${id}`, {
                    headers: {
                        "x-rapidapi-key": "0cea453a33msh4502e8811584130p136ef0jsnf29f9bfdebb6",
                        "x-rapidapi-host": "imdb236.p.rapidapi.com",
                    },
                })
                .then((response) => {
                    console.log("Movie details response:", response.data);
                    setMovie(response.data);
                })
                .catch((err) => {
                    setError("Error fetching movie data");
                    console.error(err);
                });
        }
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-20">
            <Button cn={style.update} className="w-40" />
            <h1 className="text-white text-2xl font-bold mt-20">{movie.primaryTitle}</h1>
            <div className="flex flex-wrap gap-3">
                <span className="bg-yellow-500 text-black rounded-lg px-2">IMDb</span>
                <span className="text-white"> {`${movie.averageRating} / 10`}</span>
                <span className="text-white"> {movie.contentRating}</span>
            </div>
            <div className="relative w-full">
                <Image className="movie-image" width={300} height={550} src={movie.primaryImage} alt="Official Movie Picture from Amazon" />
            </div>
            <p className="text-white">{movie.description}</p>
            <div>
                <span className="text-white">{movie.startYear}</span>
                <span className="text-white">{`  ${Math.floor(movie.runtimeMinutes / 60)} hr ${movie.runtimeMinutes % 60} m`}</span>
            </div>

            <div className="flex flex-wrap gap-3">
               {movie.genres?.flatMap(extractGenres).map((genre, index) => (
                 <span key={index} className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm">
               {genre}
             </span>
               ))}
             </div>


            <details className="">
                <summary className="bg-white text-black px-3 py-1 rounded-lg text-sm cursor-pointer list-none mt-5 hover:bg-gray-300">
                    View more information
                </summary>
                <h2 className="text-white font-bold mt-2">Cast</h2>
                
                {movie.cast?.map((actor, index) => (
  <div key={`${actor.id}-${index}`} className="bg-gray-800 text-white p-3 rounded-lg shadow-md mb-5 mt-5">
    <div className="flex items-center gap-3">
      <Image
        src={actor.image || "https://placehold.co/40x40"}
        alt={actor.fullName}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div>
        <a
          href={actor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline font-semibold"
        >
          {actor.fullName}
        </a>
        <div className="text-xs text-gray-400">{actor.job}</div>
      </div>
    </div>
    {actor.characters && (
      <div className="mt-1 text-sm text-gray-300">
        <span className="font-medium">Character:</span>{" "}
        {Array.isArray(actor.characters)
          ? actor.characters.join(", ")
          : actor.characters}
      </div>
    )}
  </div>
))}

                
                <h2 className="text-white font-bold mt-2">Reviews</h2>
            </details>
        </div>
    );
};

