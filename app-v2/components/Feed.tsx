import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// import Post from "../Post";
import TweetBox from "./TweetBox";
// import { IRootState } from "../../store/index";
// import { fetchTweets } from "../../store/tweet/async-actions";

function Feed() {
  const [posts, setPosts] = useState([]);

  // const { data } = useSelector((state: IRootState) => state.chain);

  // useEffect(() => {
  // fetchTweets();
  // db.collection("posts").onSnapshot((snapshot) => {
  //   setPosts(snapshot.docs.map((doc) => doc.data()));
  // });
  // }, [data]);

  return (
    <div className="flex-1 min-w-fit overflow-y-scroll">
      {/* <div className="bg-white z-50 px-4 py-5">
        <h2>Home</h2>
      </div> */}
      <TweetBox />
      {/* {data.walletAddress ? (
        
      ) : (
        <div className="">Connect your wallet to start tweeting...</div>
      )} */}
      {/* {posts.map((post) => (
          <Post
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
        ))} */}
    </div>
  );
}

export default Feed;
