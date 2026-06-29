import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  // Executa assim que a tela abre para buscar os usuários cadastrados
  useEffect(() => {
    try {
      const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];
      setUsuarios(usuariosSalvos);
    } catch (error) {
      console.error('Erro ao ler usuários', error);
      setUsuarios([]);
    }
  }, []);

  const handleLogout = () => {
    // Apenas redireciona de volta para o login
    navigate('/'); 
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <div>
          <h2>Área do Usuário</h2>
          <p style={{ margin: 0, color: 'gray' }}>Bem-vindo ao sistema!</p>
        </div>
        <button 
          onClick={handleLogout} 
          style={{ padding: '8px 16px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Sair
        </button>
      </div>

      {/* Lista de usuários cadastrados */}
      <div style={{ marginTop: '20px' }}>
        <h3>Usuários Cadastrados</h3>
        
        {usuarios.length === 0 ? (
          <p>Nenhum usuário cadastrado ainda.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {usuarios.map((user, index) => (
              <li key={index} style={{ background: '#f4f4f4', margin: '10px 0', padding: '15px', borderRadius: '5px' }}>
                <strong>Nome:</strong> {user.nome} <br />
                <strong>E-mail:</strong> {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}