"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import React, {useState, useEffect} from "react";

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
        <div>
            <h1>{movie.primaryTitle}</h1>
            <p>{movie.description}</p>

        </div>
    )
}

export default MoviePage;