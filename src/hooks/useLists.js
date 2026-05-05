import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../config/urls';

//en este archivo ponemos toda la lógica relacionada con las listas
function useLists() {
    //creamos todos los estados necesarios
    //aqui guardaremos todas las listas
    const [listas, setListas] = useState([]);
    //para guardar una lista en concreto
    const [lista, setLista] = useState('');
    //estado donde guardamos el id de la lista de una tarea editada
    const [editarLista, setEditarLista] = useState(null);
    //para guardar el nombre la lista a la hora de crear una lista
    const [nombreLista, setNombreLista] = useState('');
    //estado para controlar cuando abrir o cerrar el modal de crear lista
    const [modalCrearLista, setModalCrearLista] = useState(false);
    //estado para controlar cuando abrir o cerrar el modal para eliminar una lista
    const [modalEliminarLista, setModalEliminarLista] = useState(false);
    //estado donde guardamos la lista que tenemos que eliminar
    const [listaAEliminar, setListaAEliminar] = useState(null);
    //estado para controlar cuando abrir o cerrar el modal para editar una lista
    const [modalEditarLista, setModalEditarLista] = useState(false);
    //estado donde guardamos la lista que tenemos que editar
    const [listaAEditar, setListaAEditar] = useState(null);
    //estado donde guardamos el nuevo nombre de la lista en editar
    const [nuevoNombre, setNuevoNombre] = useState('');
    //estado para saber si estan cargando las peticiones que hacemos al servidor
    const [cargandoLista, setCargandoLista] = useState(false);

    const navegar = useNavigate();

    //función para abrir el modal de editar y donde guardamos los datos necesarios para ello 
    const abrirModal = (lista) =>{
        setModalEditarLista(true);
        setListaAEditar(lista._id);
        setNuevoNombre(lista.nombre);
    }

    //función para crear una nueva lista
    const crearLista = async () => {
        //si el nombre está vacío salimos
        if (!nombreLista.trim()) return;
        //ponemos el spinn de cargar a funcionar
        setCargandoLista(true);
        
        //hacemos la petición al servidor
        try {
            const token = localStorage.getItem('token_usuario');

            //si el usuario no tiene un token de inicio de sesión salimos
            if (!token){
                setCargandoLista(false);
                return};

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
                setCargandoLista(false);
            } else {
                const errorMensaje = respuesta.json();
                setCargandoLista(false);
                console.error("Error creando la lista:", errorMensaje.mensaje);
            }
        } catch (error) {
            setCargandoLista(false);
            console.log("Error creando la lista", error);
        }
    }

    //función para editar una lista
    const editarList = async (id) => {
        //si el nombre está vacío salimos
        if (!nuevoNombre.trim()) return 

        setCargandoLista(true);
        
        //petición al servidor
        try {
            //si el usuario no tiene un token de inicio de sesión salimos
            const token = localStorage.getItem('token_usuario');
            if(!token){ 
                setCargandoLista(false);
                return};

            const respuesta = await fetch(`${API_URL}/listas/${id}`,{
                method: 'PUT',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({nombre:nuevoNombre})
            });

            if (respuesta.ok) {
                //si petición ha ido bien actualizamos el estado donde guardamos las listas
                await imprimirListas();
                setNuevoNombre('');
                setListaAEditar(null);
                setModalEditarLista(false);
                setCargandoLista(false);
            }else{
                console.error("error editando la lista");
                setCargandoLista(false);
            }
        } catch (error) {
            console.error(error);
            setCargandoLista(false);
        }
    }

    //función para eliminar una lista
    const eliminarLista = async (id) => {
        setCargandoLista(true);

        //petición al servidor
        try {
            //si no hay token de inicio de sesión salimos
            const token = localStorage.getItem('token_usuario');
            if (!token){ 
                setCargandoLista(true);
                return};

            const respuesta = await fetch(`${API_URL}/listas/${id}`,{
                method: 'DELETE',
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });
            imprimirListas();
            setListaAEliminar(null);
            setModalEliminarLista(false);
            setCargandoLista(false);
        } catch (error) {
            console.error("Error al borrar", error);
            setCargandoLista(false);
        }


    }

    //función para guardar en un estado las listas
    const imprimirListas = async () => {
        try {
            //si no hay token de inicio de sesión salimos
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

    //función para comprobar si el usuario no tiene listas creadas
    const comprobarListas = async () => {
        try {
            //si no hay token de inicio de sesión salimos
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

    //useEffect para que en cuanto se abra la app guardamos las listas del usuario
    useEffect(() => {
        const token = localStorage.getItem('token_usuario');
        if (!token) {
            return;
        }
        imprimirListas()
    }, []);

    //para que cuando se envie el formulario de crear tarea el select de lista nunca este vacio y minimo tenga el primer id que se muestra en el select
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
        comprobarListas,
        cargandoLista,
        setCargandoLista
    };
}

export default useLists;

