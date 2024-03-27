import React from "react";
import { ButtonProps } from "@/types/types";

const Button: React.FC<ButtonProps> = ({
  bgColor,
  textColor,
  value,
  option,
  onClick,
}) => {
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
