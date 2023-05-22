


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern':
          "linear-gradient(to right bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://img.freepik.com/free-vector/white-abstract-background_23-2148844576.jpg?w=996&t=st=1684598626~exp=1684599226~hmac=cb1bf28783d330432108aa90ca5f00cc670c628eb1cfb434c5ab19dbeb01b918')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    
  ],
}
