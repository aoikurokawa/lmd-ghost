import React from "react";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import Sidebar from "../src/components/Sidebar";
import Feed from "../src/components/Feed";
import { NextPage } from "next";

// const AppWithProvider = () => {
//   const wallets = [new PhantomWalletAdapter({ network: endpoint })];
//   return (
//     <ConnectionProvider endpoint={endpoint}>
//       <WalletProvider wallets={wallets} autoConnect>
//         <WalletModalProvider>
//           <App />
//         </WalletModalProvider>
//       </WalletProvider>
//     </ConnectionProvider>
//   );
// };

const Home: NextPage = () => {
  return (
    <div className="flex h-screen max-w-7xl ml-auto mr-auto">
      <Sidebar />
      <Feed />
    </div>
  );
};

export default Home;
