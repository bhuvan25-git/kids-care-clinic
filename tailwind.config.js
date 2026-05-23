/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
      colors: {
        green: {
          DEFAULT: '#1D9E75',
          dark: '#085041',
        },
        sky: {
          DEFAULT: '#E1F5EE',
          mid: '#9FE1CB',
        },
        coral: {
          DEFAULT: '#F0997B',
          dark: '#D85A30',
        },
        amber: {
          DEFAULT: '#FAC775',
          dark: '#BA7517',
        },
        muted: '#5F5E5A',
        light: '#F1EFE8',
      },
    },
  },
  plugins: [],
}
