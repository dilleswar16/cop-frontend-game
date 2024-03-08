import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../carousel/carousel.css";
import { useAppContext } from "../Context";
import Modal from "../modal/modal";
import { useNavigate } from "react-router-dom";

const responsive = {
  0: {
    items: 1,
  },
  512: {
    items: 2,
  },
  1024: {
    items: 4,
  },
};

const Carousel = ({ currentCop }) => {
  const {
    testCities,
    testVehicles,
    copChoices,
    setCopChoices,
    setTestCities,
    setTestVehicles,
  } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [criminalCaught, setCriminalCaught] = useState({});
  const navigate = useNavigate();

  const handleCitySelection = (e, cityName) => {
    e.preventDefault();
    setCopChoices((prev) => {
      const updatedChoices = prev.map((choice) => {
        if (choice.cop === currentCop) {
          return { ...choice, city: cityName };
        }
        return choice;
      });
      return updatedChoices;
    });
  };

  const handleVehicleSelection = (e, vehicleKind) => {
    e.preventDefault();

    if (copChoices[currentCop - 1].vehicle === vehicleKind) {
      alert("Already selected");
      return;
    }

    setCopChoices((prev) => {
      const updatedChoices = prev.map((choice) => {
        if (choice.cop === currentCop) {
          return { ...choice, vehicle: vehicleKind };
        }
        return choice;
      });
      return updatedChoices;
    });

    setTestVehicles((prev) => {
      const updatedVehicles = prev.map((vehicle) => {
        if (vehicle.kind === vehicleKind) {
          return { ...vehicle, count: vehicle.count - 1 };
        } else if (
          copChoices.some(
            (choice) =>
              choice.vehicle === vehicle.kind && choice.cop === currentCop
          )
        ) {
          return { ...vehicle, count: vehicle.count + 1 };
        }
        return vehicle;
      });
      return updatedVehicles;
    });
  };

  const handleModalCloseFrmChild = (data) => {
    setModalOpen(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    navigate("/game");
    setCopChoices([
      { cop: 1, city: "", vehicle: "" },
      { cop: 2, city: "", vehicle: "" },
      { cop: 3, city: "", vehicle: "" },
    ]);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/cities`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTestCities(data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });

    fetch(`${process.env.REACT_APP_BACKEND_URL}/vehicles`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTestVehicles(data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  };

  const handeCatchMe = (e) => {
    e.preventDefault();
    console.log(copChoices);

    const isFilled = copChoices.every(
      (choice) => choice.city !== "" && choice.vehicle !== ""
    );

    if (!isFilled) {
      alert("Please fill in all cop choices.");
      return;
    }

    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(copChoices),
    })
      .then((response) => response.json())
      .then((data) => {
        setCriminalCaught(data);
        setLoading(false);
        setModalOpen(true);
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  const handleTestData = (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_BACKEND_URL)
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/testgame`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCriminalCaught(data);
        setLoading(false);
        setModalOpen(true);
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  const cityItems = testCities.map((item) => {
    const imagePath = require(`../../images/city/${item.name}.jpg`);
    const isCitySelected = copChoices.some(
      (choice) => choice.city === item.name
    );

    return (
      <div className="text-center carouselItem" key={item.name}>
        <div className="image-container">
          <img
            className={`carouselItem__img ${isCitySelected ? "disabled" : ""}`}
            src={imagePath}
            alt={item.name}
          />
          <button
            className="select-button"
            disabled={isCitySelected}
            onClick={(e) => handleCitySelection(e, item.name)}
          >
            Select Me
          </button>
        </div>
        <span className="bold">{item.name}</span>
      </div>
    );
  });

  const vehicleItems = testVehicles.map((item) => {
    const imagePath = require(`../../images/vehicle/${item.kind}.jpg`);
    //const isVehicleSelected = copChoices.some((choice) => choice.vehicle === item.kind);
    const disabledImage = item.count === 0;
    //const disabledButton = isVehicleSelected;

    return (
      <div className="text-center carouselItem" key={item.kind}>
        <div className="image-container">
          <img
            className={`carouselItem__img ${disabledImage ? "disabled" : ""}`}
            src={imagePath}
            alt={item.kind}
          />
          <button
            className="select-button"
            disabled={item.count === 0}
            onClick={(e) => handleVehicleSelection(e, item.kind)}
          >
            Select Me
          </button>
        </div>
        <span className="bold">{item.kind}</span>
      </div>
    );
  });

  return (
    <div>
      <div className="mx-1" style={{ display: "flex", gap: "1.5rem" }}>
        {testCities.map((city) => {
          const isCitySelected = copChoices.some(
            (choice) => choice.city === city.name
          );
          return (
            <span
              key={city.name}
              className={`badge bg-primary ${
                isCitySelected ? "badge-disabled" : ""
              }`}
            >
              {city.name} - {city.distance} km
            </span>
          );
        })}
      </div>

      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        disableButtonsControls
        disableDotsControls
        autoPlayDirection={1000}
        animationDuration={2000}
        responsive={responsive}
        items={cityItems}
      />

      <div>
        <h3>Available vehicles</h3>
        <div className="mx-1" style={{ display: "flex", gap: "1.5rem" }}>
          {testVehicles.map((vehicle) => {
            return (
              <span
                className={`badge bg-primary ${
                  vehicle.count === 0 ? "badge-disabled" : ""
                }`}
              >
                {vehicle.kind} {` - ${vehicle.range} km (${vehicle.count})`}
              </span>
            );
          })}
        </div>
      </div>

      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        disableButtonsControls
        autoPlayDirection={1000}
        animationDuration={2000}
        disableDotsControls
        responsive={responsive}
        items={vehicleItems}
      />

      <div className="text-center d-flex justify-content-center gap-2 py-3 mb-1">

        <button className="animated-button"
          type="button"
          onClick={handeCatchMe}>
          <span>Catch me</span>
          <span></span>
        </button>

        <button className="animated-button"  type="button"
          onClick={handleTestData}>
          <span>Test Data</span>
          <span></span>
        </button>

       
      </div>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      {modalOpen && (
        <div className="modal-container">
          <Modal
            criminalCaught={criminalCaught}
            callback={handleModalCloseFrmChild}
          />
        </div>
      )}
    </div>
  );
};

export default Carousel;
