"use client";
import React, { useEffect } from "react";
import Logo from "../logo/Logo";
import ToggleDarkmode from "../toggleDarkmode/ToggleDarkmode";
import Button from "../button/Button";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.value);
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <div className="min-h-14 md:min-h-14 py-4">
        <Logo />
        <Link
          href="/emotions"
          className="hidden md:inline-block mr-4 md:mr-16 align-middle font-bold text-black dark:text-white"
        >
          감정일기 쓰기
        </Link>
        <p className="hidden md:inline-block mr-16 align-middle font-bold text-base text-black dark:text-white">
          감정 분석
        </p>
        <ToggleDarkmode />
        <Button
          bgColor="bg-green"
          textColor="text-white"
          value="글쓰기"
          option="ml-2 md:ml-8 px-2 py-1 text-sm md:text-base"
        />
        {
          // 로그인 상태일 때
          session && session?.user?.email ? (
            <>
              <Button
                bgColor="bg-white"
                textColor="text-black"
                value="로그아웃"
                option="ml-2 md:ml-4 border border-gray dark:border-white px-2 py-1 text-sm md:text-base"
                onClick={() => signOut()}
              />
            </>
          ) : (
            <Button
              bgColor="bg-white"
              textColor="text-black"
              value="로그인"
              option="ml-2 md:ml-4 border border-gray dark:border-white px-2 py-1 text-sm md:text-base"
              onClick={() => signIn()}
            />
          )
        }
      </div>
    </>
  );
};

export default Header;
