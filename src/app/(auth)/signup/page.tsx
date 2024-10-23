"use client";
import React, { useEffect, useState } from "react";
import { useInput } from "@/hooks/useInput";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import ToastProvider from "@/components/toastProvider/ToastProvider";
import { toast } from "react-toastify";
import Logo from "@/components/logo/Logo";
import TermsModal from "./TermsModal";

const Signup = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false); // 회원가입 상태를 관리하는 변수

  const email = useInput("");
  const name = useInput("");
  const password = useInput("");
  const passwordCheck = useInput("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    // 이메일 형식 정규 표현식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password: string) => {
    // 비밀번호는 최소 8자, 대문자, 소문자, 숫자, 특수문자를 포함해야 한다는 예시
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSigningUp) return; // 이미 회원가입 중이면 아무 동작도 하지 않음

    if (!termsAccepted) {
      alert("약관에 동의해 주시기 바랍니다.");
      return;
    }
    if (!validateEmail(email.value)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
    if (!validatePassword(password.value)) {
      alert("비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자 및 특수 문자를 포함해야 합니다.");
      return;
    }
    if (password.value !== passwordCheck.value) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSigningUp(true); // 회원가입 중 상태로 변경

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
        }, 500);
      } else {
        toast.error(data.message);
        setIsSigningUp(false);
      }
    } catch (e) {
      setIsSigningUp(false);
    }
  };
  return (
    <>
      <ToastProvider />
      <section
        className={`flex justify-center items-start h-full flex-wrap bg-white dark:bg-black`}
      >
        <div className="flex flex-wrap p-8 md:p-12 mt-20 max-w-lg md:border border-light-gray dark:border-dark-gray rounded-md">
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
            {/** 약관 동의 */}
            <div className="text-left mb-4">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <label className="ml-2">
                <span onClick={() => setIsModalOpen(true)} className="underline cursor-pointer">약관 및 개인정보 처리 방침</span>에 동의합니다.
              </label>
            </div>
            {/* 모달 컴포넌트 추가 */}
            <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <Button
              bgColor="bg-pink"
              textColor="text-white"
              value={isSigningUp ? "회원가입 처리 중..." : "회원가입"}
              option="w-full px-2 py-1 text-sm md:text-base h-11 rounded-sm"
              disabled={isSigningUp} // 회원가입 중 버튼 비활성화
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
