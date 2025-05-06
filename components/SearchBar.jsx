"use client"; 
import React, { useState } from "react";
import Image from "next/image";
import refreshIcon from "../images/refresh.png";
import { useRouter } from "next/navigation";
import axios from "axios";
import style from "../styles/Home.module.css";
import { type } from "os";


 function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();
  
    const handleSearch = async () => {
      if (!query) return;
  
      try {
        const response = await axios.get("https://imdb236.p.rapidapi.com/imdb/search", {
          params: { 
              title: query,
              type: "movie",
              rows: 10,
              sortOrder: "ASC",
              sortField: "id",
           },
          headers: {
           'x-rapidapi-key': '0cea453a33msh4502e8811584130p136ef0jsnf29f9bfdebb6',
           'x-rapidapi-host': 'imdb236.p.rapidapi.com'
          },
        });
  
        setResults(response.data.titles || []);
        setError(null);
        console.log(response.data)
        router.push("/searchResult");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch results.");
      }
    };

    return (
      <div className="p-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="px-4 py-2 rounded-lg border border-gray-300"
        />
        <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Search
        </button>
    
        {error && <div className="text-red-500 mt-2">{error}</div>}
    
        <div className="mt-4 text-white">
          {results.map((movie) => (
            <div key={movie.id} className="cursor-pointer mb-2" onClick={() => router.push(`/movies/${movie.id}`)}>
              <span className="text-white">{movie.primaryTitle}</span>
            </div>
          ))}
        </div>
      </div>
    );
}






export default SearchBar;