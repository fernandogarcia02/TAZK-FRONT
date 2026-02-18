import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
const Registro = () => {
    const [email,setEmail] = useState('');
    const [nombre,setNombre] = useState('');
    const [contraseña,setContraseña] = useState('');
    const [contraseña2,setContraseña2] = useState('');
    const [error, setError] = useState('');

    const Registrar = async (e) => {
        e.preventDefault();
        setError('');
        const navigate = useNavigate();
        if (contraseña.length < 8) {
            setError("La contraseña debe incluir al menos 8 caracteres");
            return;
        }

        if (contraseña2 === contraseña) {
            setError("Las contraseñas no coinciden");
            return;
        }
        const tieneMayuscula = /[A-Z]/.test(contraseña);
        const tieneMinuscula = /[a-z]/.test(contraseña);
        const tieneNumero = /[\d]/.test(contraseña);
        const tieneEspecial = /[@$!%*?&-_]/.test(contraseña);

        if (!tieneMayuscula || !tieneMinuscula || !tieneNumero || !tieneEspecial) {
            setError("La contraseña debe incluir mayúscula, número y carácter especial");
            return;
        }

        try {
            const respuesta = await fetch('http://localhost:3000/api/usuarios/resgistro',{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({nombre,email,contraseña})
            });
            const datos = await respuesta.data;
            if (respuesta.ok) {

                localStorage.setItem('token_usuario', data.token);
                navigate('/tareas');
            }else{
                setError(datos.mensaje);
            }
        } catch (error) {
            setError(error);
        }

        return(
            <div>
                <h1>Registrarse</h1>
                <form onSubmit={()=>Registrar}>
                    <input 
                    type="text" 
                    name="Nombre" 
                    id="nombre" 
                    value={nombre}
                    required 
                    onChange={(e)=>setNombre(e.target.value)} />
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}} />
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={contraseña}
                    onChange={(e)=>setContraseña(e.target.value)}/>
                    <input 
                    type="password" 
                    name="password2" 
                    id="password2" 
                    value={contraseña2}
                    onChange={(e)=>setContraseña2(e.target.value)}/>
                    <input type="submit" value="Crear cuenta" />
                </form>
            </div>
        )
        
    }
}

export default Registro;