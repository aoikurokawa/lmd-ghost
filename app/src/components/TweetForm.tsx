import React, { useState } from "react";
import { sendTweet } from "../store/tweet/async-actions";

function TweetForm() {
  
  return (
    <div className="px-8 py-4 border-b">
      <textarea
        rows={1}
        className="text-xl w-full focus:outline-none resize-none mb-3"
        placeholder="What's happening?"
      ></textarea>
      <div className="flex flex-wrap items-center justify-between -m-2">
        <div className="relative m-2 mr-4">
          <input
            type="text"
            placeholder="topic"
            className="text-pink-500 rounded-full pl-10 pr-4 py-2 bg-gray-100"
          />
          <div className="absolute left-0 inset-y-0 flex pl-3 pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 m-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-6 m-2 ml-auto">
          <div>
            <button className="text-white px-4 py-2 rounded-full font-semibold">
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetForm;
