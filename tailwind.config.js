/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#5D5FEF',
          dark: '#151D48',
          secondary: '#737791',
          bg: '#FAFBFC',
          card: '#FFFFFF',
          border: '#F8F9FA',
          pink: '#FFE2E5',
          'pink-text': '#FA5A7D',
          orange: '#FFF4DE',
          'orange-text': '#FF947A',
          green: '#DCFCE7',
          'green-text': '#3CD856',
          purple: '#F3E8FF',
          'purple-text': '#BF83FF',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
      }
    },
  },
  plugins: [],
}
