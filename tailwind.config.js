/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './stories/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        akaya: ['Akaya Kanadaka', 'serif'],
        bangers: ['Bangers', 'cursive'],
      },
      keyframes: {
        skeleton: {
          '0%, 100%': { backgroundPosition: '200% 0' },
          '50%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        skeleton: 'skeleton 1.5s ease-in-out infinite',
      },

      colors: {
        backgroundStart: '#39dfcc',
        backgroundEnd: '#ff6ff0',
      },
    },
  },
  plugins: [],
}
