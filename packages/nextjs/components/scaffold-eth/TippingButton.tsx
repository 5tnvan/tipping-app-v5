import React, { useState } from "react";
import TipBill from "./TippingBill";

const TippingButton = ({ tipAmount }) => {
  const [isClicked, setIsClicked] = useState(false);

  const generateHearts = amount => {
    return "❤️".repeat(amount / 5);
  };

  const handleButtonClick = () => {
    document.getElementById("my_modal_3").showModal();
    setIsClicked(true);
  };

  return (
    <>
      <div>
        <button className="btn btn-neutral w-full" onClick={handleButtonClick}>
          Tip {generateHearts(tipAmount)}
        </button>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {isClicked && <TipBill tipAmount={tipAmount} />}
          <div className="flex justify-center">
            <button className="btn btn-neutral mt-3">Confirm</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default TippingButton;
