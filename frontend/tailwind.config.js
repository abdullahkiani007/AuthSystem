/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        customshadow: "4px 2px 40px 13px rgba(0,0,0,0.68)",
      },
    },
  },
  plugins: [],
};
