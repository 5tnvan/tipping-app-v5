import React, { useState } from "react";
import TippingBill from "./TippingBill";

const Tipping2 = ({ receiver }) => {
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
      <div className="mt-6 font-semibold">Choose the amount:</div>
      <div className="mt-3">
        <span
          className={`btn w-full ${clickedButton === 50 ? "btn-primary" : "btn-secondary"} mb-3`}
          onClick={() => handleButtonClick(50)}
        >
          <span>{"$50"}</span>
        </span>
        <span
          className={`btn w-full ${clickedButton === 100 ? "btn-primary" : "btn-secondary"} mb-3`}
          onClick={() => handleButtonClick(100)}
        >
          <span>{"$100"}</span>
        </span>
        <span
          className={`btn w-full ${clickedButton === 150 ? "btn-primary" : "btn-secondary"} mb-3`}
          onClick={() => handleButtonClick(150)}
        >
          <span>{"$150"}</span>
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
          <TippingBill receiver={receiver} tipAmount={tipAmount} message={message} />
        </>
      )}
    </>
  );
};

export default Tipping2;
