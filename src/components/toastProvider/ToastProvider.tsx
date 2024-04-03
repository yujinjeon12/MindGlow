import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.value);

  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={darkMode ? "dark" : "light"}
      transition={Slide}
    />
  );
};

export default ToastProvider;
