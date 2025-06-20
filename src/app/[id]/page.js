"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import React, { useState, useEffect } from "react";
import style from "../../../styles/Index.module.css";
import Image from "next/image";
import Button from "../../../components/Button";
import SearchBar from "../../../components/SearchBar";
import { Actor } from "next/font/google";

export default function MoviePage ()  {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [actorImages, setActorImages] = useState({});

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
                .get(`https://imdb236.p.rapidapi.com/api/imdb/${id}`, {
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


    // this is new useEffect to fetch images ONCE THE MOVIE LOADS from a different API:
    useEffect(() => {
      const fetchActorImages = async () => {
        if ( movie?.cast?.length > 0) {
          const images = {};
  
          await Promise.all(
            movie.cast.map(async (actor) => {
              console.log(`actor.job: ${actor.job}`)
              try {
                const response = await axios.get("https://api.themoviedb.org/3/search/person", {
                  params: { query: actor.fullName },
                  headers: {
                    accept: "application/json",
                    Authorization:
                      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTM1MDAzOWE4YmJlOTQzODZjYzU4YzQ5NTMwNzI2OCIsIm5iZiI6MTc0MzcxNjgyMy43NjQsInN1YiI6IjY3ZWYwMWQ3NjZkNzAxNDJiNjk5MWI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Z1ioj8xFQTPba7StLoJV3UXjvFTn2-8iVVIynYSfVU",
                  },
                });
  
                const person = response.data.results[0];
                if (person?.profile_path) {
                  images[actor.id] = `https://image.tmdb.org/t/p/w185${person.profile_path}`;
                }
              } catch (err) {
                console.error(`Error fetching TMDB data for ${actor.fullName}:`, err);
              }
            
            })
            
          );
  
          setActorImages(images);
        }
      };
  
      fetchActorImages();
    }, [movie]);


    // reviews:
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      const fetchReviews = async () => {
        if (!movie?.id) return;
    
        try {
          // STEP 1: Convert IMDb ID to TMDB ID
          const findResponse = await axios.get(
            `https://api.themoviedb.org/3/find/${movie.id}`,
            {
              params: { external_source: "imdb_id" },
              headers: {
                accept: "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTM1MDAzOWE4YmJlOTQzODZjYzU4YzQ5NTMwNzI2OCIsIm5iZiI6MTc0MzcxNjgyMy43NjQsInN1YiI6IjY3ZWYwMWQ3NjZkNzAxNDJiNjk5MWI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Z1ioj8xFQTPba7StLoJV3UXjvFTn2-8iVVIynYSfVU"
              }
            }
          );
    
          const tmdbId = findResponse.data.movie_results?.[0]?.id;
          if (!tmdbId) {
            console.warn("TMDB ID not found for IMDb ID:", movie.id);
            return;
          }
    
          // STEP 2: Use TMDB ID to get reviews
          const reviewResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${tmdbId}/reviews`,
            {
              params: {
                language: "en-US",
                page: "1"
              },
              headers: {
                accept: "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTM1MDAzOWE4YmJlOTQzODZjYzU4YzQ5NTMwNzI2OCIsIm5iZiI6MTc0MzcxNjgyMy43NjQsInN1YiI6IjY3ZWYwMWQ3NjZkNzAxNDJiNjk5MWI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Z1ioj8xFQTPba7StLoJV3UXjvFTn2-8iVVIynYSfVU"
              }
            }
          );
    
          setReviews(reviewResponse.data.results);
        } catch (error) {
          console.error("Failed to fetch reviews:", error);
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Status:", error.response.status);
            console.error("Headers:", error.response.headers);
          }
        }
      };
    
      fetchReviews();
    }, [movie]);

    
    // end of reviews

    if (error) {
        return <div>{error}</div>;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

       <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
          <div className="w-full sm:w-auto">
            <SearchBar className="w-full" />
          </div>
          <div className="w-full sm:w-40">
            <Button className="w-full" />
          </div>
      </div>


            <h1 className="text-white text-xl sm:text-2xl font-bold mt-10 sm:mt-20">{movie.primaryTitle}</h1>
            <div className="flex flex-wrap gap-3">
                <span className="bg-yellow-500 text-black rounded-lg px-2 mb-2">IMDb</span>
                <span className="text-gray-500"> {`${movie.averageRating} / 10 `}</span>
                <span className="text-gray-500"> • </span>
                <span className="text-gray-500"> {movie.contentRating}</span>
            </div>
            <div className="relative w-full">
                <Image className="movie-image w-full max-w-xs sm:max-w-sm mx-auto" width={300} height={550} src={movie.primaryImage} alt="Official Movie Picture from Amazon" />
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
                <summary className="bg-white w-fit text-black px-3 py-1 rounded-xl text-sm cursor-pointer list-none mt-5 hover:bg-gray-300">
                    View more information
                </summary>
                <h2 className="text-white font-bold mt-2">Cast</h2>
              <div className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide">             
                {movie.cast
                ?.filter(
                  actor => {
                    const job = actor.job?.toLowerCase();
                    return job == "actor" || job == "actress";
                  })
                .map((actor, index) => (
          <div key={`${actor.id}-${index}`} >
          <div className="flex flex-col items-center text-center gap-2">

          <Image
                      src={actorImages[actor.id] || actor.image || "/images/Person_Image_Placeholder.png"}
                      alt={actor.fullName}
                      width={40}
                      height={40}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
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
        
        <div className="text-xs text-gray-400">{actor.characters}</div>
      </div>
    </div>
  </div>
))}
</div>  

                
                <h2 className="text-white font-bold mt-2">Reviews</h2>
{reviews.length > 0 ? (
  reviews.map((review) => (
    <div key={review.id} className="bg-gray-800 text-white p-4 rounded-lg mt-3">
      <div className="font-semibold">{review.author}</div>
      <div className="text-sm italic text-gray-300">
        {review.content.length > 300
          ? review.content.slice(0, 300) + "..."
          : review.content}
      </div>
      <div className="text-xs text-gray-400 mt-2">
        Rating: {review.author_details.rating ?? "N/A"}
      </div>
    </div>
  ))
) : (
  <p className="text-gray-400 italic">No reviews available.</p>
)}

            </details>
        </div>
    );
};

