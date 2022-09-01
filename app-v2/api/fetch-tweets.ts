import { AnchorProvider, Idl, Program, Wallet } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";

import idl from "../idl.json";

import { network, programID } from "../utils/config";

export const fetchTweets = () => {
  return [
    {
      id: "1",
      publicKey: "ChAaKLTp72dnt7T2GjijLwPsvyxGeaC1PpKx3fik5fkm",
      topic: "Tropical Food",
      content: "Very delicious",
    },
    {
      id: "2",
      publicKey: "ChAaKLTp72dnt7T2GjijLwPsvyxGeaC1PpKx3fik5fkm",
      topic: "Tropical Food",
      content: "Very delicious",
    },
    {
      id: "3",
      publicKey: "ChAaKLTp72dnt7T2GjijLwPsvyxGeaC1PpKx3fik5fkm",
      topic: "Tropical Food",
      content: "Very delicious",
    },
  ];
};

// export const fetchTweets = async () => {
//   const
// }

export const getProgram = (wallet: any) => {
  const connection = new Connection(network, "finalized");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "finalized",
  });
  const program = new Program(idl as Idl, programID, provider);

  return {
    connection,
    provider,
    program,
  };
};

export const fetchAllTweets = async (wallet: any) => {
  // const connection = new Connection(network, "finalized");
  // const provider = new AnchorProvider(connection, wallet, {
  //   preflightCommitment: "finalized",
  // });
  // const program = new Program(idl as Idl, programID, provider);

  const { program } = getProgram(wallet);

  const tweets = await program.account.tweet.all();
  return tweets;
};
