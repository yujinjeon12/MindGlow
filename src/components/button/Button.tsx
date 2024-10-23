import React from "react";
import { ButtonProps } from "@/types/types";

const Button = ({
  bgColor,
  textColor,
  value,
  option,
  onClick,
  children,
  disabled = false // 기본값 설정
}: ButtonProps) => {
  return (
    <button
      className={`font-bold align-middle ${bgColor} ${textColor} ${option} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`} // 비활성화 시 불투명도, 커서 스타일 적용
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {value}
    </button>
  );
};

export default Button;
