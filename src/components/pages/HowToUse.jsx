import React from "react";
import "../../App.css";
import "../styles/HowToUse.css";

function HowToUse() {
  return (
    <>
      <div className="fullscreen-background">
        <div className="main-container">
          <h1 className="howtouse-title">Get Ready to Play!</h1>
          <div className="howtouse-container">
            <div className="howtouse-step">
              <div class="card">
                <div class="content">
                  <p class="heading">Create a Location</p>
                  <p class="para">
                    Go to 'Create a Court' and enter the name of the location
                    and the number of courts. You can manage the Location and
                    players from the 'My Locations' page
                  </p>
                </div>
              </div>
            </div>
            <div className="howtouse-step">
              <div class="card">
                <div class="content">
                  <p class="heading">Share Your Location</p>
                  <p class="para">
                    Share the unique location link with other players to join
                    the court. (QR code feature coming soon)
                  </p>
                </div>
              </div>
            </div>
            <div className="howtouse-step">
              <div class="card">
                <div class="content">
                  <p class="heading">Join a Location</p>
                  <p class="para">
                    Once on the Location Page the player and their party can
                    join the Queue using the button at the bottom of the page.
                    You can leave the Queue using the same button at any time.
                  </p>
                </div>
              </div>
            </div>
            <div className="howtouse-step">
              <div class="card">
                <div class="content">
                  <p class="heading">Your Up!</p>
                  <p class="para">
                    Once it is your turn to play, you will receive a
                    notification. Grab your gear and head to the court!
                  </p>
                </div>
              </div>
            </div>
            <div className="howtouse-step">
              <div class="card">
                <div class="content">
                  <p class="heading">Play and Replay</p>
                  <p class="para">
                    Once your game is over, anyone from your match can end the
                    game using the button at the bottom of the Location Page.
                    You can then join the Queue again to play another game.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HowToUse;
