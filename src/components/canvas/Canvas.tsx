"use client";
import React, { useState, useEffect, useRef } from "react";
import { BsEraserFill } from "react-icons/bs";
import { IoMdReturnLeft, IoMdReturnRight } from "react-icons/io";
import Button from "../button/Button";
import NextImage from "next/image";
import { debounce } from "@/utils/utils";
import { ImBin } from "react-icons/im";
import ModalBase from "../modal/ModalBase";
import { useSelector, useDispatch } from "react-redux";
import { Path } from "@/lib/features/canvas/CanvasSlice";
import {
  startDrawing,
  draw,
  stopDrawing,
  setLineWidth,
  setLineAlpha,
  setColor,
  setEraseMode,
  clearPaths,
  undo,
  redo,
  setModalOpen
} from "@/lib/features/canvas/CanvasSlice";
import { RootState } from "@/lib/store";

const Canvas = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const {
    paths,
    undonePaths,
    lineWidth,
    lineAlpha,
    color,
    isDrawing,
    eraseMode,
    modalIsOpen,
  } = useSelector((state: RootState) => state.CanvasReducer);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current; // canvas element
    const handleResize = debounce(() => {
      initializeCanvas(canvas);
      clearCanvas();
      drawPaths();
    }, 300); // 300ms의 딜레이로 debounce

    if (canvas) {
      initializeCanvas(canvas);
      drawPaths();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [paths]);

  const initializeCanvas = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    setCtx(context);
    const wrapper = canvas.parentNode;
    if (wrapper instanceof Element) {
      // css 크기 설정
      const widthSize = parseFloat(window.getComputedStyle(wrapper).width);
      const heightSize = parseFloat(window.getComputedStyle(wrapper).height);
      canvas.style.width = `${widthSize}px`;
      canvas.style.height = `${heightSize}px`;

      // canvas 크기 설정
      const dpr = window.devicePixelRatio;
      canvas.width = Math.floor(widthSize * dpr);
      canvas.height = Math.floor(heightSize * dpr);

      // 렌더링 컨텍스트 스케일링
      context.scale(dpr, dpr);
    }
  };

  const mouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    dispatch(stopDrawing());
  };
  const mouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!canvasRef.current) return;

    dispatch(setModalOpen(false));
    const rect = canvasRef.current.getBoundingClientRect();
    const currentProps = eraseMode
      ? {
          color: "#ffffff",
          lineWidth: 50,
          lineAlpha: 1,
        }
      : {
          color,
          lineWidth,
          lineAlpha: lineAlpha / 10,
        };
    //add new path
    dispatch(
      startDrawing({ 
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        canvasWidth: parseInt(canvasRef.current.style.width),
        canvasHeight: parseInt(canvasRef.current.style.height),
        lineProps: currentProps
      })
    );
  };
  const mouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!canvasRef.current || !isDrawing) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return; // Add null check for ctx

    const { clientX, clientY } = e;
    const rect = canvasRef.current.getBoundingClientRect();
    dispatch(draw({
      x: clientX - rect.left,
      y: clientY - rect.top,
      canvasWidth: parseInt(canvasRef.current.style.width),
      canvasHeight: parseInt(canvasRef.current.style.height),
    }));
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };
  const drawPaths = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    //current canvas size
    const width = parseInt(canvasRef.current.style.width);
    const height = parseInt(canvasRef.current.style.height);
    if (!ctx) return;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    paths.forEach((path: Path) => {
      path.forEach((point) => {
        const scaledX = (width / point.canvasWidth) * point.x;
        const scaledY = (height / point.canvasHeight) * point.y;

        if (point.lineProps) {
          ctx.globalAlpha = point.lineProps.lineAlpha;
          ctx.strokeStyle = point.lineProps.color;
          ctx.lineWidth = point.lineProps.lineWidth;
          ctx.beginPath();
          ctx.moveTo(scaledX, scaledY);
        }
        ctx.lineTo(scaledX, scaledY);
      });
      ctx.stroke();
    });
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
  const handleSave = () => {
    const link = document.createElement("a");
    link.download = "draw-emotion.png";
    link.href = canvasRef.current?.toDataURL() ?? "";
    link.click();
  };

  const handleLineWidth = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setModalOpen(true));
  };
  const handleOverlay = () => {
    dispatch(setModalOpen(false));
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

  const touchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    e.preventDefault(); // Prevent scrolling when touching the canvas
    dispatch(setModalOpen(false));
    const rect = canvasRef.current.getBoundingClientRect();
    const currentProps = eraseMode
      ? {
          color: "#ffffff",
          lineWidth: 50,
          lineAlpha: 1,
        }
      : {
          color,
          lineWidth,
          lineAlpha: lineAlpha / 10,
        };
    //add new path
    dispatch(
      startDrawing({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        canvasWidth: parseInt(canvasRef.current.style.width),
        canvasHeight: parseInt(canvasRef.current.style.height),
        lineProps: currentProps
      })
    );
  };
  const touchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !isDrawing) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return; // Add null check for ctx

    const rect = canvasRef.current?.getBoundingClientRect();
    const touch = e.touches[0];
      dispatch(
        draw({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
          canvasWidth: parseInt(canvasRef.current?.style.width || "0"),
          canvasHeight: parseInt(canvasRef.current?.style.height || "0"),
        })
      );
  };
  const touchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    dispatch(stopDrawing());
  };

  return (
    <section className="w-full h-full pb-8">
      <h1 className="font-bold text-left my-4 mx-2 md:mx-0">
        오늘의 감정을 그림으로 표현해보세요.
      </h1>
      <div
        className="h-4/6 flex flex-wrap justify-center items-center px-4 py-4 mx-2 md:mx-0 rounded-md bg-yellow"
        onClick={handleOverlay}
      >
        <div className="w-full h-full bg-white rounded-t-lg shadow-2xl">
          <canvas
            className={`block ${eraseMode ? "cursor-eraser" : "cursor-pen"} rounded-md`}
            id="canvas"
            ref={canvasRef}
            onMouseUp={mouseUp}
            onMouseDown={mouseDown}
            onMouseMove={mouseMove}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
          >
            draw emotion canvas
          </canvas>
        </div>
        <div className="flex h-fit relative items-center z-0 bottom-16 bg-light-gray p-2 rounded-md">
          {modalIsOpen && (
            <ModalBase customStyles="absolute -top-14 left-10 p-4">
              <div className="flex flex-col items-start">
                <span className="text-lg font-bold">선 두께 {lineWidth}</span>
                <input
                  type="range"
                  min="1"
                  max="50"
                  defaultValue={lineWidth}
                  onChange={(e) => {
                    if (ctx) {
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
                    if (ctx) {
                      dispatch(setLineAlpha(Number(e.target.value)));
                    }
                  }}
                />
              </div>
            </ModalBase>
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
            onClick={handleSave}
            bgColor="bg-pink"
            textColor="text-white"
            value="SAVE"
            option="w-14 h-8 rounded-md text-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Canvas;
