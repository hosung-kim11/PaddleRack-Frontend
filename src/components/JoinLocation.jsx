import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

function JoinLocation({ userId, locationId, fetchCourtsAndQueue }) {
  const [playerStatus, setPlayerStatus] = useState("none");
  const navigate = useNavigate();

  // Fetch courts and queue
  const fetchPlayerStatus = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/location/${locationId}/playerStatus/${userId}`
      );
      if (response.data.status) {
        setPlayerStatus(response.data.status);
      }
    } catch (error) {
      console.error("Error fetching player status:", error);
    }
  }, [userId, locationId]);

  // Initial fetch of courts and queue
  useEffect(() => {
    fetchPlayerStatus();
  }, [fetchPlayerStatus]);

  const handleButtonClick = async () => {
    if (playerStatus === "none") {
      navigate(`/location/${locationId}/joinqueue`);
    } else {
      const response = await axios.post(
        `/api/location/${locationId}/managePlayer`,
        { userId }
      );
      setPlayerStatus(response.data.status);
    }
  };

  // WebSocket setup for real-time updates
  const socket = io(process.env.REACT_APP_API_KEY, {
    transports: ["websocket"],
    autoConnect: false,
  });
  useEffect(() => {
    // Connect only once - explicit
    socket.connect();
    socket.emit("joinLocationRoom", locationId);

    // Listen for status changes from the server
    socket.on("statusChanged", (data) => {
      fetchCourtsAndQueue();
      fetchPlayerStatus();
    });
    // Disconnect on component unmount
    return () => {
      socket.emit("leaveLocationRoom", locationId);
      socket.off("statusChanged");
    };
  }, [userId, locationId, socket, fetchCourtsAndQueue, fetchPlayerStatus]);

  return (
    <div className="button-container">
      <button onClick={handleButtonClick}>
        <span className="button_top">
          {playerStatus === "none" && "Play Now!"}
          {playerStatus === "queued" && "Leave Queue!"}
          {playerStatus === "playing" && "End Match!"}
        </span>
      </button>
    </div>
  );
}

export default JoinLocation;
