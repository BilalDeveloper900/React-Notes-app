// Jwt.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Jwt = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("login");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default Jwt;
