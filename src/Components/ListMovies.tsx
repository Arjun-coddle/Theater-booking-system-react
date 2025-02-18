import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/listmovies.css';
import axiosInstance from '../Utils/AxiosInstance';

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

const ListMovies = ({ langauge }: { langauge: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const handleMovieClick = (movieId: number) => {
    navigate(`/view/${movieId}`);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get('/movies');
        setMovies(response.data.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = langauge ? movies.filter((movie) => movie.language === langauge) : movies;
  console.log('filtered movie :', filteredMovies);
  

  return (
    <>
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <div key={movie.id}>
            <div className="movie-card">
              <div className="movie-poster">
                <img src={movie.poster} alt="movie-poster" />
              </div>
              <div onClick={() => handleMovieClick(movie.id)} className="movie-deatiles">
                <h2>{movie.tittle}</h2>
                <p>{movie.language}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No movies found</p>
      )}
    </>
  );
};

export default ListMovies;
