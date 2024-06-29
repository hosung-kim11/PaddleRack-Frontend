import React from "react";
import "../../App.css";
import "../styles/YouCantBeHere.css";

function YouCantBehere() {
  return (
    <>
      <div className="fullscreen-background">
        <div className="message">
          <h1>Whoops!</h1>
          <p>
            You are not authorized to view this page. Please log in or sign up
            to access this page.
          </p>
        </div>
        <div className="container-hamster">
          <div
            aria-label="Orange and tan hamster running in a metal wheel"
            role="img"
            class="wheel-and-hamster"
          >
            <div class="wheel"></div>
            <div class="hamster">
              <div class="hamster__body">
                <div class="hamster__head">
                  <div class="hamster__ear"></div>
                  <div class="hamster__eye"></div>
                  <div class="hamster__nose"></div>
                </div>
                <div class="hamster__limb hamster__limb--fr"></div>
                <div class="hamster__limb hamster__limb--fl"></div>
                <div class="hamster__limb hamster__limb--br"></div>
                <div class="hamster__limb hamster__limb--bl"></div>
                <div class="hamster__tail"></div>
              </div>
            </div>
            <div class="spoke"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default YouCantBehere;
