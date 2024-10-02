/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/views/Inicio.jsx",
    "./src/views/Login.jsx",
    "./src/views/Register.jsx",
    "./src/views/DashBoard.jsx",
    "./src/components/NavBarHome.js",
    "./src/components/HomePage.js",
    "./src/components/LoginPage.js",
    "./src/components/RegisterPage.js",
    "./src/components/DashBoardPage.js", 
    "./src/components/DBNavBar.js",
    "./src/components/PasswordTable.js",

  ],
  theme: {
    extend: {

    },
    width: {
      'sidebar': '20%',
      'content': '80%',
      'sidebar-cero': '0%',
      'content-full': '100%',
      'width-full':'100%',
      'modal': '90%'
    },
  },
  plugins: [],
}

