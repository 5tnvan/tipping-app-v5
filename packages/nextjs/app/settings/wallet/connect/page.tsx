// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { updateProfileWallet } from "../../actions";
// import type { NextPage } from "next";
// import { recoverMessageAddress } from "viem";
// import { useAccount, useSignMessage } from "wagmi";
// import { Address } from "~~/components/scaffold-eth/Address";
// import { useAuthentication } from "~~/hooks/app/useAuthentication";
// import "~~/styles/app-reuse.css";
// import "~~/styles/app.css";

// const SettingsWallet: NextPage = () => {
//   const router = useRouter();
//   const { isAuth, profile, refetch } = useAuthentication();
//   const [isWallet, setIsWallet] = useState(false);
//   const [isWalletVerified, setIsWalletVerified] = useState(false);
//   const { address } = useAccount();
//   const { data: signMessageData, error, signMessage, variables } = useSignMessage();

//   React.useEffect(() => {
//     (async () => {
//       if (variables?.message && signMessageData) {
//         await recoverMessageAddress({
//           message: variables?.message,
//           signature: signMessageData,
//         });
//       }

//       if (signMessageData) {
//         updateProfileWallet(address, signMessageData, new Date().toISOString());
//         refetch();
//       }
//     })();
//   }, [signMessageData, variables?.message]);

//   /* ROUTE */
//   if (isAuth == "no") {
//     router.push("/login");
//   }

//   useEffect(() => {
//     if (profile.wallet_id) {
//       setIsWallet(true);
//     }
//     if (address) {
//       setIsWallet(true);
//     }

//     if (profile.wallet_sign_hash) {
//       setIsWalletVerified(true);
//     } else {
//       setIsWalletVerified(false);
//     }
//   }, [address, profile]);

//   // Renders HTML
//   if (isAuth == "yes") {
//     return (
//       <>
//         {/* CONTENT */}
//         <div className="cont z-10 w-96">
//           {isWallet && isWalletVerified ? (
//             <>
//               <div className="font-semibold text-3xl">{"It's done 🎉"}</div>
//               <div className="mb-5">You are all set.</div>
//             </>
//           ) : (
//             <>
//               <div className="font-semibold text-3xl">{"Link and verify"}</div>
//               <div className="mb-5">the ownership of your wallet. {"It’s free of charge."}</div>
//             </>
//           )}

//           {/* Steps */}
//           <ul className="steps steps-vertical lg:steps-vertical">
//             {/* 1.Select a network */}
//             <li className="step step-primary">
//               <div>Select a network</div>
//               <div className="ml-10">Eth</div>
//             </li>

//             {/* 2.Link your wallet */}
//             {isWallet && (
//               <li className="step step-primary">
//                 <div className="font-semibold">Link your wallet</div>
//                 <div className="flex flex-col ml-10">
//                   <Address address={profile.wallet_id || address} />
//                 </div>
//               </li>
//             )}

//             {/* 2.Verify ownership */}
//             {!isWallet && (
//               <li className="step ">
//                 <div>Verify ownership</div>
//                 <button type="button" className="btn glass ml-10 w-72" disabled>
//                   Sign a message
//                 </button>
//               </li>
//             )}
//             {isWallet && !isWalletVerified && (
//               <li className="step ">
//                 <div>Verify ownership</div>
//                 <button
//                   className="btn btn-glass ml-10 w-72"
//                   onClick={() => {
//                     signMessage({ message: "your_message_here" });
//                   }}
//                 >
//                   Sign a message
//                 </button>
//               </li>
//             )}
//             {isWallet && isWalletVerified && (
//               <li className="step step-primary">
//                 <div className="font-semibold">Verify ownership</div>
//                 <div className="ml-10 w-72 text-left">
//                   {
//                     <>
//                       <div>Signed</div>
//                       <div className="">{profile.wallet_sign_hash}</div>
//                       <div className="">{profile.wallet_sign_timestamp}</div>
//                     </>
//                   }
//                 </div>
//               </li>
//             )}
//           </ul>
//           {signMessageData && (
//             <div>
//               <div>Signature: {signMessageData}</div>
//             </div>
//           )}

//           {error && <div>{error.message}</div>}
//         </div>
//       </>
//     );
//   }
// };

// export default SettingsWallet;
