import Footer from '../Components/Footer';
import Header from '../Components/Header'
import ListMovies from '../Components/ListMovies';
import SlideShow from '../Components/SlideShow';
import '../Styles/home.css'

const Home = () => {

  const name = localStorage.getItem('username')

  return (
    <>
      <Header />
      <section>
        <div className="wellcome-msg">
          <h1>Hello {name} </h1>
          <h2>Welcome to MovieMatic</h2>
        </div>
        <SlideShow />
      </section>
      <section>
        <div className="seeAll-btn">
        <h2>Recommended Movies</h2>
          <a href='/movies'>See All ▶</a>
        </div>
        <div className="list-movie-container">
          <ListMovies langauge={''} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
