import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUsersContext from '../hooks/useUsersContext';
import { GoogleLogin } from '@react-oauth/google';
import useTasksContext from '../hooks/useTasksContext';
import useListsContext from '../hooks/useListsContext';

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    manejarLogin,
    obtenerPerfil
  } = useUsersContext();

  const { refrescarTareas } = useTasksContext();
  const { imprimirListas } = useListsContext();
  const navigate = useNavigate();

  const alTenerExito = async (credentialResponse) => {
    try {
      const tokenGoogle = credentialResponse.credential;
      const respuesta = await fetch('/api/usuarios/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenGoogle }),
      });

      const datos = await respuesta.json();
      if (respuesta.ok) {
        localStorage.setItem('token_usuario', datos.token);
        refrescarTareas();
        imprimirListas();
        obtenerPerfil();
        navigate("/home");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-[100dvh] w-full bg-white md:bg-transparent px-4">
      {/* Logo TAZK */}
      <img
        src="/icons/TAZK.png"
        alt="tazk"
        className="fixed top-6 left-6 md:top-8 md:left-8 h-8 md:h-10 w-auto cursor-pointer z-50"
        onClick={() => navigate("/welcome")}
      />

      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm">
          <div className="bg-red-600 text-white p-4 rounded-lg shadow-2xl border-l-4 border-red-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <p className="font-medium text-sm md:text-base">{error}</p>
            </div>
            <button onClick={() => setError('')} className="ml-4 hover:text-red-200 transition">✕</button>
          </div>
        </div>
      )}

      <form
        className='bg-[#007011] w-full max-w-[450px] md:max-w-[800px] h-auto md:h-[750px] rounded-[30px] md:rounded-[50px] flex flex-col pt-24 pb-12 md:pt-40 items-center relative shadow-2xl'
        onSubmit={async (e) => {
          e.preventDefault();
          const logueado = await manejarLogin();
          if (logueado) {
            refrescarTareas();
            imprimirListas();
            obtenerPerfil();
          }
        }}>

        <h2 className='absolute top-8 md:top-10 font-bold font-poppins text-white text-[24px] md:text-[30px]'>
          Iniciar Sesión
        </h2>

        <div className='flex flex-col gap-6 md:gap-12 w-full px-8 md:px-0 items-center'>
          {/* Email Row */}
          <div className='flex flex-col md:flex-row md:items-center w-full md:w-[550px] gap-2'>
            <label className='font-inter text-[16px] md:text-[20px] text-white font-bold md:w-32 text-left md:text-right md:pr-4' htmlFor="email">
              Email
            </label>
            <input
              className='bg-white rounded-full w-full md:w-[350px] p-4 md:p-5 font-inter focus:outline-none focus:ring-4 focus:ring-[#004d0b] transition-all text-sm md:text-base'
              type="email"
              id='email'
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Row */}
          <div className='flex flex-col md:flex-row md:items-center w-full md:w-[550px] gap-2'>
            <label htmlFor="password" name="password" className='font-inter text-[16px] md:text-[20px] text-white font-bold md:w-32 text-left md:text-right md:pr-4'>
              Contraseña
            </label>
            <input
              className='bg-white rounded-full w-full md:w-[350px] p-4 md:p-5 font-inter focus:outline-none focus:ring-4 focus:ring-[#004d0b] transition-all text-sm md:text-base'
              type="password"
              id='password'
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Links aligned with inputs */}
        <div className='flex justify-between w-full max-w-[350px] md:pl-4 py-4 px-8 md:px-0'>
          <a className='text-blue-400 text-[12px] md:text-sm font-bold font-inter cursor-pointer hover:underline' href="">¿Has olvidado tu contraseña?</a>
          <a className='text-blue-400 text-[12px] md:text-sm font-bold font-inter cursor-pointer hover:underline' onClick={() => navigate('/registro')}>Únete</a>
        </div>

        <div className='py-6 md:py-11 scale-100 md:scale-130'>
          <GoogleLogin
            onSuccess={alTenerExito}
            onError={() => {}}
            size='large'
            shape='pill'
            width="250"
            locale="es"
          />
        </div>

        <button
          className="font-inter mt-4 md:absolute md:bottom-36 text-white border border-white bg-[#7B9F7D] rounded-full p-3 md:p-4 w-[180px] md:w-[200px] hover:scale-110 transition-transform cursor-pointer active:scale-95"
          type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;