import React, { useContext } from "react";
import { recoverMessageAddress } from "viem";
import { useAccount, useSignMessage } from "wagmi";
import { AppContext } from "~~/app/context";
import { updateProfileWallet } from "~~/app/settings/actions";
import { CheckMarkIcon } from "~~/components/assets/CheckMarkIcon";
import { EthIcon } from "~~/components/assets/EthIcon";
import { Address } from "~~/components/scaffold-eth/Address";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";

const WalletConnectVerify = () => {
  const { profile, refetchAuth } = useContext(AppContext);
  //WALLET
  // const [isWallet, setIsWallet] = useState(false);
  // const [isWalletVerified, setIsWalletVerified] = useState(false);
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
          {/* 1.Select a network */}
          <li className="step step-primary">
            <div className="font-semibold flex justify-center items-center">
              Select a network <CheckMarkIcon />
            </div>
            <div className="ml-10 flex  bg-slate-200 border-1 border-sky-950 rounded-lg p-3">
              <EthIcon width="14" height="14" />
              <div className="text-sm">Ethereum</div>
            </div>
          </li>

          {/* 2.Link your wallet */}
          {!profile.wallet_id && (
            <li className={`step ${address ? "step-primary" : ""}`}>
              <div className={`${address ? "font-semibold flex items-center" : ""}`}>
                Link your wallet {address && <CheckMarkIcon />}
              </div>
              <div className="ml-10 flex w-max">
                <RainbowKitCustomConnectButton />
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
            <>
              <li className="step ">
                <div>Verify ownership</div>
              </li>
            </>
          )}
          {!profile.wallet_id && address && (
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
                className="btn btn-neutral w-full mt-5"
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
