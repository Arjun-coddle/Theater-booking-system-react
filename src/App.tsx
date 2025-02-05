import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { useContext } from "react";
import { SecureRoute } from "./Context/SecureRoute";
import "./App.css";

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
        </Routes>
      </Router>
    </div>
  );
};

export default App;
