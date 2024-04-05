"use client";
import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";

const ToggleDarkmode = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDarkMode = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        className="inline-block p-2 rounded-full bg-transparent align-middle hover:bg-light-gray dark:hover:bg-dark-gray"
        onClick={() => handleDarkMode()}
      >
        {theme === "dark" ? (
          <>
            <MdDarkMode
              className="w-5 h-5 mx-0"
              color="green"
            />
          </>
        ) : (
          <>
            <MdLightMode
              className="w-5 h-5 mx-0"
              color="green"
            />
          </>
        )}
      </button>
    </>
  );
};

export default ToggleDarkmode;
