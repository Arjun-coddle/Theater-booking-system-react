import Footer from '../Components/Footer';
import Header from '../Components/Header'
import '../Styles/home.css'

const Home = () => {

  const name = localStorage.getItem('username')

  return (
    <>
      <Header/>
      <section>
        <div className="wellcome-msg">
          <h1>Hello {name} </h1>
          <h2>Welcome to MovieMatic</h2>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Home;
