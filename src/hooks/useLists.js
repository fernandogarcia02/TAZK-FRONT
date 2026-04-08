import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../config/urls';


function useLists() {
    const [listas, setListas] = useState([]);
    const [lista, setLista] = useState('');
    const [editarLista, setEditarLista] = useState(null);
    const [nombreLista, setNombreLista] = useState('');
    const [modalCrearLista, setModalCrearLista] = useState(false);
    const [modalEliminarLista, setModalEliminarLista] = useState(false);
    const [listaAEliminar, setListaAEliminar] = useState(null);
    const [modalEditarLista, setModalEditarLista] = useState(false);
    const [listaAEditar, setListaAEditar] = useState(null);
    const [nuevoNombre, setNuevoNombre] = useState('');

    const navegar = useNavigate();

    const abrirModal = (lista) =>{
        setModalEditarLista(true);
        setListaAEditar(lista._id);
        setNuevoNombre(lista.nombre);
    }

    const crearLista = async () => {
        if (!nombreLista.trim()) return;

        try {
            const token = localStorage.getItem('token_usuario');

            if (!token) return;

            const respuesta = await fetch(`${API_URL}/listas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nombre: nombreLista })
            });

            if (respuesta.ok) {
                setNombreLista('');
                imprimirListas();
                setModalCrearLista(false);
            } else {
                const errorMensaje = respuesta.json();
                console.error("Error creando la lista:", errorMensaje.mensaje);
            }
        } catch (error) {
            console.log("Error creando la lista", error);
        }
    }

    const editarList = async (id) => {
        if (!nuevoNombre.trim()) return 
            
        try {
            const token = localStorage.getItem('token_usuario');
            if(!token) return;

            const respuesta = await fetch(`${API_URL}/listas/${id}`,{
                method: 'PUT',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({nombre:nuevoNombre})
            });

            if (respuesta.ok) {
                await imprimirListas();
                setNuevoNombre('');
                setListaAEditar(null);
                setModalEditarLista(false);
            }else{
                console.error("error editando la lista")
            }
        } catch (error) {
            console.error(error);
        }
    }

    const eliminarLista = async (id) => {

        try {
            const token = localStorage.getItem('token_usuario');
            if (!token) return;

            const respuesta = await fetch(`${API_URL}/listas/${id}`,{
                method: 'DELETE',
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });
            imprimirListas();
            setListaAEliminar(null);
            setModalEliminarLista(false);
        } catch (error) {
            console.error("Error al borrar", error)
        }


    }

    const imprimirListas = async () => {
        try {
            const token = localStorage.getItem('token_usuario');

            if (!token) {
                return;
            }
            const respuesta = await fetch(`${API_URL}/listas`, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
            console.log("Error al conectar con el servidor", error);
        }
    }

    const comprobarListas = async () => {
        try {
            const token = localStorage.getItem('token_usuario');
            if(!token) return;
            const respuesta = await fetch(`${API_URL}/listas`,{
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });

            const datos =  await respuesta.json();

            if(datos.length === 0){
                return true;
            } 
            return false;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token_usuario');
        if (!token) {
            return;
        }
        imprimirListas()
    }, []);

    //para que cuando se envie el formulario de la tarea lista nunca este vacio y minimo tenga el primer id que se muestra en el select
    useEffect(() => {
        const token = localStorage.getItem('token_usuario');
        if (!token) {
            return;
        }
        if (listas.length > 0 && !lista) {
            setLista(listas[0]._id);
        }
    }, [listas, lista, setLista]);


    return {
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
        setModalCrearLista,
        eliminarLista,
        modalEliminarLista,
        setModalEliminarLista,
        listaAEliminar,
        setListaAEliminar,
        abrirModal,
        nuevoNombre,
        setNuevoNombre,
        modalEditarLista,
        setModalEditarLista,
        listaAEditar,
        setListaAEditar,
        editarList,
        comprobarListas
    };
}

export default useLists;

