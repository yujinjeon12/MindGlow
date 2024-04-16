import React from "react";
import Canvas from "@/components/canvas/Canvas";
import Header from "@/components/header/Header";

const Emotions = () => {
  return (
    <>
      <div className="container mx-auto text-center max-w-sm md:max-w-3xl lg:max-w-4xl">
        <Header />
        <Canvas />
      </div>
    </>
  );
};

export default Emotions;
