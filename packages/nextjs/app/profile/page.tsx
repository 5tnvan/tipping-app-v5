"use client";

import React from "react";
import type { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import { Address, AddressInput, EtherInput } from "~~/components/scaffold-eth";
import Tipping from "~~/components/scaffold-eth/Tipping";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const Profile: NextPage = () => {
  //HOOK: useState
  const [toAddress, setToAddress] = React.useState("");
  const [etherAmount, setEtherAmount] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userHandle, setUserHandle] = React.useState("");

  //HOOK: useScaffoldContractRead | get: email
  const { data: userEmailData } = useScaffoldContractRead({
    contractName: "UserContract",
    functionName: "email",
    args: [toAddress],
  });

  //HOOK: useScaffoldContractRead | get: userHandle
  const { data: userHandleData } = useScaffoldContractRead({
    contractName: "UserContract",
    functionName: "handle",
    args: [toAddress],
  });

  //HOOK: useScaffoldContractRead | get: balance
  const { data: balance } = useScaffoldContractRead({
    contractName: "OriginalContract",
    functionName: "balance",
    args: [toAddress],
  });

  //HOOK: useScaffoldContractWrite | set: transfer balance
  const { writeAsync: transfer } = useScaffoldContractWrite({
    contractName: "OriginalContract",
    functionName: "transfer",
    args: [toAddress, parseEther(etherAmount)],
  });

  // Update state with fetched data
  React.useEffect(() => {
    if (userEmailData) {
      setUserEmail(userEmailData);
    }

    if (userHandleData) {
      setUserHandle(userHandleData);
    }
  }, [userEmailData, userHandleData]);

  return (
    <>
      <div className="app backgr">
        {/* BG */}
        <div className="">
          <div className="base one"></div>
          <div className="base two"></div>
          <div className="base three"></div>
        </div>

        {/* CONTENT */}
        <div className="cont z-10">
          <div className="prof">
            <Address address={toAddress} />

            <div className="nickname text-2xl font-bold mb-5">{userHandle}</div>
            <div className="nickname text-2xl font-bold mb-5">{userEmail}</div>
            <div className="text-4xl mb-5">
              {balance ? formatEther(balance) : "0"}
              <span className="text-xl"> tips</span>
            </div>

            <SocialIcons />
          </div>

          {/* Scroll Snap */}
          <div className="scr">
            {/* Card 3 */}
            <div className="scr-item pattern-03">
              <div className="left">
                <div className="font-semibold">❤️</div>
                <div className="top">tips accepted till the moon</div>
                <div className="">Exp 24:00</div>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <AddressInput
              value={toAddress}
              placeholder="0x..."
              onChange={v => {
                setToAddress(v);
              }}
            />
          </div>

          <div className="mb-5">
            <EtherInput
              value={etherAmount}
              placeholder="ETH"
              onChange={v => {
                setEtherAmount(v);
              }}
            />
          </div>

          <button className="btn btn-wide btn-secondary">
            <span>$5</span>
            <span>x ETH</span>
          </button>
          <button className="btn btn-wide btn-secondary">$10</button>
          <button className="btn btn-wide btn-secondary">$15</button>

          {/* <div>
            <h1>USD to ETH Converter</h1>
            <UsdToEthConverter />
            <UsdToEthDisplayButton tipAmount={5} hearts="❤️" />
            <UsdToEthDisplayButton tipAmount={10} hearts="❤️❤️" />
            <UsdToEthDisplayButton tipAmount={15} hearts="❤️❤️❤️"/>
          </div>

          <button className="btn btn-neutral" onClick={() => transfer()}>
            Tip Now
          </button> */}

          <Tipping />
        </div>
      </div>
    </>
  );
};

export default Profile;
