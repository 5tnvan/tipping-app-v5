// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import type { NextPage } from "next";
// import { TimeAgo } from "~~/components/app/TimeAgo";
// import { Address } from "~~/components/scaffold-eth/Address";
// import { useAuthentication } from "~~/hooks/app/useAuthentication";
// import "~~/styles/app-reuse.css";
// import "~~/styles/app.css";

// // Component definition
// const SettingsWallet: NextPage = () => {
//   const { isAuth, profile } = useAuthentication();
//   const [isWallet, setIsWallet] = useState(false);
//   const [isWalletVerified, setIsWalletVerified] = useState(false);

//   useEffect(() => {
//     if (profile.wallet_id) {
//       setIsWallet(true);
//     }
//     if (profile.wallet_sign_hash) {
//       setIsWalletVerified(true);
//     }
//   }, [profile.wallet_id, profile.wallet_sign_hash]);

//   const router = useRouter();

//   /* ROUTE */
//   if (isAuth == "no") {
//     router.push("/login");
//   }

//   // Function to handle click
//   const handleClick = () => {
//     router.push("/settings/wallet/connect");
//   };

//   if (isAuth == "yes") {
//     return (
//       <>
//         <div className="cont z-10">
//           {!isWallet && (
//             <div className="btn btn-default" onClick={handleClick}>
//               Connect your wallet
//             </div>
//           )}
//           {isWallet && !isWalletVerified && (
//             <>
//               <Address address={profile.wallet_id || ""} />
//               <div className="btn btn-default" onClick={handleClick}>
//                 Verify your wallet{" "}
//               </div>
//             </>
//           )}
//           {isWallet && isWalletVerified && (
//             <>
//               <Address address={profile.wallet_id || ""} />
//               <div>Verified</div>
//               <div>
//                 <TimeAgo timestamp={profile.wallet_sign_timestamp} />
//               </div>
//               <div className="btn btn-default" onClick={handleClick}>
//                 Update
//               </div>
//             </>
//           )}
//         </div>
//       </>
//     );
//   }
// };

// export default SettingsWallet;
