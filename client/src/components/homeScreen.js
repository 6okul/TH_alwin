import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import FileUpload from "./fileUpload";

function HomeScreen({ history }) {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  const fetchUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const response = await axios.get("/api/private/getUser", config);
      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      setError(error.response);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      return history.push("/login");
    }
    fetchUser();
  }, [history]);

  return (
    <div className="container mt-3">
      <div class="row">
        <div class="col-sm">{user && <h1>User : {user.fullName}</h1>}</div>
        <div class="col-sm">
          <button className="btn-sm btn-danger " onClick={handleLogout}>
            logout
          </button>
        </div>
      </div>

      <div>
        <FileUpload />
      </div>
    </div>
  );
}

export default HomeScreen;
