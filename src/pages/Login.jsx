import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUsersContext from '../hooks/useUsersContext';
import { GoogleLogin } from '@react-oauth/google';
import useTasksContext from '../hooks/useTasksContext';
import useListsContext from '../hooks/useListsContext';

const Login = () => {


  const  {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    manejarLogin,
    obtenerPerfil
  } = useUsersContext();

  const {refrescarTareas} = useTasksContext();
  const {imprimirListas} = useListsContext();
  
  const navigate = useNavigate();

  const alTenerExito = async(credentialResponse) =>{
    try {
    const tokenGoogle = credentialResponse.credential;

    // Enviamos el token a nuestro servidor de Node.js
    const respuesta = await fetch('http://localhost:3000/api/usuarios/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: tokenGoogle }),
    });

    const datos = await respuesta.json();

    if (respuesta.ok) {
      // 1. Guardamos TU token (el que genera tu backend) en localStorage
      localStorage.setItem('token_usuario', datos.token);
      // 2. Redirigimos al usuario a sus listas
      refrescarTareas();
      imprimirListas();
      obtenerPerfil();
      navigate("/home"); 
    } else {
      console.error("Error en el servidor:", datos.mensaje);
    }
  } catch (error) {
    console.error("Error al conectar con el servidor", error);
  }
  };

  const alTenerError = () => {

  };


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

      <form onSubmit={async(e)=>{
        e.preventDefault();
        await manejarLogin()
        refrescarTareas()
        imprimirListas()
        obtenerPerfil()}}>
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

        <GoogleLogin
          onSuccess={alTenerExito}
          onError={alTenerError}
          useOneTap
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;