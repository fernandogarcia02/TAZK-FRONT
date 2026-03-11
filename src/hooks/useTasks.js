import { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import useListsContext from './useListsContext';

function useTasks() {
  // ======================
  // ESTADO PRINCIPAL
  // ======================
  const [items, setItems] = useState([]);

  const [prioridad, setPrioridad] = useState(false);

  // Estado solo de inputs y modales
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  
   
  //estados para editar
  const [modalAbierto, setModalAbierto] = useState(false);
  const [taskEditar, setTaskEditar] = useState(null);
  const [editarTexto, setEditarTexto] = useState('');
  const [editarDescription, setEditarDescription] = useState('');
  const [editarFechaVencimiento, setEditarFechaVencimiento] = useState(null);
  const [editarPrioridad, setEditarPrioridad] = useState(null);
  

  const [abrirCrearTarea, setAbrirCrearTarea] = useState(false);

  const navigate = useNavigate();


  const fechaHoy = () =>{
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth()+1).padStart(2,'0');
    const dd = String(hoy.getDate()).padStart(2,'0');
    return `${yyyy}-${mm}-${dd}`;
  }

  const [fechaVencimiento, setFechaVencimiento] = useState(fechaHoy());


  const{lista,setLista,editarLista,setEditarLista} = useListsContext();

  // ======================
  // CRUD
  // ======================

  // GET TAREAS//
  // 1. DEFINIMOS LA FUNCIÓN AQUÍ (Ahora es visible para todo el hook)
  const refrescarTareas = async () => {
    try {
      const token = localStorage.getItem('token_usuario');
      const respuesta = await fetch('http://localhost:3000/api/tareas',{
        headers:{
          'Authorization' : `Bearer ${token}`
        }
      }
      );

      if (respuesta.status === 401) {
        localStorage.removeItem('token_usuario');
        navigate('/welcome');
        return;
      }
      const datos = await respuesta.json(); // Forma limpia
      setItems(datos);
    } catch (error) {
      console.error("Error al conectar con el backend", error);
    }
  };

  // 2. EL useEffect SOLO LA LLAMA AL EMPEZAR
  useEffect(() => {
    const token = localStorage.getItem('token_usuario');
    if (!token) {
      return;
    }
    refrescarTareas();
  }, []);

  const agregarItem = async () => {
    if (text.trim() === '') return;
    try {
      const token = localStorage.getItem('token_usuario');
      const nuevaTarea = {
      text,
      description,
      completed: false,
      priority: prioridad,
      list_id: lista,
      fechaVencimiento: fechaVencimiento
    };
      const respuesta = await fetch('http://localhost:3000/api/tareas',{
          method: 'POST',
          headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          },
          body: JSON.stringify(nuevaTarea)
        }
      );
      
      if (!respuesta.ok) {
        throw new Error(`Error:${respuesta.status} ${respuesta.statusText}`)
      }

      refrescarTareas();
      setText('');
      setDescription('');
      setPrioridad(false);
      setLista('');
      setFechaVencimiento(fechaHoy());
    } catch (error) {
      console.error("Error creando tarea",error)  
    }

  
    
  };

  const toggleCompleted = async (id) => {
    try {
      const token = localStorage.getItem('token_usuario');
      const tarea = items.find(item => item._id === id);
      if(!tarea){throw new Error('error')};

      const respuesta = await fetch(`http://localhost:3000/api/tareas/${id}`,{
        method: 'PUT',
        headers:{
          'Content-type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({completed: !tarea.completed})
      }
      );
      if (!respuesta.ok) {
        throw new Error(`Error:${respuesta.status} ${respuesta.statusText}`);
      }

      refrescarTareas();
    } catch (error) {
      
    }
    
  };

  const borrarItem = async (id) => {
    try {
      const token = localStorage.getItem('token_usuario');
      const respuesta = await fetch(`http://localhost:3000/api/tareas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      );
      if (!respuesta.ok) {
        throw new Error(`Error:${respuesta.status} ${respuesta.statusText}`)
      }
      refrescarTareas();
      setModalAbierto(false);
      setTaskEditar(null);
      setEditarTexto('');
      setEditarDescription('');
      setEditarFechaVencimiento(null);
      setEditarPrioridad(null);
      setEditarLista(null);
    } catch (error) {
      console.error("Error borrando la tarea", error)
    }
  };

  const editarItem = (id, nuevoTexto, nuevaDesc) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, text: nuevoTexto, description: nuevaDesc }
          : item
      )
    );
  };

 

  // ======================
  // ORDENACIÓN
  // ======================
 const tareasOrdenadas = [...items].sort((a, b) => {
  // 1. Prioridad por estado de completado
  // (Queremos las NO completadas arriba)
  if (a.completed !== b.completed) {
    return a.completed ? 1 : -1;
  }

  // 2. Si ambas están igual (ej: ambas pendientes), ordenamos por fecha
  const fechaA = new Date(a.fechaVencimiento).getTime();
  const fechaB = new Date(b.fechaVencimiento).getTime();

  // Si no hay fecha, la mandamos al final
  if (isNaN(fechaA)) return 1;
  if (isNaN(fechaB)) return -1;

  return fechaA - fechaB; // Menor tiempo (más vieja/próxima) primero
});


  ///////////////////////////////
            //MODAL//
  //////////////////////////////////

   const abrirModal = (task) => {
    setTaskEditar(task);
    setEditarTexto(task.text);
    setEditarDescription(task.description);
    setEditarFechaVencimiento(task.fechaVencimiento ? task.fechaVencimiento.split('T')[0] : "");
    setEditarLista(task.list_id);
    setEditarPrioridad(task.priority);
    setModalAbierto(true);
  };

  const modalCrearTarea = () => {
    setAbrirCrearTarea(true);
  }

  const guardarCambios = async () => {
    try {
      const token = localStorage.getItem('token_usuario');
      const tareaEditada = {
        text:editarTexto,
        description:editarDescription,
        priority:editarPrioridad,
        list_id:editarLista,
        fechaVencimiento:editarFechaVencimiento
      }
      const respuesta = await fetch(`http://localhost:3000/api/tareas/${taskEditar._id}`,{
        method: 'PUT',
        headers:{
          'Content-type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(tareaEditada)
      });

      if (!respuesta.ok) {
        throw new Error(`error:${respuesta.status} ${respuesta.statusText}`);
      }

      refrescarTareas();
      setModalAbierto(false);
      setTaskEditar(null);
      setEditarTexto('');
      setEditarDescription('');
      setEditarFechaVencimiento(null);
      setEditarLista(null);
      setEditarPrioridad(null);
    } catch (error) {
      console.error("Ha habido un error",error);
    }
    
  };

  

  // ======================
  // RETURN (MOCHILA)
  // ======================
  return {
    items: tareasOrdenadas,
    agregarItem,
    borrarItem,
    toggleCompleted,
    editarItem,
    prioridad,
    setPrioridad,
    text,
    setText,
    description,
    setDescription,
    abrirModal,
    guardarCambios,
    modalAbierto,
    setModalAbierto,
    taskEditar,
    setTaskEditar,
    editarTexto,
    setEditarTexto,
    editarDescription,
    setEditarDescription,
    editarPrioridad,
    setEditarPrioridad,
    editarFechaVencimiento,
    setEditarFechaVencimiento,
    modalCrearTarea,
    abrirCrearTarea,
    setAbrirCrearTarea,
    fechaVencimiento,
    setFechaVencimiento,
    fechaHoy
  };
}

export default useTasks;
