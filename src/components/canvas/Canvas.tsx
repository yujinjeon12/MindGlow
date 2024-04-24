"use client";
import React, { useState, useEffect, useRef } from "react";
import { BsEraserFill } from "react-icons/bs";
import Button from "../button/Button";
import Image from "next/image";
import { debounce } from "@/utils/utils";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#222222"); // default color
  const [eraseMode, setEraseMode] = useState<boolean>(false); // default erase mode
  const initX = useRef<number>(0);
  const initY = useRef<number>(0);

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
          ctx.fillRect(0, 0, canvas.width, canvas.height);
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
      // flil canvas with background color
      ctx.fillStyle = color;
      ctx.fillRect(initX.current, initY.current, 2, 2);
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
        ctx.lineWidth = 3;
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
  function handleSave() {
    const link = document.createElement("a");
    link.download = "draw-emotion.png";
    link.href = canvasRef.current?.toDataURL() ?? "";
    link.click();
  }
  return (
    <section className="h-svh m-2">
      <h1 className="sm:text-lg md:text-2xl font-bold text-left my-4">
        Draw Emotion
      </h1>
      <div className="h-2/3 flex flex-wrap justify-items-end items-start bg-light-gray pl-4 pt-4 pr-4 rounded-md">
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
        <div>
          <span
            className={`rounded-md w-6 h-6 inline-block align-bottom`}
            style={{ backgroundColor: color }}
            onClick={() => {
              colorRef.current?.click();
              setEraseMode(false);
            }}
          ></span>
          <Image
            className="mx-4 inline-block w-7 h-7 cursor-pointer align-bottom"
            src="/images/linewidth.svg"
            width={28}
            height={28}
            alt="line-width"
          />
          <BsEraserFill
            className="w-7 h-7 inline-block cursor-pointer align-bottom"
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
