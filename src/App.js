import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import Inicio from './views/Inicio';
import DashBoard from './views/DashBoard';
import Login from './views/Login'; 
import Register from './views/Register';


function App() {
  return (
    <Routes>
      <Route path="/" element ={<Inicio/>}/>
      <Route path='/DashBoard' element={<DashBoard/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
    </Routes>
  );
}

export default App;
