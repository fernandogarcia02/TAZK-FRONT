import { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import useListsContext from './useListsContext';
import { API_URL } from '../config/urls';

function useTasks() {
  // ======================
  // ESTADO PRINCIPAL
  // ======================

  //Estado donde guardamosm todas las tareas
  const [items, setItems] = useState([]);

  //estados de una tarea
  const [prioridad, setPrioridad] = useState(false);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState(fechaHoy());
  const [repeticion, setRepeticion] = useState('ninguna');


  //estados para editar
  const [modalAbierto, setModalAbierto] = useState(false);
  const [taskEditar, setTaskEditar] = useState(null);
  const [editarTexto, setEditarTexto] = useState('');
  const [editarDescription, setEditarDescription] = useState('');
  const [editarFechaVencimiento, setEditarFechaVencimiento] = useState(null);
  const [editarPrioridad, setEditarPrioridad] = useState(null);

  //estado de t/f para saber cuando abrir modal de crear tarea
  const [abrirCrearTarea, setAbrirCrearTarea] = useState(false);
  //estado donde guardamos que tarea ha pasado en un error
  const [errorTarea, setErrorTarea] = useState('');
  //estado para saber si una tarea está realizando un proceso
  const [cargandoTarea, setCargandoTarea] = useState(false);


  const navigate = useNavigate();

  //Función para saber la fecha que es hoy en el formato que queremos
  const fechaHoy = () => {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }


  //Importamos los estados necesarios de listas
  const { lista, setLista, editarLista, setEditarLista } = useListsContext();

  // ======================
  // CRUD
  // ======================

  // GET TAREAS//
  // Función para actualizar el array de tareas con el de mongo
  const refrescarTareas = async () => {
    try {
      //Ponemos el cargar en true para que el usuario vea que se está realizando un proceso
      setCargandoTarea(true);
      //llamada al back
      const token = localStorage.getItem('token_usuario');
      const respuesta = await fetch(`${API_URL}/tareas`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      );
      //Si la respuesta ha sido mala borramos el token y llevamos al usuario a la página principal
      if (respuesta.status === 401) {
        localStorage.removeItem('token_usuario');
        navigate('/welcome');
        setCargandoTarea(false);
        return;
      }
      //Si la respuesta ha sido buena ponemos las tareas que tenemos en la base de datos en nuestro array
      const datos = await respuesta.json();
      setItems(datos);
      setCargandoTarea(false);
    } catch (error) {
      console.error("Error al conectar con el backend", error);
      setCargandoTarea(false);
    }
  };

  //Para que cuando se inicie la aplicación esté actualizado con mongo
  useEffect(() => {
    const token = localStorage.getItem('token_usuario');
    if (!token) {
      return;
    }
    refrescarTareas();
  }, []);

  //Función con la que creamos las tareas
  const agregarItem = async () => {
    //Si no ha puesto un título el usuario salimos de la función y mandamos el error
    if (text.trim() === '') {
      setErrorTarea("La tarea debe tener un título");
      return;
    };
    setCargandoTarea(true);
    try {
      const token = localStorage.getItem('token_usuario');
      // 1. Declaramos la variable fuera de los bloques para que sea accesible en todo el código
      let fecha_final_calculada;
      //Si hay repetición
      if (repeticion !== 'ninguna') {
        //Y es igual a diaria la fecha final será hoy
        if (repeticion === 'diaria') {
          fecha_final_calculada = fechaHoy();
        }
        //Si no si es solo fines de semana miramos si hoy estamos en fin de semana y si no es el caso usamos una función para calcular la siguiente fecha
        else if (repeticion === 'fin-de-semana') {
          const diaSemana = new Date().getDay();
          // Si es de Lunes (1) a Viernes (5), calculamos el próximo Sábado
          if (diaSemana !== 0 && diaSemana !== 6) {
            fecha_final_calculada = calcularSiguienteFecha(fechaHoy(), 'fin-de-semana');
          } else {
            fecha_final_calculada = fechaHoy();
          }
        }
        //si no si es solo entre semana miramos si hoy estamos en un dia entre semana primero si no es el caso usamos una función para calcular la siguiente fecha 
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

      // 2. Creamos el objeto 
      const nuevaTarea = {
        text,
        description,
        completed: false,
        priority: prioridad,
        list_id: lista,
        fechaVencimiento: fecha_final_calculada,
        repeticion: repeticion
      };


      //llamada al back
      const respuesta = await fetch(`${API_URL}/tareas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(nuevaTarea)
      }
      );
      //Si la respuesta no es buena lanzamos un error
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
  //función para limpiar los estados
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

  //función para marcar una tarea como realizada
  const toggleCompleted = async (id) => {
    setCargandoTarea(true);
    try {
      const token = localStorage.getItem('token_usuario');
      const tarea = items.find(item => item._id === id);
      //si no encontramos la tarea lanzamos un error
      if (!tarea) {
        setCargandoTarea(false);
        throw new Error('Error encontrando la tarea a completar')
      };

      //guardamos el estado de la fecha y cambiamos el de completado
      let fecha_final = tarea.fechaVencimiento;
      let completado = !tarea.completed;

      //si la tarea es de repetición usamos la función calcular para ver cual es la siguiente fecha que le toca dependiendo de la repetición
      if (tarea.repeticion !== 'ninguna') {
        fecha_final = calcularSiguienteFecha(fechaHoy(), tarea.repeticion);
        completado = false;
      }

      //llamada al back
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

  //función para borrar una tarea
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

  //función para guardar una tarea editada
  const guardarCambios = async () => {
    //Si la tara viene sin título salimos y mandamos el error
    if (editarTexto.trim() === '') {
      setErrorTarea('La tarea debe contener un título');
      return;
    }
    setCargandoTarea(true);
    let fecha_fin = editarFechaVencimiento;
    try {
      const token = localStorage.getItem('token_usuario');

      //si la tarea es de repetición no dejamos editar la fecha de vencimiento
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

  //función para calcular la fecha de las tareas de repetición
  const calcularSiguienteFecha = (fechaISO, tipoRepeticion) => {
    // 1. Limpiamos el formato de la DB: de "2026-05-25T00..." nos quedamos con "2026-05-25"
    const fechaLimpia = fechaISO.split('T')[0];

    // 2. Convertimos a objeto Date sin problemas de zona horaria
    const [year, month, day] = fechaLimpia.split('-').map(Number);
    let fecha = new Date(year, month - 1, day);

    const sumarDia = (d) => d.setDate(d.getDate() + 1);
    //si la repetición es diaria solo sumamos un día ya que va a ser el siguiente siempre
    if (tipoRepeticion === 'diaria') {
      sumarDia(fecha);
    }
    //si es entre semana sumamos un dia mientras el dia sea de fin de semana
    else if (tipoRepeticion === 'entre-semana') {
      do {
        sumarDia(fecha);
      } while (fecha.getDay() === 0 || fecha.getDay() === 6);
    }
    //si es fin de semana suma un dia mientras el dia sea de entre semana
    else if (tipoRepeticion === 'fin-de-semana') {
      do {
        sumarDia(fecha);
      } while (fecha.getDay() !== 0 && fecha.getDay() !== 6);
    }

    // 3. Convertimos de vuelta al formato YYYY-MM-DD 
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
