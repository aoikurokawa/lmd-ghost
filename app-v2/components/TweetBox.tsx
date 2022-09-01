// import { Avatar, Button } from "@mui/material";
import { web3 } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { getProgram } from "../api";

function TweetBox() {
  const [tweetTopic, setTweetTopic] = useState("");
  const [tweetContent, setTweetContent] = useState("");

  const { connected, wallet, publicKey, signTransaction, signAllTransactions } =
    useWallet();

  const signerWallet = {
    publicKey: publicKey!,
    signTransaction: signTransaction!,
    signAllTransactions: signAllTransactions!,
  };

  const sendTweet = async (e: any) => {
    e.preventDefault();

    const tweet = web3.Keypair.generate();

    const { program, provider } = getProgram(signerWallet);

    try {
      await program.methods
        .sendTweet(tweetTopic, tweetContent)
        .accounts({
          author: provider.wallet.publicKey,
          tweet: tweet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([tweet])
        .rpc();

      const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

      console.log(tweetAccount);
    } catch (e) {
      console.error(e);
    }

    setTweetContent("");
  };

  return (
    <div className="pb-2 pr-2 border mx-2">
      <form className="flex flex-col">
        <div className="flex p-5">
          <textarea
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            placeholder="What's happening?"
            rows={2}
            className="ml-5 text-xl focus:outline-none w-full border p-4 rounded-md"
          />
        </div>
        <div className="px-5 flex justify-between">
          <input
            className="ml-5 border focus:outline-none rounded-md p-4"
            placeholder="#topic"
            value={tweetTopic}
            onChange={(e) => setTweetTopic(e.target.value)}
          />
          <button
            onClick={sendTweet}
            type="submit"
            className="border-none text-white font-bold rounded-2xl h-11 mt-1 ml-auto bg-black w-40"
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
