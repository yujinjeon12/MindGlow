"use client";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/store/darkmodeSlice";
import { RootState } from "@/store/store";

const ToggleDarkmode: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.value);
  const dispatch = useDispatch();
  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
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
