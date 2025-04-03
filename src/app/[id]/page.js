"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import React, { useState, useEffect } from "react";
import style from "../../../styles/Index.module.css";
import Image from "next/image";
import Button from "../../../components/Button";

const API_KEY = "ca350039a8bbe94386cc58c495307268";

// Fetch Actor Image from TMDb API
const fetchActorImage = async (tmdbId) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/person/${tmdbId}?api_key=${API_KEY}`
        );
        return response.data.profile_path
            ? `https://image.tmdb.org/t/p/w185${response.data.profile_path}`
            : "https://placehold.co/600x400.png";
    } catch (error) {
        console.error(`Error fetching image for actor ${tmdbId}:`, error);
        return "https://placehold.co/600x400.png";
    }
};

// CastList Component to Display Cast
const CastList = ({ cast }) => {
    const [actorImages, setActorImages] = useState({});

    useEffect(() => {
        const loadImages = async () => {
            const imagePromises = cast.map(async (actor) => {
                if (actor.tmdbId) {
                    const imageUrl = await fetchActorImage(actor.tmdbId);
                    return { [actor.tmdbId]: imageUrl };
                }
                return {};
            });

            const imageResults = await Promise.all(imagePromises);
            setActorImages(Object.assign({}, ...imageResults));
        };

        if (cast.length > 0) {
            loadImages();
        }
    }, [cast]);

    return (
        <div className="flex flex-wrap gap-3">
        {cast.map((actor, index) => (
            <div 
                key={`${actor.id}-${index}`} 
                className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2"
            >
                <Image
                    src={actorImages[actor.tmdbId] || "https://placehold.co/600x400.png"}
                    alt={actor.fullName}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <span>{actor.fullName}</span>
            </div>
        ))}
    </div>
    
    );
};

const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

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
                <span className="text-white">{`${Math.floor(movie.runtimeMinutes / 60)} hr ${movie.runtimeMinutes % 60} m`}</span>
            </div>

            <div className="flex flex-wrap gap-3">
                {movie.genres?.flatMap((genre) => genre.split(/(?=[A-Z])/)).map((genre, index) => (
                    <span key={index} className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm">{genre}</span>
                ))}
            </div>

            <details className="">
                <summary className="bg-white text-black px-3 py-1 rounded-lg text-sm cursor-pointer list-none mt-5 hover:bg-gray-300">
                    View more information
                </summary>
                <h2 className="text-white font-bold mt-2">Cast</h2>
                
                <CastList cast={movie.cast || []} />

                <h2 className="text-white font-bold mt-2">Reviews</h2>
            </details>
        </div>
    );
};

export default MoviePage;
