import React, { useState } from "react";
import TippingBill from "./TippingBill";

const Tipping2 = () => {
  const [tipAmount, setTipAmount] = useState(0);
  const [clickedButton, setClickedButton] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [addMessage, setAddMessage] = useState(false);
  const [message, setMessage] = useState(false);

  const handleButtonClick = num => {
    setTipAmount(num);
    setClickedButton(num);
    setIsClicked(true);
    console.log(tipAmount);
  };

  const addMessageClick = () => {
    if (addMessage == false) {
      setAddMessage(true);
    } else {
      setAddMessage(false);
    }
  };

  const onMessageChange = e => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div className="mt-6 font-semibold">Choose your tip:</div>
      <div className="mt-3">
        <span
          className={`btn w-full ${clickedButton === 5 ? "btn-primary" : "btn-secondary"} mb-3`}
          onClick={() => handleButtonClick(5)}
        >
          <span>{"$5"}</span>
        </span>
        <span
          className={`btn w-full ${clickedButton === 10 ? "btn-primary" : "btn-secondary"} mb-3`}
          onClick={() => handleButtonClick(10)}
        >
          <span>{"$10"}</span>
        </span>
        <span
          className={`btn w-full ${clickedButton === 15 ? "btn-primary" : "btn-secondary"} mb-3`}
          onClick={() => handleButtonClick(15)}
        >
          <span>{"$15"}</span>
        </span>
      </div>

      {isClicked && (
        <>
          <span className="link-primary block mt-2" onClick={() => addMessageClick()}>
            Leave a message
          </span>
          {addMessage && (
            <input
              type="text"
              placeholder="Type your message"
              className="input block input-bordered input-primary w-full"
              onChange={e => onMessageChange(e)}
            />
          )}
          <TippingBill tipAmount={tipAmount} message={message} />
        </>
      )}
    </>
  );
};

export default Tipping2;
