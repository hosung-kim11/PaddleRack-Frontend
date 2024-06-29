import React, { useState } from "react";
import "../App.css";
import "./styles/CreateForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function CreateForm() {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    const id = user._id;
    e.preventDefault();
    try {
      const response = await axios.post("/api/location/create", {
        name,
        num,
        id,
      });
      const locationID = response.data.id;
      const sendSubmit = () => {
        navigate(`/location/${locationID}`);
      };
      sendSubmit();
    } catch (error) {
      console.error("Error creating court:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="create-court-title">New PaddleRack</h1>
        <form onSubmit={handleSubmit} className="create-court-form">
          <label className="create-court-label">
            Court Name <br></br>
            <input
              type="text"
              required
              className="create-court-input"
              id="name"
              placeholder="Dublin Pickle Ball Courts"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="create-court-label">
            Number of Courts <br></br>
            <input
              type="number"
              className="create-court-input"
              id="number-courts"
              placeholder="8"
              required
              value={num}
              onChange={(e) => setNum(e.target.value)}
            />
          </label>
          {/* <button className="primary-btn">Create Court!</button> */}
          <button>
            <span className="button_top"> Create Now!</span>
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateForm;
