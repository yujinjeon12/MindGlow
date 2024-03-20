import React from "react";
import { ButtonProps } from "@/types/types";

const Button: React.FC<ButtonProps> = ({
  bgColor,
  textColor,
  value,
  option,
}) => {
  return (
    <button
      className={`rounded-sm ${bgColor} ${textColor} font-bold ${option}`}
    >
      {value}
    </button>
  );
};

export default Button;
