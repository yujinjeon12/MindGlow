"use client";

import Link from "next/link";
import React from "react";

const MobileHeader = () => {
  const showEmotions = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // 기본 동작 방지
    alert('준비 중입니다.');
  };
  const triggerAnalysis = () => {
    console.log('clicked');
    alert('준비 중입니다.');
  }

  return (
    <div className="p-2 border-y border-light-gray block md:hidden bg-white dark:bg-black text-left">
      <Link href="/emotions" onClick={showEmotions}>
        <span className="px-4 sm:px-8 text-sm font-base dark:text-white">
          감정모아보기
        </span>
      </Link>

      <span 
        className="text-sm font-base dark:text-white cursor-pointer"
        onClick={triggerAnalysis}
      >
        감정 분석
      </span>
    </div>
  );
};

export default MobileHeader;
