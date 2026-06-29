import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  // Estados para capturar os dados do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (evento) => {
    evento.preventDefault();

    if (!email || !senha) {
      alert('Por favor, preencha o e-mail e a senha!');
      return;
    }

    try {
      // 1. Busca a lista de usuários salvos no navegador
      const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

      // 2. Procura um usuário que tenha exatamente o mesmo e-mail E a mesma senha
      const usuarioValido = usuariosSalvos.find(
        user => user.email === email && user.senha === senha
      );

      // 3. Se encontrou, libera o acesso. Se não, bloqueia.
      if (usuarioValido) {
        alert('Login efetuado com sucesso!');
        navigate('/dashboard'); // Redireciona para a área do usuário
      } else {
        alert('Erro: E-mail ou senha incorretos!');
      }

    } catch (error) {
      console.error('Erro ao fazer login', error);
      alert('Ocorreu um erro durante o login.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <h2>Entrar no Sistema</h2>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>E-mail:</label>
          <br />
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Digite seu e-mail"
          />
        </div>

        <div>
          <label>Senha:</label>
          <br />
          <input 
            type="password" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)} 
            placeholder="Digite sua senha"
          />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Entrar</button>
      </form>

      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <span style={{ fontSize: '14px' }}>Ainda não tem conta? </span>
        <button 
          type="button" 
          onClick={() => navigate('/cadastro')}
          style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'blue', textDecoration: 'underline' }}
        >
          Cadastre-se
        </button>
      </div>
    </div>
  );
}