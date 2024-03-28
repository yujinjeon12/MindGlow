"use client";
import React from "react";
import { useInput } from "@/hooks/useInput";

const Login = () => {
  const { value, onChangeValue } = useInput("");
  return (
    <input
      value={value}
      onChange={onChangeValue}
    />
  );
};

export default Login;
