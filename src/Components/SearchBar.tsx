import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/searchbar.css';
import axiosInstance from "../Utils/AxiosInstance";

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

const SearchBar: React.FC = () => {

    const [value, setValue] = useState<string>('');
    const [data, setData] = useState<Movie[]>([]);

    const navigate = useNavigate()

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const query = (e.target.value)
        setValue(query)

        if (query.trim() === "") {
            setData([]);
            return;
        }

        const response = await axiosInstance.get('/movies')
        const data = response.data.data
        setData(data);
    }

    const handleMovieClick = (movieId: number) => {
        navigate(`/view/${movieId}`)
    }

    return (
        <div className="search-container">
            <div className="searchBar-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search for movies..."
                    onChange={handleChange}
                    value={value}
                />
                <img src="/Images/search.png" alt="Search" />
            </div>
            <div className="suggestion-list">
                {data.filter(movie => movie.tittle.startsWith(value)).map((movie) => (
                    <div className="search-suggestions" key={movie.id}>
                        <p onClick={() => handleMovieClick(movie.id)}>{movie.tittle} ({movie.language})</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;