import React from "react";
import "../App.css";
import "./styles/CurrentQueue.css";

function CurrentQueue({ players }) {
  // array of player initials as strings
  var waitingInitials = [];
  for (var i = 0; i < players.length; i++) {
    var object = players[i];
    waitingInitials.push(object.name);
  }

  return (
    <>
      <div className="container-queue">
        <p className="label">Currently Waiting</p>
        <table className="main-table">
          <thead>
            <tr>
              <th className="position-label">Position</th>
              <th className="initial-label">Player Group</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {waitingInitials.map((element, index) => (
              <tr key={index}>
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{element}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CurrentQueue;
