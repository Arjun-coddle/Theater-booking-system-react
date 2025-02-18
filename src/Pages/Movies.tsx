import React, { ChangeEvent, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ListMovies from "../Components/ListMovies";
import '../Styles/movies.css'

const Movies: React.FC = () => {

  const [langauge,  setLangauge] = useState<string>('');

  const handleFilterLangauge = (e: ChangeEvent<HTMLSelectElement>) => {
    const filteredLangauge = e.target.value
    console.log('langauge :', filteredLangauge);
    setLangauge(filteredLangauge)
  }

  return (
    <div className="movies-container">
      <Header />
      <div className="movielist-container">
        <div className="filter-container">
          <div className="filter">
            <h1>Filter</h1>
            <select onChange={handleFilterLangauge}>
              <option value=''>Langauges:</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
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
          <ListMovies langauge={langauge} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
