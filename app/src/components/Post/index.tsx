import { Avatar } from "@mui/material";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  Publish,
  Repeat,
  VerifiedUser,
} from "@mui/icons-material";
import React from "react";

function Post({ displayName, username, verified, text, image, avatar }: any) {
  return (
    <div className="flex items-start">
      <div className="p-5">
        <Avatar src={avatar} />
      </div>
      <div className="flex-1 p-2">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {displayName}{" "}
              <span className="font-medium text-xs #f9fafb">
                {verified && <VerifiedUser className="text-xs" />} @{username}
              </span>
            </h3>
          </div>
          <div className="text-xs mb-5">
            <p>{text}</p>
          </div>
        </div>
        <img src={image} alt="" />
        <div className="flex justify-between mt-2">
          <ChatBubbleOutline fontSize="small" />
          <Repeat fontSize="small" />
          <FavoriteBorder fontSize="small" />
          <Publish fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default Post;
