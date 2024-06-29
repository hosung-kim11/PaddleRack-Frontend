import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

function AdminJoinLocation({ userId, locationId, fetchCourtsAndQueue }) {
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    navigate(`/location/${locationId}`);
  };

  // WebSocket setup for real-time updates
  const socket = io("http://localhost:8080", {
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
    });
    // Disconnect on component unmount
    return () => {
      socket.emit("leaveLocationRoom", locationId);
      socket.off("statusChanged");
    };
  }, [userId, locationId, socket, fetchCourtsAndQueue]);

  return (
    <div className="button-container">
      <button onClick={handleButtonClick}>
        <span className="button_top">Go To Location Home</span>
      </button>
    </div>
  );
}

export default AdminJoinLocation;
