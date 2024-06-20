import "./LoginScreen.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import ComicWelcome from "../../imgs/comic_welcome.png";
import axios from "../../api/AxiosConfig.js";

function LoginScreen({ loginSuccess }) {
  const [loginLoading, setLoginLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userType = isAdmin ? "admin" : "user";

    try {
      const response = await axios.post("/login", {
        username,
        password,
        userType,
      });
      if (response.data.auth) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          loginSuccess(isAdmin);
        }, 2000);
      } else {
        setShowFailureModal(true);
      }

    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
      setShowFailureModal(true);
    } finally {
      setLoginLoading(false);
    }
  };

  /* 
  axios.defaults.withCredentials = true;

  const login = () => {
    axios.post("/login", { email, password })
      .then(response => {
        if (response.data.auth) {
          setMessage("Login erfolgreich."); // Setzen einer Erfolgsmeldung

          // Prüfen, ob ein zusätzlicher Admin-Token erhalten wurde
          if (response.data.organizerToken) {
            console.log('Admin Token:', response.data.adminToken);
          }

          // Weiterleitungslogik hinzufügen
          navigate("/home"); // Navigiere zur Home-Seite
        } else {
          setMessage(response.data.message); // Setzen einer Fehlermeldung
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setMessage('Login failed. Please try again.');
      });
  };
*/

  return (
    <>
      <div id="login-frame">
        <div id="login-photo-div">
          <img src={ComicWelcome} alt="SemanTec" />
        </div>
        <div id="login-form">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="show-password"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="show-password">
                Show password
              </label>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="admin-login"
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <label className="form-check-label" htmlFor="admin-login">
                Admin login
              </label>
            </div>
            <Button variant="success" type="submit" disabled={loginLoading}>
              {loginLoading ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                "Submit"
              )}
            </Button>
            <br />
            <Button
              id="quick-access"
              variant="warning"
              onClick={() => loginSuccess(isAdmin)}
              disabled={loginLoading}
            >
              Quick access (Dev Only)
            </Button>
          </form>
        </div>
      </div>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Nice to see you again!</Modal.Body>
      </Modal>
      <Modal show={showFailureModal} onHide={() => setShowFailureModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error || "Please check your credentials and try again."}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowFailureModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginScreen;
