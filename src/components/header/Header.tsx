import React from "react";
import Logo from "../logo/Logo";
import ToggleDarkmode from "../toggleDarkmode/ToggleDarkmode";

const Header = () => {
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
      </div>
    </>
  );
};

export default Header;
