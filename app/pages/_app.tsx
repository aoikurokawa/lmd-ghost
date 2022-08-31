import Head from "next/head";
import "../styles/globals.css";

import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  // SolflareWalletAdapter,
  // SolletWalletAdapter,
  // SlopeWalletAdapter,
  // BitpieWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { Provider } from "react-redux";

import store from "../src/store";

// const devnet = clusterApiUrl("devnet");
// const network = devnet;

const MyApp = ({ Component, pageProps }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      // new SolflareWalletAdapter(),
      // new SolletWalletAdapter(),
      // new SlopeWalletAdapter(),
      // new BitpieWalletAdapter(),
    ],
    []
  );
  return (
    <>
      <Head>
        <title>Twitterrrr</title>
      </Head>
      <Provider store={store}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletDialogProvider>
              <Component {...pageProps} />
            </WalletDialogProvider>
          </WalletProvider>
        </ConnectionProvider>
      </Provider>
    </>
  );
};

export default MyApp;
