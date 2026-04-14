import { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import useListsContext from './useListsContext';
import { API_URL } from '../config/urls';

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

  const [errorTarea, setErrorTarea] = useState('');
  const [cargandoTarea, setCargandoTarea] = useState(false);

  //ESTADOS PARA REPETICIÓN
  const [repeticion, setRepeticion] = useState('ninguna');

  const navigate = useNavigate();


  const fechaHoy = () => {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  const [fechaVencimiento, setFechaVencimiento] = useState(fechaHoy());


  const { lista, setLista, editarLista, setEditarLista } = useListsContext();

  // ======================
  // CRUD
  // ======================

  // GET TAREAS//
  // 1. DEFINIMOS LA FUNCIÓN AQUÍ (Ahora es visible para todo el hook)
  const refrescarTareas = async () => {
    try {
      const token = localStorage.getItem('token_usuario');
      const respuesta = await fetch(`${API_URL}/tareas`, {
        headers: {
          'Authorization': `Bearer ${token}`
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
    if (text.trim() === '') {
      setErrorTarea("La tarea debe tener un título");
      return;
    };
    setCargandoTarea(true);
    try {
      const token = localStorage.getItem('token_usuario');
      // 1. Declaramos la variable fuera de los bloques para que sea accesible en todo el código
      let fecha_final_calculada;

      if (repeticion !== 'ninguna') {
        if (repeticion === 'diaria') {
          fecha_final_calculada = fechaHoy();
        }
        else if (repeticion === 'fin-de-semana') {
          const diaSemana = new Date().getDay();
          // Si es de Lunes (1) a Viernes (5), calculamos el próximo Sábado
          if (diaSemana !== 0 && diaSemana !== 6) {
            fecha_final_calculada = calcularSiguienteFecha(fechaHoy(), 'fin-de-semana');
          } else {
            fecha_final_calculada = fechaHoy();
          }
        }
        else if (repeticion === 'entre-semana') {
          const diaSemana = new Date().getDay();
          // Si es Sábado (6) o Domingo (0), calculamos el próximo Lunes
          if (diaSemana === 0 || diaSemana === 6) {
            fecha_final_calculada = calcularSiguienteFecha(fechaHoy(), 'entre-semana');
          } else {
            fecha_final_calculada = fechaHoy();
          }
        }
      } else {
        // Si no hay repetición, usamos la fecha que viene del input (o fechaHoy si está vacío)
        fecha_final_calculada = fechaVencimiento || fechaHoy();
      }

      // 2. Creamos el objeto UNA SOLA VEZ
      const nuevaTarea = {
        text,
        description,
        completed: false,
        priority: prioridad,
        list_id: lista,
        fechaVencimiento: fecha_final_calculada,
        repeticion: repeticion
      };



      const respuesta = await fetch(`${API_URL}/tareas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(nuevaTarea)
      }
      );

      if (!respuesta.ok) {
        setCargandoTarea(false);
        throw new Error(`Error:${respuesta.status} ${respuesta.statusText}`)
      }

      refrescarTareas();
      setCargandoTarea(false);
      setAbrirCrearTarea(false);
      limpiarFormularioTareas();
    } catch (error) {
      console.error("Error creando tarea", error)
      setErrorTarea(error || "Error con el servidor");
      setCargandoTarea(false);
    }



  };

  const limpiarFormularioTareas = () => {
    setText('');
    setDescription('');
    setPrioridad(false);
    setLista('');
    setFechaVencimiento(fechaHoy());
    setRepeticion('ninguna');
    setEditarTexto('');
    setEditarDescription('');
    setEditarFechaVencimiento(null);
    setEditarPrioridad(null);
    setEditarLista(null);
  }

  const toggleCompleted = async (id) => {
    setCargandoTarea(true);
    try {
      const token = localStorage.getItem('token_usuario');
      const tarea = items.find(item => item._id === id);
      if (!tarea) {
        setCargandoTarea(false);
        throw new Error('Error encontrando la tarea a completar')
      };
      let fecha_final = tarea.fechaVencimiento;
      let completado = !tarea.completed;

      if (tarea.repeticion !== 'ninguna') {
        fecha_final = calcularSiguienteFecha(fechaHoy(), tarea.repeticion);
        completado = false;
      }

      const respuesta = await fetch(`${API_URL}/tareas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: completado, fechaVencimiento: fecha_final })
      }
      );
      if (!respuesta.ok) {
        setCargandoTarea(false);
        throw new Error(`Error:${respuesta.status} ${respuesta.statusText}`);
      }
      setCargandoTarea(false);
      refrescarTareas();
    } catch (error) {
      console.error(error);
      setErrorTarea(error || 'Error de conexión');
      setCargandoTarea(false);
    }

  };

  const borrarItem = async (id) => {
    setCargandoTarea(true);
    try {
      const token = localStorage.getItem('token_usuario');
      const respuesta = await fetch(`${API_URL}/tareas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      );
      if (!respuesta.ok) {
        setCargandoTarea(false);
        throw new Error(`Error:${respuesta.status} ${respuesta.statusText}`)
      }

      refrescarTareas();
      setModalAbierto(false);
      setTaskEditar(null);
      setCargandoTarea(false);
      limpiarFormularioTareas();
    } catch (error) {
      console.error("Error borrando la tarea", error);
      setCargandoTarea(false);
      setErrorTarea(error || 'Error de conexión')
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
    if (editarTexto.trim() === '') {
      setErrorTarea('La tarea debe contener un título');
      return;
    }
    setCargandoTarea(true);
    let fecha_fin = editarFechaVencimiento;
    try {
      const token = localStorage.getItem('token_usuario');

      if (taskEditar.repeticion !== 'ninguna') {
        fecha_fin = taskEditar.fechaVencimiento;
      }

      const tareaEditada = {
        text: editarTexto,
        description: editarDescription,
        priority: editarPrioridad,
        list_id: editarLista,
        fechaVencimiento: fecha_fin
      }
      const respuesta = await fetch(`${API_URL}/tareas/${taskEditar._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tareaEditada)
      });

      if (!respuesta.ok) {
        setCargandoTarea(false);
        throw new Error(`error:${respuesta.status} ${respuesta.statusText}`);
      }

      refrescarTareas();
      setModalAbierto(false);
      setTaskEditar(null);
      setCargandoTarea(false);
      limpiarFormularioTareas();
    } catch (error) {
      console.error("Ha habido un error", error);
      setCargandoTarea(false);
    }

  };

  const calcularSiguienteFecha = (fechaISO, tipoRepeticion) => {
    // 1. Limpiamos el formato de la DB: de "2026-05-25T00..." nos quedamos con "2026-05-25"
    const fechaLimpia = fechaISO.split('T')[0];

    // 2. Convertimos a objeto Date sin problemas de zona horaria
    const [year, month, day] = fechaLimpia.split('-').map(Number);
    let fecha = new Date(year, month - 1, day);

    const sumarDia = (d) => d.setDate(d.getDate() + 1);

    if (tipoRepeticion === 'diaria') {
      sumarDia(fecha);
    }
    else if (tipoRepeticion === 'entre-semana') {
      do {
        sumarDia(fecha);
      } while (fecha.getDay() === 0 || fecha.getDay() === 6);
    }
    else if (tipoRepeticion === 'fin-de-semana') {
      do {
        sumarDia(fecha);
      } while (fecha.getDay() !== 0 && fecha.getDay() !== 6);
    }

    // 3. Convertimos de vuelta al formato YYYY-MM-DD que le gusta a tu input
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
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
    fechaHoy,
    refrescarTareas,
    errorTarea,
    setErrorTarea,
    cargandoTarea,
    setCargandoTarea,
    repeticion,
    setRepeticion,
    limpiarFormularioTareas
  };
}

export default useTasks;
