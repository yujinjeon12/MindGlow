/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      green: "#12463A",
      yellow: "#FDBA51",
      "light-yellow": "#F6DAAA",
      pink: "#D05A68",
      "light-green": "#8BB25F",
      black: "#101418",
      gray: "#9B9B9B",
      "light-gray": "#e3e3e3",
      "cool-gray": "#464646",
      "dark-gray": "#222224",
      white: "#FFFFFF",
    },
    extend: {
      cursor: {
        eraser: "url('/images/eraser.png') 0 24, pointer",
        pen: "url('/images/pen.png') 0 24, pointer",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
  darkMode: "class",
};
