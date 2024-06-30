import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/pages/Home";
import CreateLocation from "./components/pages/CreateLocation";
import LocationHome from "./components/pages/LocationHome";
import JoinQueue from "./components/pages/JoinQueue";
import SignUp from "./components/pages/SignUp";
import HowToUse from "./components/pages/HowToUse";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./components/pages/AdminDashboard";
import AdminLocation from "./components/pages/AdminLocation";
import YouCantBeHere from "./components/pages/YouCantBeHere.jsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>;
          <Route path="/CreateLocation" element={<CreateLocation />}></Route>;
          <Route path="/Location/:id" element={<LocationHome />}></Route>;
          <Route path="/Location/:id/JoinQueue" element={<JoinQueue />}></Route>
          ;
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/HowToUse" element={<HowToUse />} />
          <Route path="/User/Dashboard" element={<AdminDashboard />} />
          <Route path="/User/Admin/:locationId" element={<AdminLocation />} />
          <Route path="/YouCantBeHere" element={<YouCantBeHere />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
