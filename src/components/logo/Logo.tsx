import React from "react";
import Image from "next/image";
import { APP_NAME, LOGO_PATH } from "@/constants/path";
import Link from 'next/link';

const Logo = () => {
  return (
    <>
      <Link href="/" aria-label={APP_NAME}>
        <Image
          src={LOGO_PATH}
          alt={APP_NAME}
          width={20}
          height={20}
          className="inline-block"
        />
        <span className="text-black dark:text-white last:inline-block ml-2 mr-4 md:mr-20 align-middle font-bold text-lg">
          {APP_NAME}
        </span>
      </Link>
    </>
  );
};

export default Logo;
