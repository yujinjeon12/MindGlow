import type { Metadata } from "next";
import React from "react";
import Header from "../../components/header/Header";
import {
  title,
  description,
  favicon,
} from "@/components/common/shared-metadata";
import InnerHeader from "@/components/header/InnerHeader";

export const metadata: Metadata = {
  title: title,
  description: description,
  icons: favicon,
};

const Home: React.FC = () => {
  return (
    <>
      <div className="sticky top-0 bg-white dark:bg-black">
        <div className="container mx-auto text-center max-w-sm md:max-w-3xl lg:max-w-4xl">
          <Header />
        </div>
        <InnerHeader />
      </div>
    </>
  );
};

export default Home;
