import React from "react";
import Header from "@/components/header/Header";
import Canvas from "@/components/canvas/Canvas";

const WriteEmotion = () => {
  return (
    <>
      <div className="container h-screen overflow-hidden mx-auto text-center max-w-sm md:max-w-3xl lg:max-w-4xl">
        <Header />
        <Canvas />
      </div>
    </>
  );
};

export default WriteEmotion;
