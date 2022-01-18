module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      outfit: ['Outfit', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '910px',
      // => @media (min-width: 910x) { ... }

      lg: '1111px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
