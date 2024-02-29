import React, { useState } from "react";
import TippingButton from "./TippingButton";

const Tipping = () => {
  const [tipAmount, setTipAmount] = useState(0);

  const handleButtonClick = amount => {
    setTipAmount(amount);
  };

  return (
    <>
      <div>
        <button className="btn w-full btn-secondary mb-3" onClick={() => handleButtonClick(5)}>
          <span>{"$5"}</span>
        </button>
        <button className="btn w-full btn-secondary mb-3" onClick={() => handleButtonClick(10)}>
          <span>{"$10"}</span>
        </button>
        <button className="btn w-full btn-secondary mb-3" onClick={() => handleButtonClick(15)}>
          <span>{"$15"}</span>
        </button>
      </div>

      <div>
        <TippingButton tipAmount={tipAmount} />
      </div>
    </>
  );
};

export default Tipping;
