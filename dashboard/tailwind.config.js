/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      colors: {
        "dark-gray": '#0d0f12',
        "neutral": {
          750: '#313131'
        },
        "blue-lagoon": {
          "50": '#f2f9fa',
          "100": '#e6f2f5',
          "200": '#bfdfe5',
          "300": '#99ccd5',
          "400": '#4da5b6',
          "500": '#007F96',
          "600": '#007287',
          "700": '#005f71',
          "800": '#004c5a',
          "900": '#003e4a'
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        input: `
          0px 1px 0px -1px var(--tw-shadow-color),
          0px 1px 1px -1px var(--tw-shadow-color),
          0px 1px 2px -1px var(--tw-shadow-color),
          0px 2px 4px -2px var(--tw-shadow-color),
          0px 3px 6px -3px var(--tw-shadow-color)
        `,
        highlight: `
          inset 0px 0px 0px 1px var(--tw-shadow-color),
          inset 0px 1px 0px var(--tw-shadow-color)
        `,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}