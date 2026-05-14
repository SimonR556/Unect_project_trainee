import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cadastro } from './pages/Cadastro'; 
import { Login } from './pages/Login'; 
import { Kanban } from './pages/Kanban'; 
import './global.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer /> 
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/kanban" element={<Kanban />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;