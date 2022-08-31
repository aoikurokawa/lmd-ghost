import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl, ConfirmOptions } from "@solana/web3.js";

import Sidebar from "../src/components/Sidebar";
import Feed from "../src/components/Feed";

require("@solana/wallet-adapter-react-ui/styles.css");

const endpoint = "http://127.0.0.1:8899";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Feed />
    </div>
  );
}

const AppWithProvider = () => {
  const wallets = [new PhantomWalletAdapter({ network: endpoint })];
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
