import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = (e: any) => {
    e.preventDefault();

    // db.collection("posts").add({
    //   username: "happystark",
    //   displayName: "Atharva Deosthale",
    //   avatar:
    //     "https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-1/c0.33.200.200a/p200x200/51099653_766820610355014_8315780769297465344_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=c1qBHkwAgVsAX8KynKU&_nc_ht=scontent-bom1-1.xx&oh=340b05bea693dd1671296e0c2d004bb3&oe=5F84CA62",
    //   verified: true,
    //   text: tweetMessage,
    //   image: tweetImage,
    // });

    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="pb-2 pr-2">
      <form className="flex flex-col">
        <div className="flex p-5">
          <Avatar src="https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-1/c0.33.200.200a/p200x200/51099653_766820610355014_8315780769297465344_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=c1qBHkwAgVsAX8KynKU&_nc_ht=scontent-bom1-1.xx&oh=340b05bea693dd1671296e0c2d004bb3&oe=5F84CA62" />
          <input
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
            placeholder="What's happening?"
            type="text"
            className="ml-5 text-xl border-none focus:outline-none"
          />
        </div>
        <button
          onClick={sendTweet}
          type="submit"
          className="border-none text-white font-bold rounded-2xl h-11 mt-5 ml-auto bg-black w-40"
        >
          Tweet
        </button>
      </form>
    </div>
  );
}

export default TweetBox;
