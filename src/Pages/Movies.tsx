import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import '../Styles/movies.css'

interface Movie {
  id: number;
  tittle: string;
  cast: string;
  crew: string;
  duration: string;
  language: string;
  poster: string;
  modify: string;
}

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3003/movies");
        console.log('API respond', response.data.data);
        const data = response.data.data
        setMovies(data)
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();

  }, []);


  const handleMovieClick = (movieId: number) => {
    navigate(`/view/${movieId}`)
  }

  return (
    <div className="movies-container">
      <Header />
      <div className="movielist-container">
        <div className="filter-container">
          <div className="filter">
            <h1>Filter</h1>
            <select>
              <option>Langauges:</option>
              <option value="malayalam">Malayalam</option>
              <option value="hindi">Hindi</option>
              <option value="english">English</option>
              <option value="tamil">Tamil</option>
            </select>
            <select>
              <option>Genres:</option>
              <option value="malayalam">Drama</option>
              <option value="hindi">Thriller</option>
              <option value="english">Action</option>
              <option value="tamil">Comedy</option>
              <option value="tamil">Crime</option>
              <option value="tamil">Family</option>
              <option value="tamil">Suspense</option>
            </select>
          </div>
        </div>
        <div className="movies-list">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-poster">
                  <img src={movie.poster} alt='movie-poster' />
                </div>
                <div className="movie-deatiles">
                  <h2 onClick={()=>handleMovieClick(movie.id)}>{movie.tittle}</h2>
                  <p>{movie.language}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
