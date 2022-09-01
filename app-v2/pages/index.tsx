import React from "react";
import { NextPage } from "next";

import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen max-w-7xl ml-auto mr-auto">
      <Sidebar />
      <Feed />
    </div>
  );
};

export default Home;
