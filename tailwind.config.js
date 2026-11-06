/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "quantum-dark": "#040711",
        "quantum-cyan": "#00f2fe",
        "quantum-violet": "#8a2be2"
      }
    }
  },
  plugins: []
};
