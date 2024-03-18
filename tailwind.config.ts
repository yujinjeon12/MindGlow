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
      "light-gray": "#EEEEEE",
      "dark-gray": "#222224",
      white: "#FFFFFF",
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
  darkMode: "selector",
};
