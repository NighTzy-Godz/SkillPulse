/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1rem",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
