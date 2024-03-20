import React from "react";
import Logo from "../logo/Logo";
import ToggleDarkmode from "../toggleDarkmode/ToggleDarkmode";
import Button from "../button/Button";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <>
      <div className="min-h-14 md:min-h-14 py-4">
        <Logo />
        <p className="hidden md:inline-block mr-4 md:mr-16 align-middle font-bold text-black dark:text-white">
          감정일기 쓰기
        </p>
        <p className="hidden md:inline-block mr-16 align-middle font-bold text-base text-black dark:text-white">
          감정 분석
        </p>
        <ToggleDarkmode />
        <Link href="/login">
          <Button
            bgColor="bg-green"
            textColor="text-white"
            value="글쓰기"
            option="ml-2 md:ml-8 px-2 py-1 text-sm md:text-base"
          />
        </Link>
        <Link href="/login">
          <Button
            bgColor="bg-white"
            textColor="text-black"
            value="로그인"
            option="ml-2 md:ml-4 border border-gray dark:border-white px-2 py-1 text-sm md:text-base"
          />
        </Link>
      </div>
    </>
  );
};

export default Header;
