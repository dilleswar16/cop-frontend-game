import React from "react";
import "../landing-page/landingPage.css";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-nav navbar-light bg-light">
        <div className="mx-4">
          <h3
            className="mx-3"
            style={{ color: "#7F1415", cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Cop Game
          </h3>
        </div>
      </nav>

      <div className="center text-center container">
        <h1>Intense Cop</h1>
        <div className="text-ceneter py-4">
          <h5 className="mb-4 py-1">
            The ultimate law enforcement experience. Are you ready to take on
            the
            <br></br>mean streets and bring justice to the city?
          </h5>
          <button
            className="btn select-buttonss"
            onClick={() => {
              navigate("/game");
            }}
          >
            Play Now
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
