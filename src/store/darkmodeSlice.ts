import { createSlice } from "@reduxjs/toolkit";
import { DarkModeState } from "@/types/types";

const initialValue: DarkModeState = {
  value: false,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: initialValue,
  reducers: {
    toggleDarkMode: (state) => {
      state.value = !state.value;
      state.value
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
