import React, { useContext, useEffect } from "react";
import { TimeAgo } from "../TimeAgo";
import { recoverMessageAddress } from "viem";
import { useAccount, useSignMessage } from "wagmi";
import { AppContext } from "~~/app/context";
import { updateProfileWallet } from "~~/app/settings/actions";
import { CheckMarkIcon } from "~~/components/assets/CheckMarkIcon";
import { Address } from "~~/components/scaffold-eth/Address";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";

const WalletConnectVerify = () => {
  const { profile, refetchAuth } = useContext(AppContext);
  //WALLET
  const { address } = useAccount();
  const { data: signMessageData, error, signMessage, variables } = useSignMessage();

  useEffect(() => {
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

  return (
    <>
      {/* CONTENT */}
      <div className="cont z-10 w-full">
        {profile.wallet_id && profile.wallet_sign_hash ? (
          <>
            <div className="font-semibold text-3xl">{"It's done 🎉"}</div>
            <div className="mb-5">You are all set.</div>
          </>
        ) : (
          <>
            <div className="font-semibold text-3xl">{"Let us know it's you"}</div>
            <div className="mb-5">{"It’s free of charge."}</div>
          </>
        )}

        {/* Steps */}
        <ul className="steps steps-vertical lg:steps-vertical w-full">
          {/* 1.Link your wallet */}
          {!profile.wallet_id && (
            <li className={`step ${address ? "step-primary" : ""}`}>
              <div className={`${address ? "font-semibold flex items-center" : ""}`}>
                Link your wallet {address && <CheckMarkIcon />}
              </div>
              <div className="ml-10 flex w-max">
                <RainbowKitCustomConnectButton btn="small" />
              </div>
            </li>
          )}
          {profile.wallet_id && (
            <li className="step step-primary">
              <div className="font-semibold flex items-center">
                Link your wallet <CheckMarkIcon />
              </div>
              <div className="ml-10">
                <Address address={profile.wallet_id} />
              </div>
            </li>
          )}

          {/* 2.Verify ownership */}
          {!profile.wallet_id && !address && (
            <li className="step mt-4">
              <div>Verify ownership</div>
            </li>
          )}
          {!profile.wallet_id && address && (
            <>
              <li className="step mt-4">
                <div>Verify ownership</div>
                <div className="min-w-max text-left">
                  Sign a message to verify the ownership of your wallet.
                  <br />
                  {"It's free of charge."}
                </div>
              </li>

              <div
                className="btn btn-primary w-full mt-5"
                onClick={() => {
                  signMessage({ message: "Hi WildPay, this signature is to prove the ownership of my wallet!" });
                }}
              >
                Sign a message
              </div>
            </>
          )}
          {profile.wallet_id && profile.wallet_sign_hash && (
            <li className="step step-primary">
              <div className="font-semibold flex items-center">
                Verify ownership <CheckMarkIcon />
              </div>
              <div className="ml-10 w-72 text-left">
                {
                  <>
                    <div className="font-medium">Signed hash:</div>
                    <div className="text-ellipsis overflow-hidden">{profile.wallet_sign_hash}</div>
                    <div className="">
                    {profile.wallet_sign_timestamp}
                      <TimeAgo timestamp={profile.wallet_sign_timestamp} />
                    </div>
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
