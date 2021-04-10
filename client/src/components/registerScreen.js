import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function RegisterScreen({ history }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application-json",
      },
    };
    if (password !== confirmPassword) {
      return setError("Password don't match !");
    }
    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { fullName, email, password },
        config
      );
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        history.push("/");
      } else {
        return setError("something went wrong !");
      }
    } catch (error) {
      return setError(error.response.data.error);
    }
  };

  return (
    <div className="container col">
      <input
        className="mt-5 row"
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        className="mt-1 row"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mt-1 row"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <input
        className="mt-1 mb-2 row"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div>
        <button className="btn-sm btn-primary" onClick={handleRegister}>
          Register
        </button>
        <a className="btn" href="/login">
          Login
        </a>
      </div>
      <p> {error} </p>
    </div>
  );
}

export default RegisterScreen;
