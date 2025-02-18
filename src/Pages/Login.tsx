import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SecureRoute } from "../Context/SecureRoute";
import "../Styles/login.css";

interface Validation {
  password?: string;
  email?: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<Validation>({});

  const enterPasswordMessage = process.env.REACT_APP_ENTER_PASSWORD ?? 'Please enter a password';

  const context = useContext(SecureRoute);
  if (!context) {
    throw new Error("SecureRoute must be used within a SecureRouteProvider");
  }
  const { dispatch } = context;

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Validation = {};
    if (!email) errors.email = "Please enter email";
    if (!password) errors.password = enterPasswordMessage;

    if (Object.keys(errors).length > 0) {
      setErr(errors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3003/signin", { email, password });
      console.log(response.data);

      if (response.data.success && response.data.token) {
        dispatch({
          type: "LOGIN",
          payload: response.data.token,
        });
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("token", response.data.token);
        alert("Welcome to MovieMatic");
        navigate("/home");
      } else {
        alert("Incorrect username or password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Incorrect username or password.");
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="login-head">
          <div className="login-logo">
            <img src="/Images/logo2.png" alt="app-logo" />
          </div>
          <h1>Welcome Back</h1>
          <p>Please enter your details</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email :</label>
            <input
              id="email"
              className="label-login"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr((prev) => ({ ...prev, email: "" }));
              }}
            /> <br />
            {err.email && <span className="err-msg">{err.email}</span>}
            <label htmlFor="password">Password :</label>
            <input
              id="password"
              className="label-login"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErr((prev) => ({ ...prev, password: "" }));
              }}
            /> <br />
            {err.password && <span className="err-msg">{err.password}</span>}
            <div className="signin-link">
              <p>
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </div>
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;