import React from "react";
import { sendTweet } from "../api";

function TweetForm() {
  return (
    <div className="px-8 py-4 border-b">
      <textarea
        rows={1}
        className="text-xl w-full focus:outline-none resize-none mb-3"
        placeholder="What's happening?"
      ></textarea>
    </div>
  );
}

export default TweetForm;
