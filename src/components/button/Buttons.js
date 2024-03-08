import React, { useState } from "react";
import Carousel from "../carousel/Carousel";
import "../button/button.css";
import { useNavigate } from "react-router-dom";

const Buttons = () => {
  const [openCollapse, setOpenCollapse] = useState('cop1');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggleCollapse = (id) => {
    setLoading(true);
    setTimeout(() => {
      if (openCollapse === id) {
        setOpenCollapse(null);
        setLoading(false);
      } else {
        setOpenCollapse(id);
        setLoading(false);
      }
    }, 500);
  };

  return (
    <>
      <nav className="navbar bg-nav sticky-top navbar-expand-lg">
        <div className="d-flex justify-content-center align-items-center px-4">
          <h3
            className="mx-3"
            style={{ color: "#7F1415", cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Cop Game
          </h3>
          <div className="d-flex gap-1">
            <button
              className="button"
              type="button"
              onClick={() => handleToggleCollapse("cop1")}
            >
              <span className="button-content">Cop-1</span>
            </button>
            <button
              className="button"
              type="button"
              onClick={() => handleToggleCollapse("cop2")}
            >
              <span className="button-content">Cop-2</span>
            </button>
            <button
              className="button"
              type="button"
              onClick={() => handleToggleCollapse("cop3")}
            >
              <span className="button-content">Cop-3</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        {loading ? (
          loading && (
            <div className="loader-buttons">
              <div className="loader"></div>
            </div>
          )
        ) : (
          <>
            
            <div
              className={`collapse ${openCollapse === "cop1" ? "show" : ""}`}
              id="cop1"
            >
              <div className="">
                <div className="py-3">
                  <span>
                    {openCollapse && (
                      <img
                        className="carouselItem__img"
                        src={require(`../../images/cop//${openCollapse}.jpg`)}
                        style={{ height: "20%", width: "25%" }}
                        role="presentation"
                      />
                    )}
                  </span>
                  <span className="mx-3" style={{ fontSize: "40px" }}>
                    Hey,Could you help me catch the criminal
                  </span>
                </div>

                <div className="">
                  <h3>Available Cities </h3>

                  <Carousel currentCop={1} />
                </div>
              </div>
            </div>

            <div
              className={`collapse ${openCollapse === "cop2" ? "show" : ""}`}
              id="cop2"
            >
              <div className="">
                <div className="py-3 " style={{ position: "sticky" }}>
                  <span>
                    {openCollapse && (
                      <img
                        className="carouselItem__img"
                        src={require(`../../images/cop/${openCollapse}.jpg`)}
                        style={{ height: "20%", width: "25%" }}
                        role="presentation"
                      />
                    )}
                  </span>
                  <span className="mx-3" style={{ fontSize: "40px" }}>
                    Hey,Could you help me catch the criminal
                  </span>
                </div>

                <div className="">
                  <h3>Available Cities </h3>

                  <Carousel currentCop={2} />
                </div>
              </div>
            </div>

            <div
              className={`collapse ${openCollapse === "cop3" ? "show" : ""}`}
              id="cop3"
            >
              <div className="">
                <div className="py-3">
                  <span>
                    {openCollapse && (<>
                      <img
                        className="carouselItem__img"
                        src={require(`../../images/cop/${openCollapse}.jpg`)}
                        style={{ height: "20%", width: "25%" }}
                        role="presentation"
                      />
                      </>
                    )}
                  </span>
                  <span className="mx-3" style={{ fontSize: "40px" }}>
                    Hey,Could you help me catch the criminal
                  </span>
                </div>

                <div className="">
                  <h3>Available Cities </h3>

                  <Carousel currentCop={3} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Buttons;
