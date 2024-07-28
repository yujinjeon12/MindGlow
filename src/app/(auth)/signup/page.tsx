"use client";
import React, { useEffect } from "react";
import { useInput } from "@/hooks/useInput";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import ToastProvider from "@/components/toastProvider/ToastProvider";
import { toast } from "react-toastify";
import Logo from "@/components/logo/Logo";

const Signup = () => {
  const email = useInput("");
  const name = useInput("");
  const password = useInput("");
  const passwordCheck = useInput("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.value !== passwordCheck.value) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const data = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          name: name.value,
          password: password.value,
        }),
      }).then((res) => res.json());

      if (data.status === 200) {
        toast.success("회원가입이 완료되었습니다.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
    }
  };
  return (
    <>
      <ToastProvider />
      <section
        className={`flex justify-center items-start h-full flex-wrap bg-white dark:bg-black`}
      >
        <div className="flex flex-wrap p-8 md:p-12 mt-40 max-w-lg md:border border-light-gray dark:border-dark-gray rounded-md">
          <Logo />
          <h1
            className={`w-full text-3xl mt-8 md:text-4xl font-bold mb-14 text-black dark:text-white`}
          >
            회원가입
          </h1>
          <form
            className="w-full"
            onSubmit={onSubmit}
          >
            <input
              type="email"
              className="w-full border-solid border-2 border-light-gray p-2 mb-4"
              placeholder="이메일"
              value={email.value}
              onChange={email.onChangeValue}
            />
            <input
              className="w-full border-solid border-2 border-light-gray p-2 mb-4"
              placeholder="닉네임"
              value={name.value}
              onChange={name.onChangeValue}
            />
            <input
              type="password"
              className="w-full border-solid border-2 border-light-gray p-2 mb-4"
              placeholder="비밀번호"
              autoComplete="on"
              value={password.value}
              onChange={password.onChangeValue}
            />
            <input
              type="password"
              className="w-full border-solid border-2 border-light-gray p-2 mb-4"
              placeholder="비밀번호확인"
              autoComplete="on"
              value={passwordCheck.value}
              onChange={passwordCheck.onChangeValue}
            />
            <Button
              bgColor="bg-pink"
              textColor="text-white"
              value="회원가입"
              option="w-full px-2 py-1 text-sm md:text-base h-11 rounded-sm"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
