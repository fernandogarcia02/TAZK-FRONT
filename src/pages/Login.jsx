import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUsersContext from '../hooks/useUsersContext';

const Login = () => {


  const  {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    manejarLogin
  } = useUsersContext();
  
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      
      {error && 
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm">
        <div className="bg-red-600 text-white p-4 rounded-lg shadow-2xl border-l-4 border-red-800 flex items-center justify-between">
    
          <div className="flex items-center gap-3">
            {/* Icono de advertencia simple */}
            <span className="text-xl">⚠️</span>
            <p className="font-medium">{error}</p>
          </div>

        {/* Botón para cerrar manualmente */}
        <button 
          onClick={() => setError('')} // 👈 Esto borra el error y hace que el div desaparezca
          className="ml-4 hover:text-red-200 transition"
          >
          ✕
        </button>  
      </div>
    </div>
  }

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
        <p>¿No eres miembro aún?<a onClick={()=>navigate('/registro')}>Únete</a></p>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;