import { useNavigate } from "react-router-dom";
import logo from '../Images/logo2.png'
import '../Styles/home.css'

const Home = () => {

  const name = localStorage.getItem('username')

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <header>
        <div className="logo">
          <img src={logo} alt="app-logo" />
        </div>
        <div className="head-contents">
          <div className="head-pages">
            <a href="">Home</a>
            <a href="">Movies</a>
            <a href="">Events</a>
            <a href="">More...</a>
          </div>
          <div className="head-buttons">
            <button onClick={handleSubmit} className="logout-button">
              Log out
            </button>
          </div>
        </div>
      </header>
      <section>
        <div className="wellcome-msg">
          <h1>Hello {name} </h1>
          <h2>Welcome to MovieMatic</h2>
        </div>
      </section>

    </>
  );
};

export default Home;
