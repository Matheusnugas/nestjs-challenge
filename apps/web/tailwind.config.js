/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "league-spartan": ['"League Spartan"', "sans-serif"],
      },
      colors: {
        "challenge-purple-1": "#7C5DFA",
        "challenge-purple-2": "#9277FF",
        "challenge-dark-1": "#1E2139",
        "challenge-dark-2": "#252945",
        "challenge-light-purple": "#DFE3FA",
        "challenge-gray-purple": "#888EB0",
        "challenge-medium-purple": "#7E88C3",
        "challenge-dark-3": "#0C0E16",
        "challenge-red": "#EC5757",
        "challenge-pink": "#FF9797",
        "challenge-light-bg": "#F8F8FB",
        "challenge-dark-4": "#141625",
      },
      animation: {
        zoomOutDown: "zoomOutDown 1s ease-in forwards",
        fadeIn: "fadeIn .75s ease-in forwards",
        bounceIn: "bounceIn 0.5s ease-in forwards",
        flipIn: "flipIn .75s ease-in forwards",
        flipOut: "flipOut 1s ease-in forwards",
        slideInLeft: "slideInLeft 0.2s ease-in forwards",
        slideInRight: "slideInRight 0.2s linear forwards",
        slideInDown: "slideInDown 1s ease-in forwards",
        slideInTop: "slideInTop 1s ease-in forwards",
        zoomIn: "zoomIn .35s ease-in forwards",
        rotateY: "rotateY 1s ease-in forwards",
        rotateX: "rotateX 1s ease-in forwards",
        "spin-slow": "spin 3s linear infinite",
        "ping-slow":
          "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; @keyframes ping {75%, 100% { transform: scale(2); opacity: 0; } }",
        glowing: "glowing 20s linear infinite",
      },
      keyframes: {
        zoomOutDown: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "40%": { transform: "scale(0.475) translateY(-60px)", opacity: 1 },
          "100%": { transform: "scale(0.1) translateY(2000px)", opacity: 0 },
        },
        bounceIn: {
          "0%": { transform: "scale(0.1)", opacity: 0 },
          "60%": { transform: "scale(1.2)", opacity: 1 },
          "100%": { transform: "scale(1)" },
        },
        flipIn: {
          "0%": { transform: "rotateY(-90deg)", opacity: 0 },
          "100%": { transform: "rotateY(0deg)", opacity: 1 },
        },
        flipOut: {
          "0%": { transform: "rotateY(0deg)", opacity: 1 },
          "100%": { transform: "rotateY(90deg)", opacity: 0 },
        },
        slideInLeft: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        slideInRight: {
          "0%": {
            transform: "translateX(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        slideInDown: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        slideInTop: {
          "0%": {
            transform: "translateY(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: "1" },
        },
        zoomIn: {
          "0%": { transform: "scale(.5)" },
          "100%": { transform: "scale(1)" },
        },
        glowing: {
          "0%": { backgroundPosition: "0 0" },
          "50%": { backgroundPosition: "400% 0" },
          "100%": { backgroundPosition: "0 0" },
        },
        rotateY: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        rotateX: {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(360deg)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".league-spartan-heading-l": {
          fontFamily: '"League Spartan", sans-serif',
          fontWeight: "700", // Bold
          fontSize: "36px",
          lineHeight: "33px",
          letterSpacing: "-0.025em", // -1 Spacing
        },
        ".league-spartan-heading-m": {
          fontFamily: '"League Spartan", sans-serif',
          fontWeight: "700", // Bold
          fontSize: "24px",
          lineHeight: "22px",
          letterSpacing: "-0.01875em", // -0.75 Spacing
        },
        ".league-spartan-heading-s": {
          fontFamily: '"League Spartan", sans-serif',
          fontWeight: "700", // Bold
          fontSize: "15px",
          lineHeight: "24px",
          letterSpacing: "-0.00625em", // -0.25 Spacing
        },
        ".league-spartan-heading-s-variant": {
          fontFamily: '"League Spartan", sans-serif',
          fontWeight: "700", // Bold
          fontSize: "15px",
          lineHeight: "15px",
          letterSpacing: "-0.00625em", // -0.25 Spacing
        },
        ".league-spartan-body": {
          fontFamily: '"League Spartan", sans-serif',
          fontWeight: "500", // Medium
          fontSize: "13px",
          lineHeight: "18px",
          letterSpacing: "-0.0025em", // -0.1 Spacing
        },
        ".league-spartan-body-variant": {
          fontFamily: '"League Spartan", sans-serif',
          fontWeight: "500", // Medium
          fontSize: "13px",
          lineHeight: "15px",
          letterSpacing: "-0.00625em", // -0.25 Spacing
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
});
