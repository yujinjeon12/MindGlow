import React from "react";
import { ButtonProps } from "@/types/types";

const Button = ({
  bgColor,
  textColor,
  value,
  option,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`rounded-sm ${bgColor} ${textColor} font-bold ${option}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
