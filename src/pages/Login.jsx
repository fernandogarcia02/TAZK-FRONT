import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setError('');

    try {
      const respuesta = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        // 1. Guardamos el token en el cofre (localStorage)
        localStorage.setItem('token_usuario', data.token);
        
        // 2. ¡Saltamos a la aplicación!
        navigate('/tareas');
      } else {
        // Mostramos el error que viene del backend (ej: "Contraseña incorrecta")
        setError(data.mensaje || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={manejarLogin}>
        <input 
          type="email" 
          placeholder="Tu email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Tu contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;