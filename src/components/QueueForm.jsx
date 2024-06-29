import React, { useState } from "react";
import "./styles/QueueForm.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function QueueForm(user) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [numPlayers, setNumPlayers] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/api/location/${id}/join`, {
        numPlayers: numPlayers,
        userID: user._id,
        name: user.name,
      });
      navigate(`/location/${id}`);
    } catch (error) {
      console.error("Error joining the queue:", error);
    }
  };

  return (
    <>
      <div className="container-queue-form">
        <h1 className="create-court-title">Join Queue</h1>
        <form className="create-court-form">
          <label className="create-court-label">
            Number of Players <br></br>
            <input
              type="text"
              className="create-court-input"
              id="input-num-players"
              placeholder="1-4"
              value={numPlayers}
              onChange={(e) => setNumPlayers(e.target.value)}
              required
              min="1"
            />
          </label>
          <button onClick={handleSubmit} type="submit">
            <span className="button_top">Join Queue Now!</span>
          </button>
        </form>
      </div>
    </>
  );
}

export default QueueForm;
