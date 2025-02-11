import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { useContext } from "react";
import { SecureRoute } from "./Context/SecureRoute";
import "./App.css";
import Movies from "./Pages/Movies";
import ViewMovieDeatiles from "./Pages/ViewMovieDeatiles";

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
          <Route path="/movies" element={<Movies />} />
          <Route path="/view/:id" element={<ViewMovieDeatiles />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
