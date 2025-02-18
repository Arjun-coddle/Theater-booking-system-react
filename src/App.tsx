import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { useContext } from "react";
import { SecureRoute } from "./Context/SecureRoute";
import "./App.css";
import Movies from "./Pages/Movies";
import ViewMovieDeatiles from "./Pages/ViewMovieDeatiles";
import Profile from "./Pages/Profile";
import Booking from "./Pages/AviableSlots";

const App: React.FC = () => {
  const context = useContext(SecureRoute);
  if (!context) {
    throw new Error("SecureRoute must be used within a SecureRouteProvider");
  }
  const { state } = context;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={state.user ? <Home /> : <Login />} />
          <Route path="/movies" element={state.user ? <Movies /> : <Login/>} />
          <Route path="/view/:id" element={state.user ? <ViewMovieDeatiles /> : <Login/>} />
          <Route path="/profile" element={state.user ? <Profile /> : <Login />} />
          <Route path="/movie/:movieId" element={state.user ? <Booking /> : <Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
