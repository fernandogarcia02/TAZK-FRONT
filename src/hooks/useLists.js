import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useLists() {
    const [listas,setListas] = useState([]);
    const [lista,setLista] = useState('');
    const [editarLista, setEditarLista] = useState(null);
    const [nombreLista, setNombreLista] = useState('');
    const [modalCrearLista, setModalCrearLista] = useState(false);

    const navegar = useNavigate();

    const crearLista = async () =>{
        if(!nombreLista.trim()) return;
        
        try {
            const token = localStorage.getItem('token_usuario');

            if(!token) return;

            const respuesta = await fetch('http://localhost:3000/api/listas',{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({nombre:nombreLista})
            });

            if(respuesta.ok){
                setNombreLista('');
                imprimirListas();
                setModalCrearLista(false);
            }else{
                const errorMensaje = respuesta.json();
                console.error("Error creando la lista:", errorMensaje.mensaje);
            }
        } catch (error) {
            console.log("Error creando la lista",error);
        }
    }

    const imprimirListas = async () =>{
        try {
            const token = localStorage.getItem('token_usuario');

            if (!token) {
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
                return;
            }

            const datos = await respuesta.json();
            setListas(Array.isArray(datos) ? datos : []);

        } catch (error) {
            console.log("Error al conectar con el servidor",error);
        }
    }

    useEffect( () => {
        const token = localStorage.getItem('token_usuario');
        if (!token) {
            return;
        }
        imprimirListas()
    },[]);

    //para que cuando se envie el formulario de la tarea lista nunca este vacio y minimo tenga el primer id que se muestra en el select
    useEffect(() =>{
        const token = localStorage.getItem('token_usuario');
        if (!token) {
            return;
        }
        if (listas.length > 0 && !lista) {
            setLista(listas[0]._id);
        }
    },[listas,lista,setLista]);


    return{
        listas,
        setListas,
        lista,
        setLista,
        editarLista,
        setEditarLista,
        imprimirListas,
        nombreLista,
        setNombreLista,
        crearLista,
        modalCrearLista,
        setModalCrearLista
    };
}

export default useLists;

