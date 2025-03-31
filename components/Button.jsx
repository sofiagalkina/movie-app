"use client"; 
import React from "react";
import Image from "next/image";
import refreshIcon from "../images/refresh.png";
import { useRouter } from "next/navigation";
import { useAppStore} from "../store/store";
import axios from "axios";
// don't forget to import "useAppStore()" here 

async function fetchMovies() {
    
    const options = {
        method: 'GET',
        url: 'https://imdb236.p.rapidapi.com/imdb/top250-movies',
        headers: {
             'x-rapidapi-key': '0cea453a33msh4502e8811584130p136ef0jsnf29f9bfdebb6',
             'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error){
        console.error(error);
        return [];
    }
}


const Button = ({text = "Get a movie", cn = ""}) => {
    
    const router = useRouter();
  
    const handleClick = async () => {
        const movies = await fetchMovies();
        console.log(movies.data)
        if(movies.length > 0){
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            router.push(`/movies/${randomMovie.id}`);
        } else {
            console.error("No movies retrieved")
        }
    }

    return(
        <div className={`update ${cn}`} onClick={handleClick}>
            <Image className="icon" src={refreshIcon} alt="A Movie Button" width={14} height={14}></Image>
            <span>{text}</span>
        </div>
    )
}

export default Button;

