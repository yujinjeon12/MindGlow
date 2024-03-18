import React from "react";
import Logo from "../logo/Logo";
import ToggleDarkmode from "../toggleDarkmode/ToggleDarkmode";
import Button from "../button/Button";

const Header: React.FC = () => {
  return (
    <>
      <div className="leading-10 mt-8">
        <Logo />
        <p className="inline-block mr-4 md:mr-16 align-middle font-bold text-black dark:text-white">
          감정 일기 쓰기
        </p>
        <p className="inline-block mr-16 align-middle font-bold text-base text-black dark:text-white">
          감정 분석
        </p>
        <ToggleDarkmode />
        <Button
          bgColor="green"
          textColor="white"
          value="글쓰기"
          option="ml-8"
        />
        <Button
          bgColor="white"
          textColor="black"
          value="로그인"
          option="ml-4 border border-gray dark:border-white"
        />
      </div>
    </>
  );
};

export default Header;
