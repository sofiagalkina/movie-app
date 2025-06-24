// app/movies/[id]/page.js

import Image from "next/image";
import style from "../../../../styles/Index.module.css";
import Button from "../../../../components/Button";
import SearchBar from "../../../../components/SearchBar";


export default async function MovieDetails({ params }) {
  const { id } = params;


  // call to a movie endpoint:
  const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTM1MDAzOWE4YmJlOTQzODZjYzU4YzQ5NTMwNzI2OCIsIm5iZiI6MTc0MzcxNjgyMy43NjQsInN1YiI6IjY3ZWYwMWQ3NjZkNzAxNDJiNjk5MWI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Z1ioj8xFQTPba7StLoJV3UXjvFTn2-8iVVIynYSfVU",
    },
   
  });

  // call to a movie cast endpoint:
  const castRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
    headers: {
       Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTM1MDAzOWE4YmJlOTQzODZjYzU4YzQ5NTMwNzI2OCIsIm5iZiI6MTc0MzcxNjgyMy43NjQsInN1YiI6IjY3ZWYwMWQ3NjZkNzAxNDJiNjk5MWI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Z1ioj8xFQTPba7StLoJV3UXjvFTn2-8iVVIynYSfVU",
    },
  });
    // checking response from both requests:
    const movie = await movieRes.json();
    console.log("Response data: ", movie);

    const cast = await castRes.json();
    console.log("Cast Response Data: ", cast)

  if (!movieRes.ok && !castRes.ok) {
    return <p className="text-red-500">Failed to load movie and cast details.</p>;
  }

  // call to a review endpoint:
  const reviewsRes = await fetch (`https://api.themoviedb.org/3/movie/${id}/reviews`, {
    headers: {
       Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTM1MDAzOWE4YmJlOTQzODZjYzU4YzQ5NTMwNzI2OCIsIm5iZiI6MTc0MzcxNjgyMy43NjQsInN1YiI6IjY3ZWYwMWQ3NjZkNzAxNDJiNjk5MWI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Z1ioj8xFQTPba7StLoJV3UXjvFTn2-8iVVIynYSfVU",
    },
  });

    const reviews = await reviewsRes.json();
    console.log("Reviews Resposnse Data: ", reviews);

  // call to a IMBD rating endpoint:
  const ratingRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates`, {
  headers: {
       Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTM1MDAzOWE4YmJlOTQzODZjYzU4YzQ5NTMwNzI2OCIsIm5iZiI6MTc0MzcxNjgyMy43NjQsInN1YiI6IjY3ZWYwMWQ3NjZkNzAxNDJiNjk5MWI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Z1ioj8xFQTPba7StLoJV3UXjvFTn2-8iVVIynYSfVU",
  },
});

const ratingData = await ratingRes.json(); 

const usRelease = ratingData.results.find(r => r.iso_3166_1 === "US");

let certification = null;

if (usRelease) {
  const theatrical = usRelease.release_dates.find(
    d => d.certification && d.type === 3 // 3 = Theatrical release
  );

  certification = theatrical?.certification || null;
}


console.log("Rating:", certification); // e.g., "PG-13"



  // slicing the release year string to only contain 4 digits 
  const releaseYear = movie.release_date.toString().slice(0, 4);
  console.log({releaseYear});

  

  return (
        <div className="px-10">
            <div className="flex justify-between items-center mt-2">
            <SearchBar className=""/> 
            <Button className="text-black ml-2 flex gap-2 justify-between items-center p-2 rounded-xl " />
            </div>


            <h1 className="text-white text-2xl font-bold mt-20 ">{movie.title}</h1>
            <div className="flex flex-wrap gap-3 selection:bg-yellow-300 selection:text-black">
                <span className="bg-yellow-500 text-black rounded-lg px-2 mb-2 text-sm sm:text-base">IMDb</span>
                <span className="text-gray-500 text-sm sm:text-base"> {`${((movie.vote_average).toFixed(1))} / 10 `}</span>
                <span className="text-gray-500 text-sm sm:text-base"> • </span>
                <span className="text-gray-500 text-sm sm:text-base">{releaseYear}</span>
                <span className="text-gray-500 text-sm sm:text-base"> • </span>

                   <div className="text-sm sm:text-base">
                        <span className="text-gray-500 text-sm sm:text-base">{`  ${Math.floor(movie.runtime / 60)} hr ${movie.runtime % 60} m`}</span>
                  </div>

                <span className="text-gray-500 text-sm sm:text-base"> • </span>

                <div className="flex flex-row gap-2 text-sm sm:text-base">
                {movie.origin_country && movie.origin_country.map((country, index) => (
                    <span key={index}
                    className="  text-gray-500 ">
                        {(country)}
                    </span>
                ))}

                 </div>
                    {certification ? (
                    
                    <div className="text-gray-500 selection:bg-yellow-300 selection:text-black text-sm sm:text-base">
                    <span className="text-gray-500 mr-1"> • </span>
                    <span> Rated {certification}</span>
                    </div>
                ) : (
                  <div>
                    <span className="text-gray-500 mr-1 selection:bg-yellow-300 selection:text-black text-sm sm:text-base"> • </span>
                    <span className="text-gray-500 selection:bg-yellow-300 selection:text-black text-sm sm:text-base">No content rating available </span>
                  </div>
                )}
                 </div>

          <div className="flex gap-2">    
        <div className="clearfix">
  <div className="flex flex-col sm:flex-row gap-2">
    {/* Poster */}
    <div className="relative w-full sm:w-[350px]">
      <Image
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/images/placeholder.png"
        }
        alt="Official Movie Picture"
        width={300}
        height={550}
        className="object-cover rounded-lg select-none w-2/3 float-left mr-4 mb-2 sm:float-none sm:w-auto"
      />
    </div>

    {/* Overview + Genres */}
    <div className="flex flex-col justify-start flex-1">
      <p className="text-white text-sm sm:text-base">{movie.overview}</p>

      <div className="flex flex-wrap gap-2 mt-2 text-sm sm:text-base">
        {movie.genres?.map((genre, index) => (
          <span
            key={index}
            className="border border-gray-500 text-gray-500 rounded-xl px-3 py-1 selection:bg-yellow-300 selection:text-black"
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>

        </div>


            

            <details >
              
                <summary className="flex justify-center bg-white w-fit mx-auto text-black px-3 py-1 rounded-xl text-sm cursor-pointer list-none mt-5 hover:bg-gray-300">
                    View more information
                </summary>
      
                <div className="flex justify-center">
                <h2 className="text-white font-bold mt-2">Cast</h2>
                </div>
                <div className="flex overflow-x-auto space-x-4 py-4 ">             
                {cast.cast
                ?.filter(actor => actor.known_for_department?.toLowerCase() === "acting")
                .map((actor, index) => (
                    <div key={`${actor.id}-${index}`} className="flex flex-col items-center text-center gap-2 min-w-[80px] select-none" >
                     <Image

                            src={
                                actor.profile_path 
                                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` 
                                : "/images/Person_Image_Placeholder.png"
                            }
                            alt={actor.name}
                            width={80}
                            height={80}
                            className="rounded-full object-cover"
                      />

                      <div>
                        <p className="text-white text-sm">{actor.name}</p>
                        <p className="text-gray-500 text-sm selection:bg-yellow-300 selection:text-black">{actor.character}</p>
                      </div>
          
    
        </div>
))}
</div>  


  <div className="flex justify-center">         
    <h2 className="text-white font-bold mt-2">Reviews</h2>
  </div>
<div className="mt-2 space-y-4">
  {reviews.results && reviews.results.length > 0 ? (
    reviews.results.map((review) => (
      <div key={review.id} className="border border-gray-700 rounded-lg p-4">
        <p className="text-sm text-gray-400 italic selection:bg-yellow-300 selection:text-black">by {review.author}</p>
        <p className="text-white mt-1">
  {review.content.slice(0, 300)}
  {review.content.length > 300 && (
    <>
      ...{" "}
      <a
        href={review.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline"
      >
        Read more
      </a>
    </>
  )}
</p>

      </div>
    ))
  ) : (
    <p className="text-gray-500 selection:bg-yellow-300 selection:text-black">No reviews available for this movie.</p>
  )}
</div>


            </details>
        </div>
    );
};
