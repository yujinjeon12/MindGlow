"use client";
import React, { useState, useEffect } from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import Logo from "../logo/Logo";
import ToggleDarkmode from "../toggleDarkmode/ToggleDarkmode";
import Button from "../button/Button";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const showEmotions = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // 기본 동작 방지
    alert('준비 중입니다.');
  };
  const triggerAnalysis = () => {
    console.log('clicked');
    alert('준비 중입니다.');
  }
  
  return (
    <>
      <div className="min-h-14 md:min-h-14 py-4">
        <Logo/>
        <Link
          href="/emotions"
          onClick={showEmotions}
          className="hidden md:inline-block mr-4 md:mr-16 align-middle font-bold text-black dark:text-white"
        >
          감정 모아보기
        </Link>
        <p 
          onClick={triggerAnalysis}
          className="hidden md:inline-block mr-16 align-middle font-bold text-base text-black dark:text-white cursor-pointer">
          감정 분석
        </p>
        <ToggleDarkmode />
        <Link href="/" aria-label="글쓰기">
          <Button
            bgColor="bg-green"
            textColor="text-white"
            value="글쓰기"
            option="ml-2 md:ml-8 px-2 py-1 text-sm md:text-base rounded-md"
          />
        </Link>
        {
          // 로그인 상태일 때
          session && session?.user?.email ? (
            <>
              <Button
                bgColor="bg-white"
                textColor="text-black"
                value="로그아웃"
                option="ml-2 md:ml-4 border border-gray dark:border-white px-2 py-1 text-sm md:text-base rounded-md"
                onClick={() => signOut()}
              />
            </>
          ) : (
            <Button
              bgColor="bg-white"
              textColor="text-black"
              value="로그인"
              option="ml-2 md:ml-4 border border-gray dark:border-white px-2 py-1 text-sm md:text-base rounded-md"
              onClick={() => signIn()}
            />
          )
        }
      </div>
    </>
  );
};

export default Header;
