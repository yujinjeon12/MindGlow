"use client";
import React, { useState, useEffect, useRef } from "react";
import { BsEraserFill } from "react-icons/bs";
import Button from "../button/Button";
import Image from "next/image";
import { debounce } from "@/utils/utils";
import ModalBase from "../modal/ModalBase";

const Canvas = () => {
  const initX = useRef<number>(0);
  const initY = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [lineWidth, setLineWidth] = useState<string>("3");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#222222"); // default color
  const [eraseMode, setEraseMode] = useState<boolean>(false); // default erase mode
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current; // canvas element
    const handleResize = debounce(() => {
      initializeCanvas(canvas);
    }, 300); // 300ms의 딜레이로 debounce

    if (canvas) {
      initializeCanvas(canvas);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initializeCanvas = (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        setCtx(ctx);
        var wrapper = canvas.parentNode;
        if (wrapper instanceof Element) {
          canvas.width = parseInt(window.getComputedStyle(wrapper).width);
          canvas.height = parseInt(window.getComputedStyle(wrapper).height);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height); // Set the default background color of the canvas
        }
      }
    }
  };

  const mouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(false);
  };
  const mouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const element = e.target as Element;
    initX.current = e.clientX - element.getBoundingClientRect().left;
    initY.current = e.clientY - element.getBoundingClientRect().top;

    if (!eraseMode && ctx) {
      ctx.beginPath();
      ctx.arc(
        initX.current,
        initY.current,
        Number(lineWidth) / 2,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }
    setIsDrawing(true);
  };
  const mouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (ctx && isDrawing) {
      ctx.beginPath();
      ctx.moveTo(initX.current, initY.current);
      const element = e.target as Element;
      initX.current = e.clientX - element.getBoundingClientRect().left;
      initY.current = e.clientY - element.getBoundingClientRect().top;
      ctx.lineTo(initX.current, initY.current);
      if (eraseMode) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 50;
      } else {
        ctx.strokeStyle = color;
        ctx.lineWidth = Number(lineWidth);
        ctx.lineCap = "round"; // 선의 끝 모양을 둥글게
        ctx.lineJoin = "round"; // 선의 연결점을 둥글게 처리
      }
      ctx.closePath();
      ctx.stroke();
    }
  };
  const erase = () => {
    setEraseMode(true);
  };
  const eraseAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    setIsOpen(true);
  };
  const handleOverlay = () => {
    setIsOpen(false);
  };

  return (
    <section className="h-svh m-2">
      <h1 className="sm:text-lg md:text-2xl font-bold text-left my-4">
        Draw Emotion
      </h1>
      <div
        className="h-2/3 flex flex-wrap justify-items-end items-start bg-light-gray pl-4 pt-4 pr-4 rounded-md"
        onClick={handleOverlay}
      >
        <div className="w-full h-5/6 bg-white rounded-t-lg shadow-2xl">
          <canvas
            className={`block ${eraseMode ? "cursor-eraser" : "cursor-pen"}`}
            id="canvas"
            ref={canvasRef}
            onMouseUp={mouseUp}
            onMouseDown={mouseDown}
            onMouseMove={mouseMove}
          >
            draw emotion canvas
          </canvas>
        </div>

        <div className=" relative h-1/6 content-center z-0">
          {modalIsOpen && (
            <ModalBase customStyles="absolute -top-14 left-10 p-4">
              <div className="flex flex-col items-start">
                <span className="text-lg font-bold">선 굵기 {lineWidth}</span>
                <input
                  type="range"
                  min="1"
                  max="30"
                  defaultValue={lineWidth}
                  onChange={(e) => {
                    if (ctx) {
                      setLineWidth(e.target.value);
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
            className="inline-block ml-2 w-0 invisible"
            onChange={(e) => {
              setColor(e.target.value);
            }}
          ></input>
          <span
            className={`rounded-md w-6 h-6 inline-block align-middle`}
            style={{ backgroundColor: color }}
            onClick={() => {
              colorRef.current?.click();
              setEraseMode(false);
            }}
          ></span>
          <Image
            className="mx-4 inline-block w-7 h-7 cursor-pointer align-middle"
            src="/images/linewidth.svg"
            width={28}
            height={28}
            alt="line-width"
            onClick={handleLineWidth}
          />
          <BsEraserFill
            className="w-7 h-7 inline-block cursor-pointer align-middle"
            onClick={erase}
          />
          <Button
            onClick={eraseAll}
            bgColor="bg-green"
            textColor="text-white"
            value="초기화"
            option="w-20 h-8 mx-4 rounded-md"
          />
          <Button
            onClick={handleSave}
            bgColor="bg-pink"
            textColor="text-white"
            value="저장"
            option="w-20 h-8 rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Canvas;
