import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./components/Loginseite/LoginScreen";
import Navigation from "./components/Navigation";
import MyResults from "./components/Ergebnisseite/MyResults";
import Profile from "./components/Profilseite/Profile";
import AboutUs from "./components/Über_Uns_Seite/AboutUs";
import Startseite from "./components/Startseite/Startseite";
import Fragebogen from "./components/Fragebogenseite/Fragebogen";
import Angebotseite from "./components/Angebotsseite/Angebotseite";
import Auswertung from "./components/Auswertungsseite/Auswertung";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const admin = localStorage.getItem("isAdmin") === "true";
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
  }, []);

  const successfullLogin = (admin) => {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("isAdmin", admin);
    setIsLoggedIn(true);
    setIsAdmin(admin);
  };

  const logout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("isAdmin", false);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div>
      <header>
        <Navigation
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          handleLogout={logout}
        />
      </header>
      <main>
        <Routes>
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <LoginScreen loginSuccess={successfullLogin} />
              ) : (
                <Navigate to="/startseite" />
              )
            }
          />
          <Route
            path="/startseite"
            element={
              isLoggedIn ? (
                <Startseite isAdmin={isAdmin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/fragebogen"
            element={
              isLoggedIn ? (
                <Fragebogen isAdmin={isAdmin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/auswertung"
            element={
              isLoggedIn ? (
                <Auswertung isAdmin={isAdmin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/angebotseite"
            element={
              isLoggedIn ? (
                <Angebotseite isAdmin={isAdmin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/startseite" : "/login"} />}
          />
          <Route
            path="/my-results"
            element={isLoggedIn ? <MyResults /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/startseite" : "/login"} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;