"use client"; 
import React, { useState } from "react";
import Image from "next/image";
import refreshIcon from "../images/refresh.png";
import { useRouter } from "next/navigation";
import { useAppStore} from "../store/store";
import axios from "axios";
import style from "../styles/Home.module.css";
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
        console.log(response.data.items)
        return response.data || [];
    } catch (error){
        console.error(error);
        return [];
    }
}


const Button = ({text = "Get a movie", cn = ""}) => {
    
    const router = useRouter();
    const [loading, setLoading] = useState(false);
  
    const handleClick = async () => {
        setLoading(true);
        const movies = await fetchMovies();
        console.log(movies.data)
        if(movies.length > 0){
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            router.push(`/${randomMovie.id}`);
        } else {
            console.error("No movies retrieved")
            setLoading(false);
        }

       
    }

    return(
        <div 
        className={`update ${cn}`} 
        onClick={!loading ? handleClick : null}
        style={{
            backgroundColor: loading ? "#c8c8c8" : "#f6d518",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: 1,
            transition: "background-color 0.3s ease"
        }}
        >
              <Image 
                className={`icon ${loading ? style.rotate : ""}`} 
                src={refreshIcon} 
                alt="A Movie Button" 
                width={14} 
                height={14} 
            />
            <span>{loading? "Loading..." : text}</span>
        </div>
    )
}

export default Button;

