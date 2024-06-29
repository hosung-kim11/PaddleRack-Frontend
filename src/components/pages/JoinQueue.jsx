import React from "react";
import "../../App.css";
import QueueForm from "../QueueForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function JoinQueue() {
  // redirect to sign up page if user is not logged in
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/SignUp");
    }
  });
  return (
    <>
      <div className="fullscreen-background">
        <QueueForm {...user} />
      </div>
    </>
  );
}

export default JoinQueue;
