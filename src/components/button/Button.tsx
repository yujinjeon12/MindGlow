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
      className={`rounded-sm bg-${bgColor} text-${textColor} font-bold pr-4 pl-4 ${option}`}
    >
      {value}
    </button>
  );
};

export default Button;
