import React from "react";
import { NextPage } from "next";

import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="flex h-screen max-w-7xl ml-auto mr-auto">
        <main>
          <Sidebar />
          <Feed />
        </main>
      </div>
    </>
  );
};

export default Home;
