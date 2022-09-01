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
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { connected, wallet, publicKey, signTransaction, signAllTransactions } =
    useWallet();

  const signerWallet = {
    publicKey: publicKey!,
    signTransaction: signTransaction!,
    signAllTransactions: signAllTransactions!,
  };

  useEffect(() => {
    setLoading(true);

    const fetchAll = async () => {
      let dataArray: any[] = [];
      try {
        const tweets = await fetchAllTweets(signerWallet);
        tweets.map((tweet) => {
          console.log(tweet);
          dataArray.push(tweet.account);
        });
        setPosts(dataArray);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    if (connected) {
      fetchAll();
    }
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
            key={`#post.author.toBase58()`}
            publicKey={post.author.toBase58()}
            topic={post.topic}
            content={post.content}
          />
        ))}
      </div>
    </>
  );
}

export default Feed;
