"use client";
import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ToggleDarkmode = () => {
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("darkMode")
      ? true
      : false
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    darkMode
      ? localStorage.removeItem("darkMode")
      : localStorage.setItem("darkMode", "true");
  };

  return (
    <>
      <button
        className="inline-block p-2 rounded-full bg-transparent align-middle hover:bg-light-gray dark:hover:bg-dark-gray"
        onClick={() => handleDarkMode()}
      >
        {darkMode ? (
          <MdDarkMode
            className="w-5 h-5 mx-0"
            color="green"
          />
        ) : (
          <MdLightMode
            className="w-5 h-5 mx-0"
            color="green"
          />
        )}
      </button>
    </>
  );
};

export default ToggleDarkmode;
