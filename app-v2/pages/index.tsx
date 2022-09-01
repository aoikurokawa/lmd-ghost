import React from "react";
import { NextPage } from "next";

import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex max-w-7xl ml-auto mr-auto mt-20">
        <Sidebar />
        <Feed />
      </div>
    </div>
  );
};

export default Home;
