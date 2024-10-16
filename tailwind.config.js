/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        customHover:' 0 8px 16px 0 rgba(0,0,0,0.2)',
      },
}
  },
  plugins: [],
}