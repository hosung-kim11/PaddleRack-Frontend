import React from "react";
import "../../App.css";
import CreateForm from "../CreateForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CreateCourt() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/SignUp");
    }
  });
  return (
    <div className="fullscreen-background">
      <CreateForm />
    </div>
  );
}

export default CreateCourt;
