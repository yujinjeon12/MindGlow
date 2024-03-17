import type { Metadata } from "next";
import React from "react";
import Header from "../../components/header/Header";
import {
  title,
  description,
  favicon,
} from "@/components/common/shared-metadata";

export const metadata: Metadata = {
  title: title,
  description: description,
  icons: favicon,
};

const Home = () => {
  return (
    <>
      <div className="container mx-auto md:max-w-2xl">
        <Header />
      </div>
    </>
  );
};

export default Home;
