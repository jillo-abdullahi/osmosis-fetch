/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          100: "#421f32",
          200: "#0F111C",
          300: "#0E111B",
        },
        gray: {
          border: "#ffffff33",
          "border-light": "#ffffff66",
          "border-dark": "#ffffff99",
        },
      },
      maxWidth: {
        610: "38.125rem",
      },
    },
  },
  plugins: [],
};
