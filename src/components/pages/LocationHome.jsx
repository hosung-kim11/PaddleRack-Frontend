import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import "../styles/LocationHome.css";
import CurrenlyPlaying from "../CurrenlyPlaying";
import CurrentQueue from "../CurrentQueue";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import JoinLocation from "../JoinLocation";
import { useCallback } from "react";

function CourtScreen() {
  const navigate = useNavigate(); // redirects to new page
  const { user } = useSelector((state) => state.auth); // get current logged in user
  const { id } = useParams(); // location ID from URL
  const [location, setLocation] = useState({}); // location details
  const [courts, setCourts] = useState([]); // courts at location
  const [playersQueue, setPlayersQueue] = useState([]); // players in queue

  // redirect to sign up page if user is not logged in - not best solution fix later
  useEffect(() => {
    if (!user) {
      navigate("/SignUp");
    }
  });

  // Initial fetch of location details
  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const response = await axios.get(`/api/location/${id}`);
        setLocation(response.data);
      } catch (error) {
        console.error("Error fetching court details:", error);
      }
    };
    fetchLocationDetails();
  }, [id]);

  // Fetch courts and queue
  const fetchCourtsAndQueue = useCallback(async () => {
    const courtsResponse = await axios.get(`/api/location/${id}/courts`);
    setCourts(courtsResponse.data);
    const queueResponse = await axios.get(`/api/location/${id}/waiting`);
    setPlayersQueue(queueResponse.data);
  }, [id]);

  // Initial fetch of courts and queue
  useEffect(() => {
    fetchCourtsAndQueue();
  }, [fetchCourtsAndQueue, id]);

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
        <CurrenlyPlaying courts={courts} />
        <CurrentQueue players={playersQueue} />
        <JoinLocation
          userId={user._id}
          locationId={id}
          fetchCourtsAndQueue={fetchCourtsAndQueue}
        />
      </div>
    </>
  );
}

export default CourtScreen;
