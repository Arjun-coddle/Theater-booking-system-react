import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../Styles/moviedeatiles.css'

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

const ViewMovieDeatiles: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/movie/${id}`)
        setMovie(response.data.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovie()
  }, [id]);

  return (
    <div>
      <Header />
      <div className="movie-details">
        <div className="movie">
          <div className="movie-image">
            <img src={movie?.poster} alt={movie?.tittle} />
          </div>
          <div className="movie-deatile">
            <h2 className='viewMovie-title'>{movie?.tittle}</h2>
            <div className="rateing">
              <img src="/Images/rating.png" alt="rating" />
              <button>Rate now</button>
            </div>
            <p><span>2D</span><span>{movie?.language}</span></p>
            <p>Duration: {movie?.duration}</p>
            <button className='book-ticket-btn'>Book tickets</button>
          </div>
        </div>
        <div className="about">
          <p><span>Cast: </span><br /> {movie?.cast}</p>
          <p><span>Crew:</span> <br /> {movie?.crew}</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ViewMovieDeatiles