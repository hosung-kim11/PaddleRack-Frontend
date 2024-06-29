import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/NavBar.css";
import { Button } from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function NavBar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    handleClick();
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            PaddleRack
            <img
              className="paddles-icon"
              alt="Pickle Ball Paddles"
              src="/images/paddles.svg"
            />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/HowToUse"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    How to Use
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/CreateLocation"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Create a PaddleRack
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/user/Dashboard"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    My Locations
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    to="/"
                    className="nav-links-mobile"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/HowToUse"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    How to Use
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/CreateLocation"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Create a PaddleRack
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/SignUp"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="sign-up-button">
            {user ? (
              <>
                {" "}
                {button && (
                  <Button onClick={onLogout} buttonStyle="btn--outline">
                    LOGOUT
                  </Button>
                )}{" "}
              </>
            ) : (
              <>
                {" "}
                {button && (
                  <Button buttonStyle="btn--outline">LOGIN</Button>
                )}{" "}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
