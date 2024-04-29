"use client";
import React, { useState, useEffect, useRef } from "react";
import { BsEraserFill } from "react-icons/bs";
import Button from "../button/Button";
import Image from "next/image";
import { debounce } from "@/utils/utils";
import ModalBase from "../modal/ModalBase";

type lineProps = {
  color: string;
  lineWidth: number;
  lineAlpha: number;
};
const Canvas = () => {
  const paths = useRef<
    Array<Array<{ x: number; y: number; lineProps?: lineProps }>>
  >([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [lineAlpha, setLineAlpha] = useState<number>(10);
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
        const wrapper = canvas.parentNode;
        if (wrapper instanceof Element) {
          // 디스플레이 크기 (css 픽셀) 를 설정
          const widthSize = parseInt(window.getComputedStyle(wrapper).width);
          const heightSize = parseInt(window.getComputedStyle(wrapper).height);
          canvas.style.width = `${widthSize}px`;
          canvas.style.height = `${heightSize}px`;

          // 메모리에서 실제 크기를 설정 (추가 픽셀 밀도를 고려한 스케일 조정)
          const scale = window.devicePixelRatio;
          canvas.width = Math.floor(widthSize * scale);
          canvas.height = Math.floor(heightSize * scale);

          // 좌표계를 정규화하여 CSS 픽셀을 사용
          ctx.scale(scale, scale);

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
    if (!canvasRef.current) return;

    setIsOpen(false);
    const rect = canvasRef.current.getBoundingClientRect();
    const currentProps = eraseMode
      ? { color: "#ffffff", lineWidth: 50, lineAlpha: 1 }
      : { color, lineWidth, lineAlpha: lineAlpha / 10 };
    paths.current.push([
      {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        lineProps: currentProps,
      },
    ]);
    setIsDrawing(true);
  };
  const mouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!canvasRef.current || !isDrawing) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return; // Add null check for ctx

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    const { clientX, clientY } = e;
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    paths.current[paths.current.length - 1].push({ x: offsetX, y: offsetY }); // Add the current point to the path
    redraw();
  };
  const redraw = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    paths.current.forEach((path) => {
      path.forEach((point) => {
        if (point.lineProps) {
          ctx.globalAlpha = point.lineProps.lineAlpha;
          ctx.strokeStyle = point.lineProps.color;
          ctx.lineWidth = point.lineProps.lineWidth;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
        }
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });
  };
  const erase = () => {
    setEraseMode(true);
  };
  const eraseAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      paths.current = []; // Clear the paths
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
                <span className="text-lg font-bold">선 두께 {lineWidth}</span>
                <input
                  type="range"
                  min="1"
                  max="30"
                  defaultValue={lineWidth}
                  onChange={(e) => {
                    if (ctx) {
                      setLineWidth(Number(e.target.value));
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
                      setLineAlpha(Number(e.target.value));
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
