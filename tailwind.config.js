/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif']
      },
      colors: {
        frost: '#f8fcff',
        powder: '#cfeeff',
        cyanice: '#bcefff',
        baby: '#a8d8ff',
        lavblue: '#c9d3ff',
        silvermist: '#c6d1dc',
        night: '#07111f'
      },
      boxShadow: {
        glass: '0 24px 80px rgba(120, 190, 230, 0.22)',
        glow: '0 0 40px rgba(188, 239, 255, 0.34)'
      }
    }
  },
  plugins: []
};
