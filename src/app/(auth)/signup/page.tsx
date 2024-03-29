"use client";
import React, { useState } from "react";
import { useInput } from "@/hooks/useInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import Link from "next/link";

const Signup = () => {
  const id = useInput("");
  const password = useInput("");
  const passwordCheck = useInput("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    try {
      await signIn("credentials", {
        id: id.value,
        password: password.value,
        redirect: false,
      });
      router.push("/");
    } catch (e) {
      setMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <>
      <div className="flex flex-wrap px-4 md:px-8">
        <h1 className="w-full text-2xl font-bold mb-10">회원가입</h1>
        <form
          className="w-full"
          onSubmit={onSubmit}
        >
          <input
            className="w-full border-solid border-2  border-light-gray p-2 mb-2"
            placeholder="아이디"
            value={id.value}
            onChange={id.onChangeValue}
          />
          <input
            className="w-full border-solid border-2  border-light-gray p-2 mb-2"
            placeholder="비밀번호"
            value={password.value}
            onChange={password.onChangeValue}
          />
          <input
            className="w-full border-solid border-2  border-light-gray p-2"
            placeholder="비밀번호확인"
            value={passwordCheck.value}
            onChange={passwordCheck.onChangeValue}
          />
          <p className="w-full text-sm text-pink my-2">{message}</p>
          <Button
            bgColor="bg-dark-gray"
            textColor="text-white"
            value="회원가입"
            option="w-full px-2 py-1 text-sm md:text-base"
            onClick={() => console.log("login")}
          />
        </form>
        <Link
          href="/signup"
          className="w-full"
        ></Link>
      </div>
    </>
  );
};

export default Signup;
