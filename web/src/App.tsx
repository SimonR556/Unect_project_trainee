import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cadastro } from './pages/Cadastro'; 
import { Login } from './pages/Login'; 
import { Kanban } from './pages/Kanban'; 
import './global.css';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ToastContainer /> 
        
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Cadastro />} />
          <Route path="/kanban" element={<Kanban />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;