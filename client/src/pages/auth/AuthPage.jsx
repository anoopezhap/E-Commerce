import { useState } from "react";
import "./../auth/styles.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

export default function AuthPage() {
  return (
    <div className="auth">
      <Register />
      <Login />
    </div>
  );
}

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/user/register", {
        username,
        password,
      });
      alert("Successfully registered!Please login to continue");
      setUsername("");
      setPassword("");
    } catch (err) {
      if (err.response.data.type === "username already exist") {
        alert("username already exists!Please use a different username");
      } else {
        alert("Something else happend");
      }
    }
  }
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h1>Register your account</h1>
        <div className="form-group">
          <label className="label" htmlFor="username">
            Username:
          </label>
          <input
            className="input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">
            Password:
          </label>
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/user/login", {
        username: loginUsername,
        password: loginPassword,
      });

      //saving token to the cookies and usedid to the local storage
      setCookies("access_token", result.data.token);
      localStorage.setItem("userId", result.data.userId);

      setLoginUsername("");
      setLoginPassword("");

      //navigating to the shop page
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response.data.type === "no user found") {
        alert("The request user is not found");
      } else if (err.response.data.type === "wrong credentials") {
        alert("Wrong credentials");
      } else {
        alert("Something went wrong");
      }
    }
  }
  return (
    <div className="auth-container">
      <form onSubmit={handleLogin}>
        <h1>Login to your account</h1>
        <div className="form-group">
          <label className="label" htmlFor="username">
            Username:
          </label>
          <input
            className="input"
            type="text"
            id="username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">
            Password:
          </label>
          <input
            className="input"
            type="password"
            id="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
