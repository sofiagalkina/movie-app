// app/movies/[id]/page.js

import Image from "next/image";
import style from "../../../../styles/Index.module.css";
import Button from "../../../../components/Button";
import SearchBar from "../../../../components/SearchBar";


export default async function MovieDetails({ params }) {
  const { id } = params;

  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTM1MDAzOWE4YmJlOTQzODZjYzU4YzQ5NTMwNzI2OCIsIm5iZiI6MTc0MzcxNjgyMy43NjQsInN1YiI6IjY3ZWYwMWQ3NjZkNzAxNDJiNjk5MWI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Z1ioj8xFQTPba7StLoJV3UXjvFTn2-8iVVIynYSfVU",
    },
   
    
  });

  if (!res.ok) {
    return <p className="text-red-500">Failed to load movie details.</p>;
  }

  
  const movie = await res.json();

  return (
        <div className="max-w-2xl mx-20">

          <div className="">
            <SearchBar /> 
          <Button cn={style.update} className="w-40" />
          </div>

            <h1 className="text-white text-2xl font-bold mt-20">{movie.title}</h1>
            <div className="flex flex-wrap gap-3">
                <span className="bg-yellow-500 text-black rounded-lg px-2 mb-2">IMDb</span>
                <span className="text-gray-500"> {`${movie.vote_average} / 10 `}</span>
                <span className="text-gray-500"> • </span>
            </div>
            <div className="relative w-full">
                <Image className="movie-image" width={300} height={550} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Official Movie Picture" />
            </div>
            <p className="text-white">{movie.overview}</p>
            <div>
                <span className="text-white">{movie.release_date}</span>
                <span className="text-white">{`  ${Math.floor(movie.runtime / 60)} hr ${movie.runtime % 60} m`}</span>
            </div>

            <div className="flex flex-wrap gap-3">
           
             </div>


            <details className="">
                <summary className="bg-white w-fit text-black px-3 py-1 rounded-xl text-sm cursor-pointer list-none mt-5 hover:bg-gray-300">
                    View more information
                </summary>
                <h2 className="text-white font-bold mt-2">Cast</h2>
              <div className="flex overflow-x-auto space-x-4 py-4 ">             
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
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}` || "/images/Person_Image_Placeholder.png"}
            alt={actor.fullName}
            width={40}
            height={40}
            className="rounded-full object-cover"
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


            </details>
        </div>
    );
};
