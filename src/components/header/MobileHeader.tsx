"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileHeader = () => {
  const pathname = usePathname();
  
  return (
    <div className="p-2 border-y border-light-gray block md:hidden bg-white dark:bg-black text-left">
      <Link href="/">
        <span className={`px-4 sm:px-8 text-sm font-base ${pathname == "/" ? "text-pink" : "text-black dark:text-white"}`}>
          감정 일기 모아보기
        </span>
      </Link>
      <Link href="/write-emotion">
        <span className={`text-sm font-base cursor-pointer ${pathname == "/write-emotion" ? "text-pink" : "text-black dark:text-white"}`}>
          감정 일기 쓰기
        </span>
      </Link>
    </div>
  );
};

export default MobileHeader;
