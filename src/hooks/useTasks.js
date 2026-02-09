import { useState, useEffect } from 'react';

function useTasks() {
  // ======================
  // ESTADO PRINCIPAL
  // ======================
  const [items, setItems] = useState([]);

  // ======================
  // ESTADOS DE UI / FILTROS
  // ======================
  const [filtro, setFiltro] = useState('todas');
  const [filtroPrioridad, setFiltroPrioridad] = useState('todas');
  const [prioridad, setPrioridad] = useState('alta');

  // Estado solo de inputs y modales
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
   
  //estado modales
  const [modalAbierto, setModalAbierto] = useState(false);
  const [taskActual, setTaskActual] = useState(null);
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');

  // ======================
  // CRUD
  // ======================

  // GET TAREAS//
  // 1. DEFINIMOS LA FUNCIÓN AQUÍ (Ahora es visible para todo el hook)
  const refrescarTareas = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/tareas');
      const datos = await respuesta.json(); // Forma limpia
      setItems(datos);
    } catch (error) {
      console.error("Error al conectar con el backend", error);
    }
  };

  // 2. EL useEffect SOLO LA LLAMA AL EMPEZAR
  useEffect(() => {
    refrescarTareas();
  }, []);

  const agregarItem = async () => {
    if (text.trim() === '') return;
    try {
      const nuevaTarea = {
      text,
      description,
      completed: false,
      priority: prioridad,
    };
      const respuesta = await fetch('http://localhost:3000/api/tareas',{
          method: 'POST',
          headers:{
            'Content-Type' : 'application/json'
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
    } catch (error) {
      console.error("Error creando tarea",error)  
    }

  
    
  };

  const toggleCompleted = async (id) => {
    try {
      const tarea = items.find(item => item.id === id);
      if(!tarea){throw new Error('error')};

      const respuesta = await fetch(`http://localhost:3000/api/tareas/${id}`,{
        method: 'PUT',
        headers:{
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({completed: !tarea.completed})
      }
      );
      if (!respuesta.ok) {
        throw new Error(`Error:${respuesta.status} ${respyesta.statusText}`);
      }

      refrescarTareas();
    } catch (error) {
      
    }
    
  };

  const borrarItem = async (id) => {
    try {
      const respuesta = await fetch(`http://localhost:3000/api/tareas/${id}`,
        {method: 'DELETE'}
      );
      if (!respuesta.ok) {
        throw new Error(`Error:${respuesta.status} ${respuesta.statusText}`)
      }
      refrescarTareas();
    } catch (error) {
      console.error("Error borrando la tarea",error)
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
  // FILTROS
  // ======================
  const tareasFiltradas = items
    .filter((item) => {
      if (filtro === 'completadas') return item.completed;
      if (filtro === 'pendientes') return !item.completed;
      return true;
    })
    .filter((item) => {
      if (filtroPrioridad === 'todas') return true;
      return item.priority === filtroPrioridad;
    });

  // ======================
  // ORDENACIÓN
  // ======================
  const prioridadValor = { alta: 1, media: 2, baja: 3 };

  const tareasOrdenadas = [...tareasFiltradas].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return prioridadValor[a.priority] - prioridadValor[b.priority];
  });

  // ======================
  // UTILIDADES
  // ======================
  const obtenerColor = (priority) => {
    switch (priority) {
      case 'alta':
        return 'red';
      case 'media':
        return 'orange';
      case 'baja':
        return 'green';
      default:
        return 'black';
    }
  };

  ///////////////////////////////
            //MODAL//
  //////////////////////////////////

   const abrirModal = (task) => {
    console.log(task.text);
    setTaskActual(task);
    setNuevoTexto(task.text);
    setNuevaDesc(task.description);
    setModalAbierto(true);
  };

  const guardarCambios = async () => {
    try {
      const respuesta = await fetch(`http://localhost:3000/api/tareas/${taskActual.id}`,{
        method: 'PUT',
        headers:{
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({text:nuevoTexto,description:nuevaDesc})
      });

      if (!respuesta.ok) {
        throw new Error(`error:${respuesta.status} ${respuesta.statusText}`);
      }

      refrescarTareas();
      setModalAbierto(false);
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
    filtro,
    setFiltro,
    filtroPrioridad,
    setFiltroPrioridad,
    prioridad,
    setPrioridad,
    text,
    setText,
    description,
    setDescription,
    obtenerColor,
    abrirModal,
    guardarCambios,
    modalAbierto,
    setModalAbierto,
    nuevoTexto,
    setNuevoTexto,
    nuevaDesc,
    setNuevaDesc
  };
}

export default useTasks;
