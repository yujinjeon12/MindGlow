"use client";
import React, { useEffect, useRef } from "react";
import { useInput } from "@/hooks/useInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import Link from "next/link";
import ToastProvider from "@/components/toastProvider/ToastProvider";
import { toast } from "react-toastify";
import Logo from "@/components/logo/Logo";

const Login = () => {
  const router = useRouter();
  const email = useInput("");
  const password = useInput("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email: email.value,
        password: password.value,
        redirect: false,
      }).then((res) => {
        if (res?.error) {
          toast.error("아이디 또는 비밀번호가 일치하지 않습니다.");
          email.setValue("");
          password.setValue("");
        } else {
          toast.success("로그인 되었습니다.");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      });
    } catch (e) {
      toast.error("다시 시도해주세요.");
    }
  };
  return (
    <>
      <ToastProvider />
      <section className="flex justify-center items-start h-full flex-wrap bg-white dark:bg-black">
        <div className="flex flex-wrap p-8 md:p-12 mt-40 max-w-lg md:border border-light-gray dark:border-dark-gray rounded-md">
          <Logo />
          <h1 className="w-full text-4xl font-bold mt-8 mb-14 text-black dark:text-white">
            로그인
          </h1>
          <form
            className="w-full"
            onSubmit={onSubmit}
          >
            <input
              type="email"
              className="w-full border-solid border-2  border-light-gray p-2 mb-4"
              placeholder="이메일"
              value={email.value}
              onChange={email.onChangeValue}
              ref={inputRef}
            />
            <input
              type="password"
              className="w-full border-solid border-2  border-light-gray p-2 mb-4"
              placeholder="비밀번호"
              autoComplete="on"
              value={password.value}
              onChange={password.onChangeValue}
            />
            <Button
              bgColor="bg-dark-gray"
              textColor="text-white"
              value="로그인"
              option="w-full px-2 py-1 text-sm md:text-base h-11 bg-pink"
            />
          </form>
          <Link
            href="/signup"
            className="w-full"
          >
            <p className="mt-12 underline text-black dark:text-white">
              가입하기
            </p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Login;
