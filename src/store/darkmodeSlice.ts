import { createSlice } from "@reduxjs/toolkit";

export type DarkModeState = {
  value: boolean;
};
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
