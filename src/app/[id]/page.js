"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import React, {useState, useEffect} from "react";
import style from "../../../styles/Index.module.css";
import Image from "next/image";
import Button from "../../../components/Button";



const MoviePage = () => {
    const { id } = useParams();
    const [ movie, setMovie ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() =>{
        if(id){
            axios.get(`https://imdb236.p.rapidapi.com/imdb/${id}`, {
                headers: {
                    "x-rapidapi-key": "0cea453a33msh4502e8811584130p136ef0jsnf29f9bfdebb6",
                    "x-rapidapi-host": "imdb236.p.rapidapi.com",
                },
            })
            .then((response) => {
                console.log("Movie details response:", response.data); // Debugging
                setMovie(response.data);
            })
            .catch((err) => {
                setError("Error fetching movie data");
                console.error(err);
            });
        }
    }, [id])

    if(error){
        return (
            <div>{error}</div>
        )
    }

    if(!movie){
        return <div>Loading...</div>
    }


    return(
        
        <div className="max-w-2xl mx-20 ">
            <Button cn={style.update} className="w-40" />
            <h1 className="text-white text-2xl font-bold mt-20">{movie.primaryTitle}</h1>
            <div className="flex flex-wrap gap-3">
                <span className="bg-yellow-500 text-black rounded-lg px-2">IMDb</span>
                <span className="text-white"> {movie.averageRating}</span>
                <span className="text-white"> {`Rated ${movie.contentRating}`}</span>
            </div>
            <div className="relative w-full">
            <Image className="movie-image" width={300} height={550}  src={movie.primaryImage} alt="Official Movie Picture from Amazon"/> 
            </div>
            <p className="text-white">{movie.description}</p>
            <div> 
                <span className="text-white"> {movie.startYear}</span>
                <span className="text-white"> { `${Math.floor(movie.runtimeMinutes / 60)} hr ${movie.runtimeMinutes % 60} m`}</span>
            </div>

           
            <div className="flex flex-wrap gap-3">
                {movie.genres?.flatMap(genre => genre.split(/(?=[A-Z])/)).map((genre, index) => (
                <span key={index} className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm">
                 {genre}
             </span>
                ))}
            </div>

    
        </div>
    )
}

export default MoviePage;