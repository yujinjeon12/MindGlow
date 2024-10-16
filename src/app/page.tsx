import type { Metadata } from "next";
import React from "react";
import Canvas from "@/components/canvas/Canvas";
import Header from "@/components/header/Header";

import {
  title,
  description,
  favicon,
} from "@/components/common/shared-metadata";
import MobileHeader from "@/components/header/MobileHeader";
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
      <Header />
      <MobileHeader/>
      <Canvas />
    </>
  );
};

export default Home;
