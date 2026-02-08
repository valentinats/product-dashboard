/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        robotoMono: ["Roboto Mono", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
      },
      colors: {
        black: "#000",
        white: "#fff",
        gray: {
          0: "#F9F9F9",
          5: "#F3F3F3",
          10: "#EBEBEB",
          20: "#E0E0E0",
          30: "#EDEDED",
          40: "#9C9C9C",
          50: "#6C6C6C",
          60: "#232323",
          70: "#999999",
          80: "#C2C2C2",
          90: "#ECECEB",
          100: "#B2B3B9",
          105: "#949494",
          110: "#D8D8D8",
          115: "#C4C4C4",
        },
        accent: "#242EDB",
        "g-light-blue": "#367AFF",
        "g-dark-blue": "#3C538E",
        "g-purple": "#797FE9",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        progress: {
          "0%": { transform: "translateX(-100%)", width: "30%" },
          "50%": { transform: "translateX(100%)", width: "50%" },
          "100%": { transform: "translateX(400%)", width: "30%" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        in: "fade-in 0.2s ease-out, zoom-in 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        progress: "progress 1.5s ease-in-out infinite",
        "toast-in": "slide-in-right 0.3s ease-out",
        "toast-out": "slide-out-right 0.3s ease-in forwards",
      },
    },
  },
  plugins: [],
};
