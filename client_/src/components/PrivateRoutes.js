// src/components/PrivateRoutes.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from "../api/AxiosConfig";
import { useState, useEffect } from 'react';

function PrivateRoutes() {
  const [currentUser, setCurrentUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.get('/verifyToken', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then((response) => {
          setCurrentUser(response.data.loggedIn);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return currentUser ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
