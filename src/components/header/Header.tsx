"use client";

import React, { useState, useEffect } from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../logo/Logo";
import ToggleDarkmode from "../toggleDarkmode/ToggleDarkmode";
import Button from "../button/Button";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const pathname = usePathname();
  
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="min-h-14 md:min-h-14 py-4">
        <Logo/>
        <Link
          href="/"
          className={`hidden md:inline-block mr-8 md:mr-16 align-middle font-bold ${
            pathname == "/" ? "text-pink" : "text-black dark:text-white"
          }`}
        >
          감정 일기 모아보기
        </Link>
        <Link
          href="/write-emotion"
          className={`hidden md:inline-block mr-8 md:mr-16 align-middle font-bold ${
            pathname == "/write-emotion" ? "text-pink" : "text-black dark:text-white"
          }`}
        >
          감정 일기 쓰기
        </Link>
        <ToggleDarkmode />
        {
          // 로그인 상태일 때
          session && session?.user?.email ? (
            <>
              <Button
                bgColor="bg-white"
                textColor="text-black"
                value="로그아웃"
                option="ml-4 md:ml-16 border border-gray dark:border-white px-2 py-1 text-sm md:text-base rounded-md"
                onClick={() => signOut()}
              />
            </>
          ) : (
            <Button
              bgColor="bg-white"
              textColor="text-black"
              value="로그인"
              option="ml-4 md:ml-16 border border-gray dark:border-white px-2 py-1 text-sm md:text-base rounded-md"
              onClick={() => signIn()}
            />
          )
        }
      </div>
      <MobileHeader/>
    </>
  );
};

export default Header;
