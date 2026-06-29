import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (evento) => {
    evento.preventDefault();

    if (!nome || !email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

      // Validação: Não permitir e-mails duplicados
      const emailJaExiste = usuariosSalvos.find(user => user.email === email);
      if (emailJaExiste) {
        alert('Este e-mail já está cadastrado!');
        return;
      }

      const novoUsuario = { nome, email, senha };
      usuariosSalvos.push(novoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuariosSalvos));

      alert('Cadastro realizado com sucesso! Vá para o login.');
      navigate('/'); 
    } catch (error) {
      console.error('Erro ao cadastrar', error);
      alert('Ocorreu um erro.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <h2>Criar Conta</h2>
      <form onSubmit={handleCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>Nome:</label><br />
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite seu nome" />
        </div>
        <div>
          <label>E-mail:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" />
        </div>
        <div>
          <label>Senha:</label><br />
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Crie uma senha" />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Cadastrar</button>
      </form>
    </div>
  );
}