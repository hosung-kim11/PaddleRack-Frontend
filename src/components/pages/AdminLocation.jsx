import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import "../styles/LocationHome.css";
import AdminCurrenlyPlaying from "../AdminCurrentlyPlaying";
import AdminCurrentQueue from "../AdminCurrentQueue";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminJoinLocation from "../AdminJoinLocation";
import { useCallback } from "react";

function AdminLocation() {
  const navigate = useNavigate(); // redirects to new page
  const { user } = useSelector((state) => state.auth); // get current logged in user
  const { locationId } = useParams(); // location ID from URL
  const [location, setLocation] = useState({}); // location details
  const [courts, setCourts] = useState([]); // courts at location
  const [playersQueue, setPlayersQueue] = useState([]); // players in queue

  // Initial fetch of location details
  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const response = await axios.get(`/api/location/${locationId}`);
        setLocation(response.data);

        if (user._id !== response.data.admin) {
          navigate("/YouCantBeHere");
        }
      } catch (error) {
        console.error("Error fetching court details:", error);
      }
    };
    fetchLocationDetails();
  }, [locationId, navigate, user._id]);

  // redirect to sign up page if user is not logged in or not admin - not best solution fix later
  useEffect(() => {
    if (!user) {
      navigate("/SignUp");
    }
  });

  // Fetch courts and queue
  const fetchCourtsAndQueue = useCallback(async () => {
    const courtsResponse = await axios.get(
      `/api/location/${locationId}/courts`
    );
    setCourts(courtsResponse.data);
    const queueResponse = await axios.get(
      `/api/location/${locationId}/waiting`
    );
    setPlayersQueue(queueResponse.data);
  }, [locationId]);

  // Initial fetch of courts and queue
  useEffect(() => {
    fetchCourtsAndQueue();
  }, [fetchCourtsAndQueue, locationId]);

  const handleFinishGame = async (courtId) => {
    try {
      await axios.delete(`api/user/${courtId}/finish`);
    } catch (error) {
      console.error("Error finishing game", error);
    }
    fetchCourtsAndQueue(); // Re-fetch courts and player queue to reflect changes
  };

  // prevents user._id to be undefined when user not logged in => error
  if (!user) {
    return null;
  }
  // loading screen
  if (!location) return <div>Loading...</div>;
  return (
    <>
      <div className="fullscreen-background">
        <h1 className="title-court-name">{location.name}</h1>
        <AdminCurrenlyPlaying courts={courts} onGameFinish={handleFinishGame} />
        <AdminCurrentQueue players={playersQueue} />
        <AdminJoinLocation
          userId={user._id}
          locationId={locationId}
          fetchCourtsAndQueue={fetchCourtsAndQueue}
        />
      </div>
    </>
  );
}

export default AdminLocation;
