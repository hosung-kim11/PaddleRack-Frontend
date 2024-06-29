import React from "react";
import "../App.css";
import "./styles/CurrentlyPlaying.css";

function CurrenlyPlaying({ courts }) {
  return (
    <>
      <div className="container-playing">
        <p className="label">Currently Playing</p>
        <table className="main-table">
          <thead>
            <tr>
              <th className="court-label">Court Number</th>
              <th className="status-label">Status</th>
              <th className="player-label">Players</th>
              {/* use for ADMIN */}
              {/* <th className="end-label">Action</th> */}
            </tr>
          </thead>
          <tbody className="table-body">
            {courts.map((court) => (
              <tr className="table-row" key={court._id}>
                <td className="table-cell">{court.courtNumber}</td>
                <td className="table-cell">
                  {court.currentPlayers.length > 0 ? "In Use" : "Empty"}
                </td>
                <td className="table-cell">
                  {court.currentPlayers.length > 0
                    ? court.currentPlayers.map((p) => p.name).join(", ")
                    : "Empty"}
                </td>
                {/* use for ADMIN */}
                {/* <td className="table-cell">
                  {court.currentPlayers.length > 0 && (
                    <button
                      className="end-game"
                      onClick={() => onGameFinish(court._id)}
                    >
                      Finish Game
                    </button>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CurrenlyPlaying;
