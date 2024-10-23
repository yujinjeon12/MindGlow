"use client";
import React, { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

import { useInput } from "@/hooks/useInput";
import Button from "@/components/button/Button";
import ToastProvider from "@/components/toastProvider/ToastProvider";
import Logo from "@/components/logo/Logo";

const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false); // 로그인 상태를 관리하는 변수

  const router = useRouter();
  const email = useInput("");
  const password = useInput("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoggingIn) return; // 이미 로그인 중이면 아무 동작도 하지 않음

    // 이메일과 비밀번호가 빈 값이면 에러 메시지를 출력하고 함수 종료
    if (!email.value.trim() || !password.value.trim()) {
      toast.error("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoggingIn(true); // 로그인 중 상태로 변경

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
          setIsLoggingIn(false);
        } else {
          toast.success("로그인 되었습니다.");
          setTimeout(() => {
            router.push("/");
            setIsLoggingIn(false);
          }, 500);
        }
      });
    } catch (e) {
      toast.error("다시 시도해주세요.");
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <ToastProvider />
      <section className="flex justify-center items-start h-full flex-wrap bg-white dark:bg-black">
        <div className="flex flex-wrap p-8 md:p-12 mt-20 max-w-lg md:border border-light-gray dark:border-dark-gray rounded-md">
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
              disabled={isLoggingIn} // 로그인 중일 때 입력 필드 비활성화
            />
            <input
              type="password"
              className="w-full border-solid border-2  border-light-gray p-2 mb-4"
              placeholder="비밀번호"
              autoComplete="on"
              value={password.value}
              onChange={password.onChangeValue}
              disabled={isLoggingIn} // 로그인 중일 때 입력 필드 비활성화
            />
            <Button
              bgColor="bg-dark-gray"
              textColor="text-white"
              value={isLoggingIn ? "로그인 처리 중..." : "로그인"}
              option="w-full px-2 py-1 text-sm md:text-base h-11 bg-pink rounded-sm"
              disabled={isLoggingIn} // 로그인 중일 때 버튼 비활성화
            />
          </form>
          <hr className="my-10 border border-light-gray w-full" />
          <Button
            bgColor="bg-white"
            textColor="text-black"
            value=""
            option="w-full px-2 py-1 text-sm md:text-base h-11 border border-gray rounded-sm"
            onClick={() => signIn("google")}
          >
            <div className="flex justify-center items-center relative">
              <Image
                src="/images/googleLogo.png"
                alt="google login"
                width={20}
                height={20}
                className="absolute left-2"
              ></Image>
              <span>Google 로그인</span>
            </div>
          </Button>
          <Link
            href="/signup"
            className="w-full"
          >
            <p className="mt-12 underline text-black dark:text-white text-left">
              가입하기
            </p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Login;
