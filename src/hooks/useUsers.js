import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { API_URL } from '../config/urls';


function useUsers() {
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [foto, setFoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');
    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();


    const Registrar = async () => {
        setError('');
        setExito('');
        setCargando(true);
        if (password.length < 8) {
            setError("La password debe incluir al menos 8 caracteres");
            setCargando(false);
            return;
        }

        if (password2 !== password) {
            setError("Las passwords no coinciden");
            setCargando(false);
            return;
        }
        const tieneMayuscula = /[A-Z]/.test(password);
        const tieneMinuscula = /[a-z]/.test(password);
        const tieneNumero = /[\d]/.test(password);
        const tieneEspecial = /[@$!%*?&_-]/.test(password);

        if (!tieneMayuscula || !tieneMinuscula || !tieneNumero || !tieneEspecial) {
            setError("La password debe incluir mayúscula, número y carácter especial");
            setCargando(false);
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('email', email);
        formData.append('password', password);

        if (foto) {
            formData.append('foto', foto);
        }

        try {
            const respuesta = await fetch(`${API_URL}/usuarios/registro`, {
                method: 'POST',
                body: formData
            });
            const datos = await respuesta.json();
            if (!respuesta.ok) {
                setError(datos.mensaje);
                setCargando(false);
                return;
            }

            // localStorage.setItem('token_usuario', datos.token);
            // localStorage.setItem('nombre_usuario',datos.usuario.nombre);

            // const token = localStorage.getItem('token_usuario');
            // const crearLista = await fetch('/api/listas',{
            //     method: 'POST',
            //     headers: { 
            //         'Content-Type' : 'application/json',
            //         'Authorization' : `Bearer ${token}`
            //     },
            //     body: JSON.stringify({nombre:'Personal'})
            // });

            // const res = await crearLista.json();

            // await obtenerPerfil();


            limpiarFormulario();
            setCargando(false);
            setExito(datos.mensaje);
            

            setTimeout(() => {
                navigate('/login');
            }, 5000);

        } catch (error) {
            console.error(error);
            setCargando(false);
            setError("Error al crear el usuario");
        }
    }

    const manejarLogin = async () => { // Quitamos el (e) de aquí si ya lo controlas en el form
        setError('');
        setCargando(true);

        try {
            const respuesta = await fetch(`${API_URL}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                localStorage.setItem('token_usuario', data.token);
                localStorage.setItem('nombre_usuario', data.usuario.nombre);

                limpiarFormulario();
                setCargando(false);
                navigate('/home');

                return true; // <--- AGREGADO: Éxito
            } else {
                setError(data.mensaje || 'Error al iniciar sesión');
                console.log("asaaaaaaa")
                limpiarFormulario();
                setCargando(false);
                return false; // <--- AGREGADO: Fallo
            }
        } catch (err) {
            setError('No se pudo conectar con el servidor');
            console.log("asaaaa")
            limpiarFormulario();
            setCargando(false);
            return false; // <--- AGREGADO: Error de red
        }
    };
    const enviarEmailOlvide = async () => {
        setError('');
        setExito('');
        setCargando(true);
        

        try {
            const respuesta = await fetch(`${API_URL}/usuarios/olvide-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await respuesta.json();

            if (!respuesta.ok) {
                setError(data.mensaje || 'Error al enviar el email');
                limpiarFormulario();
                setCargando(false);
                return;
            } else {
                setExito(data.mensaje || 'Revisa tu correo');
                limpiarFormulario();
                setCargando(false);
                return;
            }
        } catch (error) {
            setError('No se pudo conectar con el servidor');
            limpiarFormulario();
            setCargando(false);
            return;
        }
    };

    const cambiarPassword = async (token) => {
        setExito('');
        setError('');
        setCargando(true);
        if (password.length < 8) {
            setError("La password debe incluir al menos 8 caracteres");
            setCargando(false);
            return;
        }

        if (password2 !== password) {
            setError("Las passwords no coinciden");
            setCargando(false);
            return;
        }
        const tieneMayuscula = /[A-Z]/.test(password);
        const tieneMinuscula = /[a-z]/.test(password);
        const tieneNumero = /[\d]/.test(password);
        const tieneEspecial = /[@$!%*?&_-]/.test(password);

        if (!tieneMayuscula || !tieneMinuscula || !tieneNumero || !tieneEspecial) {
            setError("La password debe incluir mayúscula, número y carácter especial");
            setCargando(false);
            return;
        }
        try {
            const respuesta = await fetch(`${API_URL}/usuarios/olvide-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await respuesta.json();

            if (respuesta.ok) {
                setExito(data.mensaje || 'Contraseña cambiada con éxito');
                limpiarFormulario();
                setCargando(false);
                navigate('/login');
                return;
            } else {
                setError(data.mensaje || 'Error al cambiar la contraseña');
                setCargando(false);
                limpiarFormulario();
                return;
            }
        } catch (error) {
            setError('No se pudo conectar con el servidor');
            limpiarFormulario();
            setCargando(false);
            return;
        }
    };


    const cerrarSesion = () => {
        localStorage.removeItem('token_usuario');
        setPerfil(null);
        limpiarFormulario();
        navigate('/welcome');
    };

    const manejarCambioFoto = async (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            //vista previa de la foto al registrarse
            const urlPreview = URL.createObjectURL(archivo);
            setPreview(urlPreview);

            //configurar compresion de la libreria image-compression
            const opciones = {
                maxSizeMB: 1,
                maxWidthOrHeight: 800,
                useWebWorker: true
            };

            try {
                //ejecutamos la compresion
                const archivoComprimido = await imageCompression(archivo, opciones);

                setFoto(archivoComprimido);
            } catch (error) {
                console.log('error al comprimir foto');
            }


        }
    }

    const limpiarFormulario = () => {
        setNombre('');
        setEmail('');
        setPassword('');
        setPassword2('');
        setFoto(null);
        setPreview(null);
    };

    const obtenerPerfil = async () => {
        const token = localStorage.getItem('token_usuario');

        if (!token) {
            return;
        }
        try {
            const respuesta = await fetch(`${API_URL}/usuarios`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (respuesta.ok) {
                const datos = await respuesta.json();
                setPerfil(datos);
            } else {
                localStorage.removeItem('token_usuario');
            }
        } catch (error) {
            console.error('Error al pedir perfil', error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token_usuario');
        if (token) {
            obtenerPerfil()
        }
    }, []);

    return {
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
        obtenerPerfil,
        perfil,
        setPerfil,
        foto,
        setFoto,
        preview,
        manejarCambioFoto,
        exito,
        setExito,
        enviarEmailOlvide,
        cambiarPassword,
        cargando,
        setCargando
    }
}

export default useUsers;