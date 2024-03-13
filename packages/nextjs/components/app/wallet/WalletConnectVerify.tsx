import React, { useContext, useEffect, useState } from "react";
import { recoverMessageAddress } from "viem";
import { useAccount, useSignMessage } from "wagmi";
import { AppContext } from "~~/app/context";
import { updateProfileWallet } from "~~/app/settings/actions";
import { EthIcon } from "~~/components/assets/EthIcon";
import { Address } from "~~/components/scaffold-eth/Address";

const WalletConnectVerify = () => {
  const { profile, refetchAuth } = useContext(AppContext);
  //WALLET
  const [isWallet, setIsWallet] = useState(false);
  // const { profile, refetch } = useAuthentication();
  const [isWalletVerified, setIsWalletVerified] = useState(false);
  const { address } = useAccount();
  const { data: signMessageData, error, signMessage, variables } = useSignMessage();

  React.useEffect(() => {
    (async () => {
      if (variables?.message && signMessageData) {
        await recoverMessageAddress({
          message: variables?.message,
          signature: signMessageData,
        });
      }

      if (signMessageData) {
        updateProfileWallet(address, signMessageData, new Date().toISOString());
        refetchAuth();
      }
    })();
  }, [signMessageData, variables?.message]);

  //WALLET
  useEffect(() => {
    if (profile.wallet_id) {
      setIsWallet(true);
    }
    if (address) {
      setIsWallet(true);
    }

    if (profile.wallet_sign_hash) {
      setIsWalletVerified(true);
    } else {
      setIsWalletVerified(false);
    }
  }, [address, profile]);

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
            <div className="ml-10 flex bg-slate-200 border-1 border-sky-950 rounded-lg p-3">
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
                <Address address={profile.wallet_id || address} />
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

              <div
                className="btn btn-glass ml-10 w-72"
                onClick={() => {
                  signMessage({ message: "Hey WildPay, this signature proves the ownership of my wallet!" });
                }}
              >
                Sign a message
              </div>
            </>
          )}
          {isWallet && isWalletVerified && (
            <li className="step step-primary">
              <div className="font-semibold">Verify ownership</div>
              <div className="ml-10 w-72 text-left">
                {
                  <>
                    <div>Signed</div>
                    <div className="">{profile.wallet_sign_hash}</div>
                    <div className="">{profile.wallet_sign_timestamp}</div>
                  </>
                }
              </div>
            </li>
          )}
        </ul>

        {error && <div>{error.message}</div>}
      </div>
    </>
  );
};

export default WalletConnectVerify;
