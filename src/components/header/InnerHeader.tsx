import React from "react";

const InnerHeader = () => {
  return (
    <div className="p-2 border-y border-light-gray block md:hidden bg-white dark:bg-black">
      <span className="px-4 sm:px-8 text-sm font-base dark:text-white">
        감정일기 쓰기
      </span>
      <span className="text-sm font-base dark:text-white">감정 분석</span>
    </div>
  );
};

export default InnerHeader;
