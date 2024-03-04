import React, { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { updateProfile } from "~~/app/settings/actions";
import { EthIcon } from "~~/components/assets/EthIcon";
import { Address } from "~~/components/scaffold-eth/Address";

const WalletConnectVerify = ({ wallet_id, wallet_sign_hash, wallet_sign_timestamp }) => {
  //WALLET
  const [isWallet, setIsWallet] = useState(false);
  const [isWalletVerified, setIsWalletVerified] = useState(false);
  const { address } = useAccount();
  const {
    data: signMessageData,
    isSuccess: signMessageSuccess,
    error,
    signMessage,
  } = useSignMessage({
    message: "Hello, Beyond! I am signing this message to verify the ownership of my wallet.",
  });

  //WALLET
  useEffect(() => {
    if (wallet_id) {
      setIsWallet(true);
    }
    if (address) {
      setIsWallet(true);
    }

    if (wallet_sign_hash) {
      setIsWalletVerified(true);
    } else {
      setIsWalletVerified(false);
    }
  }, []);

  // Function to handle sign msg
  const handleSignMessage = () => {

    if (signMessage) {
      signMessage();
    }
    if (error) {
      console.error("Error signing message:", error);
    }
    console.log("I'm here, signMessageSuccess ", signMessageSuccess);
    console.log("I'm here, address", address);
    console.log("I'm here, signMessageData", signMessageData);

    if (signMessageSuccess) {
      updateProfile(address, signMessageData, new Date().toISOString());
      setIsWalletVerified(true);
    }
  };

  return (
    <>
      {/* CONTENT */}
      <div className="cont z-10 w-full">
        {isWallet && isWalletVerified ? (
          <>
            <div className="font-semibold text-3xl">{"It's done 🎉"}</div>
            <div className="mb-5">You are all set.</div>
          </>
        ) : (
          <>
            <div className="font-semibold text-3xl">{"Connect your wallet"}</div>
            <div className="mb-5">{"It’s free of charge."}</div>
          </>
        )}

        {/* Steps */}
        <ul className="steps steps-vertical lg:steps-vertical w-full">
          {/* 1.Select a network */}
          <li className="step step-primary">
            <div className="font-semibold">Select a network</div>
            <div className="ml-10 flex bg-slate-200 border-1 border-sky-950 rounded-lg p-5">
              <EthIcon width="20" height="20" />
              <div>Eth</div>
            </div>
          </li>

          {/* 2.Link your wallet */}
          {!isWallet && (
            <li className="step ">
              <div className="">Link your wallet</div>
              <button className="btn btn-glass ml-10 w-72">Connect wallet</button>
            </li>
          )}
          {isWallet && (
            <li className="step step-primary">
              <div className="font-semibold">Link your wallet</div>
              <div className="flex flex-col ml-10">
                <Address address={wallet_id || address} />
              </div>
            </li>
          )}

          {/* 2.Verify ownership */}
          {!isWallet && (
            <>
              <li className="step ">
                <div>Verify ownership</div>
              </li>
              <div>Sign a message to verify the ownership of your wallet. {"It's free of charge"}</div>
              <button type="button" className="btn glass w-full" disabled>
                Sign a message
              </button>
            </>
          )}
          {isWallet && !isWalletVerified && (
            <>
              <li className="step">
                <div>Verify ownership</div>
                <div className="min-w-max text-left">
                  Sign a message to verify the ownership of your wallet.
                  <br />
                  {"It's free of charge."}
                </div>
              </li>

              <button className="btn btn-glass w-full mt-3" onClick={handleSignMessage}>
                Sign a message
              </button>
            </>
          )}
          {isWallet && isWalletVerified && (
            <li className="step step-primary">
              <div>Verify ownership</div>
              <div className="ml-10 w-72 text-left">
                {
                  <>
                    <div>Signed</div>
                    <div className="">{wallet_sign_hash}</div>
                    <div className="">{wallet_sign_timestamp}</div>
                  </>
                }
                {signMessageSuccess && (
                  <>
                    <div>Signed just now</div>
                    <div className="">{signMessageData}</div>
                  </>
                )}
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default WalletConnectVerify;
