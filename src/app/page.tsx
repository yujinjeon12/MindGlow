import type { Metadata } from "next";
import React from "react";
import Canvas from "@/components/canvas/Canvas";
import Header from "@/components/header/Header";

import {
  title,
  description,
  favicon,
} from "@/components/common/shared-metadata";
import InnerHeader from "@/components/header/InnerHeader";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: title,
  description: description,
  icons: favicon,
};

const Home = async () => {
  const session = await auth();

  return (
    <>
      <div className="sticky top-0 bg-white dark:bg-black">
        <div className="container h-screen overflow-hidden mx-auto text-center max-w-sm md:max-w-3xl lg:max-w-4xl">
          <Header />
          <InnerHeader/>
          <Canvas />
        </div>
      </div>
    </>
  );
};

export default Home;
