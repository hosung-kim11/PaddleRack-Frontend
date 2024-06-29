import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./styles/HeroMain.css";

function HeroMain() {
  return (
    <>
      <div className="main-text-container">
        <h1 className="hero-main-text">
          Enjoy The Game <br></br> We Handle The Queue!
        </h1>
        <div className="features-container">
          <div className="feature">
            <h2 className="support-text">Freedom To Roam</h2>
            <h3 className="description-text">
              Move freely - warm up, relax, or chat without worrying about
              losing your spot in line with notifications when it's your turn
            </h3>
          </div>
          <div className="feature">
            <h2 className="support-text">No More Unattended Gear</h2>
            <h3 className="description-text">
              Keep your paddles safe and secure. There's no need to leave
              expensive equipment by the courtside
            </h3>
          </div>
          <div className="feature">
            <h2 className="support-text">Efficient Matchmaking</h2>
            <h3 className="description-text">
              Our fast queue system automatically matches your party to ensure
              you get to play games without lengthy wait or confusion
            </h3>
          </div>
        </div>
        <div className="button-container">
          <Link to="/CreateLocation">
            <button className="btn-primary">
              Create a Court
              <img
                className="create-icon"
                alt="Pickle Ball Paddle and Ball"
                src="/images/createIcon.png"
              />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeroMain;
