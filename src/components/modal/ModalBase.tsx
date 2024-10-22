import React from "react";
import { useRouter } from 'next/navigation'
import { IoIosCloseCircleOutline } from "react-icons/io";

type ModalBaseProps = {
  title: string;
  children: React.ReactNode;
  customStyles?: string;
  closeModal: () => void;
};

const ModalBase = ({ title, children, customStyles, closeModal }: ModalBaseProps) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-70">
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 sm:w-3/4 md:w-1/2 p-6 z-100 bg-white text-black dark:bg-dark-gray dark:text-white shadow-lg rounded-md opacity-100 ${customStyles}`}
        onClick={handleClick}
      >
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h3 className="font-semibold text-left mr-4">{title}</h3>
          <button
            onClick={closeModal}
            aria-label="Close Modal"
            className="rounded-full text-gray-800 hover:text-gray"
          >
            <IoIosCloseCircleOutline size={24}/>
          </button>
        </div>
        {/* 모달 본문 */}
        <div className="text-left pt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalBase;
