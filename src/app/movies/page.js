import Footer from "../../../components/Footer";
import Image from "next/image";
import axios from "axios";
import { headers } from "next/headers";

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

export default async function MoviesPage() {

    const movies = await fetchMovies();
    console.log(`Type of movies: ${typeof movies}`)

    return(
        <div className="movie-page">


        <h1>Top 250 movies from the API:</h1>
        {movies ? (
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>{movie.primaryTitle}</li>
                ))}
            </ul>
        ) : (
            <p>Failed to fetch movies from the API</p>
        )

        }

     
        </div>
    
    
    )
      
}