import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Register from './views/Register';
import DashBoard from './views/DashBoard';

function App() {
  return (
    <Routes>
      <Route path="/" element ={<Inicio/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/DashBoard' element={<DashBoard/>}/>
    </Routes>
  );
}

export default App;
