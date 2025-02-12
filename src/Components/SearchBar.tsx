import React from "react";

const SearchBar: React.FC = () => {

    return (
        <div className="searchBar-container">
            <input
                type="text"
                className="search-bar"
                placeholder="Search for movies..."
            />
            <img src="/Images/search.png" alt="Search" />
            <div className="suggestion-list">

            </div>
        </div>
    );
};

export default SearchBar;


