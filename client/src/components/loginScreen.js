import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function LoginScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application-json",
      },
    };
    if (!email || !password) {
      return setError("Enter email and password");
    }
    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        history.push("/");
      } else {
        return setError("no authorization");
      }
    } catch (error) {
      if (error.response.data.error) {
        return setError(error.response.data.error);
      }
      return setError("somethin went wrong");
    }
  };

  return (
    <div className="container col">
      <input
        className="mt-5 row"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mt-1 mb-2 row"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />

      <div>
        <button className="btn-sm btn-primary" onClick={handleLogin}>
          Login
        </button>
        <a className="btn" href="/register">
          register
        </a>
      </div>
      <p> {error} </p>
    </div>
  );
}

export default LoginScreen;
