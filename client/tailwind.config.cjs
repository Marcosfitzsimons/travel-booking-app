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
        "border-color": '#007F9633',
        "border-color-dark": '#003E4A66',
        "icon-color": '#752121',
        "icon-color-dark": '#F9B4B4',
        "dark-gray": '#0d0f12',
        "neutral": {
          750: '#313131'
        },
        "blue-lagoon": {
          '50': '#fef6f6',
          '100': '#fdecec',
          '200': '#fbd0d0',
          '300': '#f9b4b4',
          '400': '#f47c7c',
          '500': '#ef4444',
          '600': '#d73d3d',
          '700': '#b33333',
          '800': '#8f2929',
          '900': '#752121'
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