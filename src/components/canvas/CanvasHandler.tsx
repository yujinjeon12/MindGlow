"use client";

import React, { useRef, MutableRefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { BsEraserFill } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { IoMdReturnLeft, IoMdReturnRight } from "react-icons/io";
import Button from "../button/Button";
import Popover from "../popover/Popover";
import { RootState } from "@/lib/store";
import {
  setLineWidth,
  setLineAlpha,
  setColor,
  setEraseMode,
  clearPaths,
  setModalOpen,
  undo,
  redo,
  setImageData,
} from "@/lib/features/canvas/CanvasSlice";

type CanvasComponentProps = {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}
const CanvasHandler = ({ canvasRef }: CanvasComponentProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const colorRef = useRef<HTMLInputElement>(null);
  const {
    paths,
    undonePaths,
    lineWidth,
    lineAlpha,
    color,
    modalIsOpen,
  } = useSelector((state: RootState) => state.CanvasReducer);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };
  const erase = () => {
    dispatch(setEraseMode(true));
  };
  const eraseAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      dispatch(clearPaths()); // Clear the paths and undone paths
      clearCanvas();
    }
  };
  const handleNext = () => {
    // 그림 완성 시 이미지 데이터를 상태로만 저장하고, S3 업로드는 나중에 수행
    // (글 작성 완료 시에만 업로드)
    if(canvasRef.current){
      const image = canvasRef.current.toDataURL('image/png');
      dispatch(setImageData(image));
      router.push('/inputModal');
    }
  };
  const handleLineWidth = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setModalOpen(true));
  };
  const handleUndo = () => {
    if (paths.length > 0) {
      dispatch(undo());
    }
  };
  const handleRedo = () => {
    if (undonePaths.length) {
      dispatch(redo());
    }
  };
    return (
        <div className="flex h-fit relative items-center z-0 bottom-16 bg-light-gray p-2 rounded-md">
          {modalIsOpen && (
            <Popover customStyles="absolute -top-14 left-10 p-4">
              <div className="flex flex-col items-start">
                <span className="text-lg font-bold">선 두께 {lineWidth}</span>
                <input
                  type="range"
                  min="1"
                  max="50"
                  defaultValue={lineWidth}
                  onChange={(e) => {
                    if (canvasRef.current) {
                      dispatch(setLineWidth(Number(e.target.value)));
                    }
                  }}
                />
                <span className="text-lg font-bold">선 투명도 {lineAlpha}</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue={lineAlpha}
                  onChange={(e) => {
                    if (canvasRef.current) {
                      dispatch(setLineAlpha(Number(e.target.value)));
                    }
                  }}
                />
              </div>
            </Popover>
          )}
          <input
            ref={colorRef}
            type="color"
            width="0"
            height="0"
            value="#fefefe"
            className={`inline-block w-0 invisible caret-transparent`}
            onChange={(e) => {
              dispatch(setColor(e.target.value));
            }}
          ></input>
          <span
            className={`rounded-md w-6 h-6 inline-block align-middle`}
            style={{ backgroundColor: color }}
            onMouseDown={(e) => {
              e.preventDefault();
              colorRef.current?.click();
              dispatch(setEraseMode(false));
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              colorRef.current?.click();
              dispatch(setEraseMode(false));
            }}
          ></span>
          <NextImage
            className="mx-4 inline-block w-7 h-7 cursor-pointer align-middle"
            src="/images/linewidth.svg"
            width={28}
            height={28}
            alt="line-width"
            onClick={handleLineWidth}
          />
          <BsEraserFill
            className="w-6 h-6 inline-block cursor-pointer align-middle mr-4 text-dark-gray"
            onClick={erase}
          />
          <IoMdReturnLeft
            className="w-6 h-6 inline-block cursor-pointer align-middle mr-4 bg-gray rounded-full p-1"
            color={paths.length == 0 ? "white" : "black"}
            onClick={handleUndo}
          />
          <IoMdReturnRight
            className="w-6 h-6 inline-block cursor-pointer align-middle mr-4 bg-gray rounded-full p-1"
            color={undonePaths.length == 0 ? "white" : "black"}
            onClick={handleRedo}
          />
          <ImBin
            className="w-6 h-6 inline-block cursor-pointer align-middle mr-4 text-dark-gray"
            onClick={eraseAll}
          />
          <Button
            onClick={handleNext}
            bgColor="bg-pink"
            textColor="text-white"
            value="다음"
            option="w-14 h-8 rounded-md text-sm"
          />
        </div>
    );
};

export default CanvasHandler;