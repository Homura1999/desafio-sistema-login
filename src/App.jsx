import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importando as páginas
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota padrão cai na tela de Login */}
        <Route path="/" element={<Login />} />
        
        {/* Rota para a tela de Cadastro */}
        <Route path="/cadastro" element={<Register />} />
        
        {/* Rota para a Área do Usuário (Dashboard) onde vamos listar os usuários */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redirecionamento de segurança: se digitar uma URL inválida, volta pro Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;