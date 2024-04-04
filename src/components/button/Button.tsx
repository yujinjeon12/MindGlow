import React from "react";
import { ButtonProps } from "@/types/types";

const Button = ({
  bgColor,
  textColor,
  value,
  option,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`rounded-sm ${bgColor} ${textColor} font-bold ${option} align-middle`}
      onClick={onClick}
    >
      {children}
      {value}
    </button>
  );
};

export default Button;
