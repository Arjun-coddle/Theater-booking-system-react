import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../Styles/moviedeatiles.css';
import axiosInstance from '../Utils/AxiosInstance';

interface Movie {
  id: number;
  tittle: string; 
  cast: string;
  crew: string;
  duration: string;
  language: string;
  poster: string;
}

const ViewMovieDeatiles: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();

  const handleBooking = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axiosInstance.get(`/movie/${id}`);
        setMovie(response.data.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  return (
    <div>
      <Header />
      <div className="movie-details">
        <div className="movie">
          <div className="movie-image">
            {movie?.poster && <img src={movie.poster} alt={movie.tittle} />} 
          </div>
          <div className="movie-deatile">
            <h2 className='viewMovie-title'>{movie?.tittle}</h2>
            <div className="rateing">
              <img src="/Images/rating.png" alt="rating" />
              <button>Rate now</button>
            </div>
            <p><span>2D</span> <span>{movie?.language}</span></p>
            <p>Duration: {movie?.duration}</p>
            <button 
              onClick={() => movie && handleBooking(movie.id)} 
              className='book-ticket-btn'
            >
              Book tickets
            </button>
          </div>
        </div>
        <div className="about">
          <p><span>Cast:</span><br /> {movie?.cast}</p>
          <p><span>Crew:</span><br /> {movie?.crew}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewMovieDeatiles; 
