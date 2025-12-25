/** @type {import('tailwindcss').Config} */export default {

content: [

"./index.html",

"./src/**/*.{js,ts,jsx,tsx}",

],

theme: {

extend: {

  colors: {

    aegis: {

      dark: "#0a0a0a",

      green: "#00ff9d",

      red: "#ff4d4d",

      panel: "#1a1a1a"

    }

  }

},

},

plugins: [

require("tailwindcss-animate")

],

}