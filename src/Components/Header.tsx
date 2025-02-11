import React from 'react'
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';

const Header = () => {

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      localStorage.clear();
      navigate("/");
    };

    return (
        <header>
            <div className="logo">
                <img src="/Images/logo2.png" alt="app-logo" />
            </div>
            <div className="head-contents">
                <div className="head-pages">
                    <a href="/home">Home</a>
                    <a href="/movies">Movies</a>
                    <a href="">Events</a>
                    <a href="">More...</a>
                </div>
                <div className="searchBar-container">
                    <SearchBar/>
                </div>
                <div className="head-buttons">
                    <button onClick={handleSubmit} className="logout-button">
                        Log out
                    </button>
                    <img src="/Images/search.png" alt="menu-bar" className="menu-bar" />
                </div>
            </div>
        </header>
    )
}

export default Header