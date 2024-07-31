import React, { useState } from "react";

type ModalBaseProps = {
  children: React.ReactNode;
  customStyles?: string;
};

const Popover = ({ children, customStyles }: ModalBaseProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`bg-white text-black z-10 shadow-lg rounded-md ${customStyles}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Popover;
