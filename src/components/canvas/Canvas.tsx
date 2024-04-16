"use client";
import React, { useState, useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { BsEraserFill } from "react-icons/bs";
import Button from "../button/Button";

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
    const canvas = canvasRef.current;

    if (canvas) {
      var wrapper = canvas.parentNode;
      console.log("wrapper", wrapper);
      if (wrapper instanceof Element) {
        canvas.width = parseInt(window.getComputedStyle(wrapper).width);
        canvas.height = parseInt(window.getComputedStyle(wrapper).height);
      }
      let ctx = canvas.getContext("2d");
      setCtx(ctx);
    }
  }, []);

  const mouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(false);
  };
  const mouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const element = e.target as Element;
    initX.current = e.clientX - element.getBoundingClientRect().left;
    initY.current = e.clientY - element.getBoundingClientRect().top;

    if (!eraseMode && ctx) {
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
    if (ctx) {
      ctx.clearRect(
        0,
        0,
        canvasRef.current?.width as number,
        canvasRef.current?.height as number
      );
    }
  };
  return (
    <section className="h-svh">
      <div className="h-2/3 flex flex-wrap justify-items-start items-start m-4 bg-light-gray rounded-md">
        <div className="w-full h-5/6 bg-white rounded-lg shadow-2xl">
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
        <span
          className={`rounded-md w-14 h-8 inline-block mr-4`}
          style={{ backgroundColor: color }}
          onClick={() => {
            colorRef.current?.click();
            setEraseMode(false);
          }}
        ></span>
        <BsEraserFill
          style={{ fontSize: "28px" }}
          onClick={erase}
        />
        <Button
          onClick={eraseAll}
          bgColor="bg-green"
          textColor="text-white"
          value="초기화"
          option="w-24 h-8 ml-4"
        />
      </div>
    </section>
  );
};

export default Canvas;
