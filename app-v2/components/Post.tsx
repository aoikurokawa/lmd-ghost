import React from "react";

function Post({ publicKey, topic, content }: any) {
  return (
    <div className="border m-4 p-3">
      <div className="post__header">
        <div className="">
          <h3 className="text-slate-600">Public Key: {publicKey} </h3>
        </div>
        <div className="text-lg my-4">
          <p>{content}</p>
        </div>
      </div>
      <div className="border rounded-xl p-2 w-fit">
        <p className="text-[#2fb4f9] text-sm">#{topic}</p>
      </div>
    </div>
  );
}

export default Post;
