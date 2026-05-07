import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cadastro } from './pages/Cadastro'; //import temporario
import { Login } from './pages/Login'; //import temporario
import { Kanban } from './pages/Kanban'; //import temporario
import './global.css'


function App() {

  return (
    <>
      <header style={{ backgroundColor: '#226ED8', height: '52px', width: '100%', boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)'}}></header>
    <div>
      { }
      <Kanban /> 
    </div>
    </>
  )
}

export default App