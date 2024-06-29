import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/AdminDashboard.css";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/SignUp");
    }
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await axios.get("api/user/dashboard", config);
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations", error);
    }
  };

  const handleDelete = async (locationId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      await axios.delete(`api/user/delete/${locationId}`, config);
      setLocations(locations.filter((location) => location._id !== locationId));
    } catch (error) {
      console.error("Error deleting location", error);
    }
  };

  return (
    <>
      <div className="fullscreen-background">
        <div className="admin-container">
          <h1 className="admin-dashboard-title">My Locations</h1>
          <table className="admin-dashboard-table">
            <thead>
              <tr>
                <th className="position-label">Location Name</th>
                <th className="initial-label">Manage Location</th>
                <th className="initial-label">Delete Location</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {locations.map((location) => (
                <tr key={location._id}>
                  <td className="table-cell">{location.name}</td>
                  <td className="table-cell">
                    <Link to={`/user/admin/${location._id}`}>
                      <button className="admin-button-class">
                        <span className="admin-button">Go!</span>
                      </button>
                    </Link>
                  </td>
                  <td className="table-cell">
                    <button
                      className="admin-button-class"
                      onClick={() => handleDelete(location._id)}
                    >
                      <span className="admin-button"> Delete </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
