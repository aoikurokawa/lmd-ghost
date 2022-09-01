import { PublicKey } from "@solana/web3.js";

export const getTweet = async (publicKey: PublicKey) => {
  return {
    publicKey,
    topic: "solana",
    content: "gm",
    author_display: "B1Af..wtRN",
    created_at: "Nov 26, 2021 1:03PM",
    created_ago: "just now",
    timestamp: 1637932864,
  };
};
