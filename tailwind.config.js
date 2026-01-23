/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#0f172a", // Deep slate for premium look
      },
    },
  },
  plugins: [],
}
