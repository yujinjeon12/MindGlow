import React from "react";
import Image from "next/image";
import { APP_NAME, LOGO_PATH } from "@/constants/path";

const Logo = () => {
  return (
    <>
      <Image
        src={LOGO_PATH}
        alt={APP_NAME}
        width={24}
        height={24}
      />
      <span className="underline">{APP_NAME}</span>
    </>
  );
};

export default Logo;
