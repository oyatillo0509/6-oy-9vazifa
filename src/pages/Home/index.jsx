import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to Home</h1>
    </div>
  );
}

export default Home;
