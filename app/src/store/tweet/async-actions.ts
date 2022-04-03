import {
  Connection,
  PublicKey,
  clusterApiUrl,
  ConfirmOptions,
} from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";

import idl from "../../idl.json";
import { Tweet } from "../../models/index";

const network = "http://127.0.0.1:8899";

const programID = new PublicKey(idl.metadata.address);

const opts: ConfirmOptions = {
  preflightCommitment: "processed",
};

const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  // @ts-ignore
  const provider = new Provider(connection, window.solana, opts);
  return provider;
};

export const fetchTweets = async () => {
  try {
    const provider = getProvider();
    // @ts-ignore
    const program = new Program(idl, programID, provider);
    const tweets = await program.account.tweet.all();
    console.log(tweets);
    // return tweets;
  } catch (error) {
    console.error("ERROR: ", error);
  }
};

// 1. Define the sendTweet endpoint.
export const sendTweet = async (topic: string, content: string) => {
  const provider = getProvider();
  // @ts-ignore
  const program = new Program(idl, programID, provider);

  const tweet = web3.Keypair.generate();

  await program.rpc.sendTweet(topic, content, {
    accounts: {
      author: provider.wallet.publicKey,
      tweet: tweet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [tweet],
  });

  const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

  return new Tweet(tweet.publicKey, tweetAccount);
};
