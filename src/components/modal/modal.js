import React from "react";
import "../modal/modal.css";
import oops from "../../images/others/oops.webp";

const Modal = ({ criminalCaught, callback }) => {
  const sendData = () => {
    callback(false);
  };
  return (
    <>
      <div class="card text-center">
        <img
          src={
            criminalCaught.caught
              ? criminalCaught.capturedByCop === 1
                ? require(`../../images/cop/cop${criminalCaught.capturedByCop}.jpg`)
                : criminalCaught.capturedByCop === 2
                ? require(`../../images/cop/cop${criminalCaught.capturedByCop}.jpg`)
                : require(`../../images/cop/cop${criminalCaught.capturedByCop}.jpg`)
              : oops
          }
          style={{ width: "100%", objectFit: "contain" }}
        />

        <h3 style={{}}>
          {!criminalCaught.caught ? (
            criminalCaught.message
          ) : (
            <div>
              {criminalCaught.message.substr(0, 27)}{" "}
              <div className="cop-caught">
                <strong>{criminalCaught.message.substr(-5)}</strong>
              </div>
            </div>
          )}
        </h3>

        <button type="button" class="action" onClick={sendData}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default Modal;
