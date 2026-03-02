import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useLists() {
    const [listas,setListas] = useState([]);
    const [lista,setLista] = useState('');

    const navegar = useNavigate();

    const imprimirListas = async () =>{
        try {
            const token = localStorage.getItem('token_usuario');

            if (!token) {
                navegar('login');
                return;
            }
            const respuesta = await fetch('http://localhost:3000/api/listas',{
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            }
            );

            if (respuesta.status === 401) {
                localStorage.removeItem('token_usuario');
                navegar('/login');
                return;
            }

            const datos = await respuesta.json();
            setListas(Array.isArray(datos) ? datos : []);

        } catch (error) {
            console.log("Error al conectar con el servidor",error);
        }
    }

    useEffect( () => {
        imprimirListas()
    },[]);


    return{
        listas,
        setListas,
        lista,
        setLista,
        imprimirListas
    };
}

export default useLists;

