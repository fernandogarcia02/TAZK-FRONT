import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useUsers() {
    const [email,setEmail] = useState('');
    const [nombre,setNombre] = useState('');
    const [password,setPassword] = useState('');
    const [password2,setPassword2] = useState('');
    const [foto,setFoto] = useState(null);
    const [error, setError] = useState('');
    const [perfil,setPerfil] = useState(null);
    const navigate = useNavigate();


    const Registrar = async (e) => {
            e.preventDefault();
            setError('');
            if (password.length < 8) {
                setError("La password debe incluir al menos 8 caracteres");
                return;
            }

            if (password2 !== password) {
                setError("Las passwords no coinciden");
                return;
            }
            const tieneMayuscula = /[A-Z]/.test(password);
            const tieneMinuscula = /[a-z]/.test(password);
            const tieneNumero = /[\d]/.test(password);
            const tieneEspecial = /[@$!%*?&_-]/.test(password);

            if (!tieneMayuscula || !tieneMinuscula || !tieneNumero || !tieneEspecial) {
                setError("La password debe incluir mayúscula, número y carácter especial");
                return;
            }

            const formData = new FormData();
            formData.append('nombre',nombre);
            formData.append('email',email);
            formData.append('password',password);

            if (foto) {
                formData.append('foto',foto);
            }

            try {
                const respuesta = await fetch('http://localhost:3000/api/usuarios/registro',{
                    method: 'POST',
                    body: formData
                });
                const datos = await respuesta.json();
                if (!respuesta.ok) {
                    setError(datos.mensaje);
                    return;
                }

                localStorage.setItem('token_usuario', datos.token);
                localStorage.setItem('nombre_usuario',datos.usuario.nombre);

                const token = localStorage.getItem('token_usuario');
                const crearLista = await fetch('http://localhost:3000/api/listas',{
                    method: 'POST',
                    headers: { 
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    },
                    body: JSON.stringify({nombre:'Personal'})
                });

                const res = await crearLista.json();

                if (crearLista.ok) {
                    navigate('/tareas');
                }else{
                    setError(res.mensaje);
                }
                    
            } catch (error) {
                setError(error.mensaje || "Error al crear el usuario");
            }
        }

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
            localStorage.setItem('nombre_usuario',data.usuario.nombre);
            
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

   const cerrarSesion = () =>{
        localStorage.removeItem('token_usuario');
        navigate('/welcome');
    };

    const obtenerPerfil = ()=>{
        const token = localStorage.getItem('token_usuario');

        if (!token) {
            navigate('/welcome');
            return;
        }
        try {
            const respuesta = fetch('http://localhost:3000/api/usuarios',{
                method: 'GET',
                headers: {'Authorization' : `Bearer ${token}`}
            });

            if (respuesta.ok) {
                const datos = respuesta.json();
                setPerfil(datos);
            }else{
                localStorage.removeItem('token_usuario');
                navigate('/welcome');
            }
        } catch (error) {
            console.error('Error al pedir perfil',error);
        }
    }

    useEffect(()=>{
        obtenerPerfil()
    },[]);

    return{
        cerrarSesion,
        manejarLogin,
        Registrar,
        email,
        setEmail,
        nombre,
        setNombre,
        password,
        setPassword,
        password2,
        setPassword2,
        error,
        setError,
        obtenerPerfil
    }
}

export default useUsers;