import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

import Post from "./Post";
import TweetBox from "./TweetBox";
// import { IRootState } from "../../store/index";
import { fetchTweets, fetchAllTweets } from "../api/fetch-tweets";
import { Wallet } from "@project-serum/anchor";

interface IFeed {
  id: string;
  publicKey: string;
  topic: string;
  content: string;
}

function Feed() {
  const [posts, setPosts] = useState<IFeed[]>([]);
  const { connected, wallet, publicKey, signTransaction, signAllTransactions } =
    useWallet();

  const signerWallet = {
    publicKey: publicKey!,
    signTransaction: signTransaction!,
    signAllTransactions: signAllTransactions!,
  };

  useEffect(() => {
    const data = fetchTweets();

    // @ts-ignore
    setPosts(data);

    const fetchAll = async () => {
      try {
        const tweets = await fetchAllTweets(signerWallet);
        console.log("Tweets: ", tweets);
      } catch (e) {
        console.error(e);
      }
    };

    if (connected) {
      fetchAll();
    }

    // db.collection("posts").onSnapshot((snapshot) => {
    //   setPosts(snapshot.docs.map((doc) => doc.data()));
    // });
  }, [connected, wallet]);

  return (
    <>
      <div className="flex-1 min-w-fit overflow-y-scroll">
        {connected ? (
          <TweetBox />
        ) : (
          <div className="pb-2 pr-2 mx-2 text-center text-lg">
            Connect your wallet to start tweeting...
          </div>
        )}
        {posts.map((post) => (
          <Post
            key={post.id}
            publicKey={post.publicKey}
            topic={post.topic}
            content={post.content}
          />
        ))}
      </div>
    </>
  );
}

export default Feed;
