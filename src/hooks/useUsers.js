import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { API_URL } from '../config/urls';


function useUsers() {
    //estados del usuario
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [foto, setFoto] = useState(null);
    const [preview, setPreview] = useState(null);
    //estado para mostrar mensaje de error
    const [error, setError] = useState('');
    //estado para mostrar mensaje de éxito
    const [exito, setExito] = useState('');
    //estado donde guardamos usuarios
    const [perfil, setPerfil] = useState(null);
    //estado para mostrar cuando un proceso está cargando
    const [cargando, setCargando] = useState(false);
    //estado para abrir el modal para editar una foto
    const [abrirModalFoto, setAbrirModalFoto] = useState(false);
    const navigate = useNavigate();

    //Función con la registramos a un usuario
    const Registrar = async () => {
        setError('');
        setExito('');
        setCargando(true);
        //Si la contraseña es menor de 8 salimos y mandamos el error
        if (password.length < 8) {
            setError("La password debe incluir al menos 8 caracteres");
            setCargando(false);
            return;
        }
        //Si las contraseñas no coinciden salimos y mandamos error
        if (password2 !== password) {
            setError("Las passwords no coinciden");
            setCargando(false);
            return;
        }
        //Comprobaciones para ver si la contraseña cumple los requisitos, en caso de no salimos y mandamos el error
        const tieneMayuscula = /[A-Z]/.test(password);
        const tieneMinuscula = /[a-z]/.test(password);
        const tieneNumero = /[\d]/.test(password);
        const tieneEspecial = /[@$!%*?&_-]/.test(password);
        if (!tieneMayuscula || !tieneMinuscula || !tieneNumero || !tieneEspecial) {
            setError("La password debe incluir mayúscula, número y carácter especial");
            setCargando(false);
            return;
        }

        //creamos un objeot formData para poder enviar la foto al back y añadimos todo
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('email', email);
        formData.append('password', password);

        if (foto) {
            formData.append('foto', foto);
        }

        //llamada al back
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
            limpiarFormulario();
            setCargando(false);
            setExito(datos.mensaje);
            
            //Esperamos un poco para que el usaurio pueda ver el mensaje de éxito y lo mandamos para el login
            setTimeout(() => {
                navigate('/login');
            }, 5000);

        } catch (error) {
            console.error(error);
            setCargando(false);
            setError("Error al crear el usuario");
        }
    }
    //Función para loguear al usuario
    const manejarLogin = async () => { 
        setError('');
        setCargando(true);

        //llamada al back
        try {
            const respuesta = await fetch(`${API_URL}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await respuesta.json();

            //si la respuesta es buena guardamos en el navegador el token y el nombre de usuario y lo enviamos al home
            if (respuesta.ok) {
                localStorage.setItem('token_usuario', data.token);
                localStorage.setItem('nombre_usuario', data.usuario.nombre);

                limpiarFormulario();
                setCargando(false);
                navigate('/home');

                return true; // <--- Éxito
            } else {
                //si no ha podido loguearse salimos y enviamos el error del porqué
                if (data.mensaje === "Tu cuenta aún no ha sido confirmada") {
                    setError('Tu cuenta aún no ha sido confirmada. REENVIAR_EMAIL');
                    setCargando(false);
                    return false;
                }
                setError(data.mensaje || 'Error al iniciar sesión');
                limpiarFormulario();
                setCargando(false);
                return false; // <---  Fallo
            }
        } catch (err) {
            setError('No se pudo conectar con el servidor');
            console.log("asaaaa")
            limpiarFormulario();
            setCargando(false);
            return false; // <--- AGREGADO: Error de red
        }
    };

    //Función para que se reenvie un email al usuario para confirmar su correo
    const reenviarEmail = async () => {
        setCargando(true);
        setError('');
        setExito('');
        try {
            const respuesta = await fetch(`${API_URL}/usuarios/reenviar`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({email})
            });

            const data = await respuesta.json();

            if (!respuesta.ok) {
                setError(data.mensaje);
                limpiarFormulario();
                setCargando(false);
                return;
            }else{
                setExito(data.mensaje);
                limpiarFormulario();
                setCargando(false);
                return;
            }
        } catch (error) {
            setError(error.message || 'Error de conexión');
            limpiarFormulario();
            setCargando(false);
            return;
        }
    };

    //funcion para enviar email al usuario para reestablecer su contraseña
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

    //función donde se cambia la password
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
    
    //función para el preview a la hora de subir fotos
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

    //función para limpiar el formulario
    const limpiarFormulario = () => {
        setNombre('');
        setEmail('');
        setPassword('');
        setPassword2('');
        setFoto(null);
        setPreview(null);
    };

    //función para obtener todos los perfiles
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
        setCargando,
        reenviarEmail,
        abrirModalFoto,
        setAbrirModalFoto
    }
}

export default useUsers;