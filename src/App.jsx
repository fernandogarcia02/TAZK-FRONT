import { useState } from 'react';
import './App.css';
import TaskList from './TaskList';

function App() {
  // ======================
  // ESTADOS PRINCIPALES
  // ======================
  const [items, setItems] = useState([]);            // Array de tareas
  const [item, setNewItem] = useState('');          // Texto de la nueva tarea
  const [description, setNewDescription] = useState(''); // Descripción de la nueva tarea
  const [prioridad, setPrioridad] = useState('alta');    // Prioridad por defecto de la nueva tarea

  // ======================
  // ESTADOS DE FILTROS
  // ======================
  const [filtro, setFiltro] = useState('todas');           // Filtro por estado: todas, completadas, pendientes
  const [filtroPrioridad, setFiltroPrioridad] = useState('todas'); // Filtro por prioridad: todas, alta, media, baja

  // ======================
  // MODAL PARA EDITAR SOLO TEXTO
  // ======================
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tareaAEditar, setTareaAEditar] = useState(null); // ID de la tarea a editar
  const [nuevoTexto, setNuevoTexto] = useState('');       // Nuevo texto para el modal

  // ======================
  // MODAL PARA VER/EDITAR COMPLETO
  // ======================
  const [modalItemAbierto, setModalItemAbierto] = useState(false);
  const [tareaAabrir, setTareaAabrir] = useState(null); // ID de la tarea abierta
  const [nuevoTexto2, setNuevoTexto2] = useState('');   // Texto editable en modal completo
  const [nuevaDesc, setNuevaDesc] = useState('');       // Descripción editable en modal completo

  // ======================
  // FUNCIONES PARA MODAL DE SOLO TEXTO
  // ======================
  const abrirModal = (id) => {
    const tarea = items.find((item) => item.id === id);
    setModalAbierto(true);
    setTareaAEditar(id);
    setNuevoTexto(tarea.text);
  };

  const guardarCambios = () => {
    const nuevasTareas = items.map((item) => {
      if (item.id === tareaAEditar) {
        return { ...item, text: nuevoTexto }; // Solo cambiamos el texto
      }
      return item;
    });

    setItems(nuevasTareas);
    setModalAbierto(false);
    setTareaAEditar(null);
    setNuevoTexto('');
  };

  // ======================
  // FUNCIONES PARA MODAL DE TAREA COMPLETA
  // ======================
  const abrirModalItem = (id) => {
    const tarea = items.find((item) => item.id === id);
    setModalItemAbierto(true);
    setTareaAabrir(id);
    setNuevoTexto2(tarea.text);
    setNuevaDesc(tarea.description);
  };

  const guardarCambios2 = () => {
    const nuevasTareas = items.map((item) => {
      if (item.id === tareaAabrir) {
        return { ...item, text: nuevoTexto2, description: nuevaDesc }; // Cambiamos texto y descripción
      }
      return item;
    });

    setItems(nuevasTareas);
    setModalItemAbierto(false);
    setTareaAabrir(null);
    setNuevoTexto2('');
    setNuevaDesc('');
  };

  // ======================
  // FUNCIONES CRUD (Crear, Leer, Actualizar, Borrar)
  // ======================
  const agregarItem = () => {
    if (item.trim() === '') return; // No agregamos tareas vacías

    const nuevaTarea = {
      id: crypto.randomUUID(), // ID único e inmutable para la tarea
      text: item,
      description,
      completed: false,
      priority: prioridad,
    };

    setItems([...items, nuevaTarea]);
    setNewItem('');
    setNewDescription('');
  };

  const toggleCompleted = (id) => {
    const nuevasTareas = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed }; // Alterna completado
      }
      return item;
    });
    setItems(nuevasTareas);
  };

  const borrarItem = (id) => {
    const nuevasTareas = items.filter((item) => item.id !== id);
    setItems(nuevasTareas);
  };

  // ======================
  // FILTROS Y ORDENACIÓN
  // ======================
  // Filtra por prioridad
  const filtrarPorPrioridad = items.filter((item) =>
    filtroPrioridad === 'todas' ? true : item.priority === filtroPrioridad
  );

  // Función para obtener el color según prioridad
  const obtenerColor = (item) => {
    switch (item.priority) {
      case 'alta':
        return 'red';
      case 'media':
        return 'orange';
      case 'baja':
        return 'green';
      default:
        return 'white';
    }
  };

  // Ordena tareas: primero por completadas y luego por prioridad
  const ordenarTareas = (tareas) => {
    const prioridadValor = { alta: 1, media: 2, baja: 3 };

    return [...tareas].sort((a, b) => {
      // Primero, tareas pendientes arriba y completadas abajo
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Segundo, ordenar por prioridad
      return prioridadValor[a.priority] - prioridadValor[b.priority];
    });
  };

  // Aplica filtro de completadas/pendientes y luego ordena
  const TareasFiltradas = ordenarTareas(
    filtrarPorPrioridad.filter((item) => {
      if (filtro === 'completadas') return item.completed;
      if (filtro === 'pendientes') return !item.completed;
      return true; // Todas
    })
  );

  // ======================
  // RENDERIZADO
  // ======================
  return (
    <div>
      {/* Inputs para nueva tarea */}
      <input
        type="text"
        value={item}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Escribe la tarea"
      />
      <textarea
        value={description}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Descripción de la tarea"
      />
      <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
      <button onClick={agregarItem}>Agregar</button>

      {/* Filtros */}
      <div>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="completadas">Completadas</option>
          <option value="pendientes">Pendientes</option>
        </select>

        <select
          value={filtroPrioridad}
          onChange={(e) => setFiltroPrioridad(e.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>

      {/* Lista de tareas */}
      <TaskList
        items={TareasFiltradas}
        onToggle={toggleCompleted}
        onDelete={borrarItem}
        abrirModal={abrirModalItem}
        colorTexto={obtenerColor}
      />

      {/* MODAL SOLO TEXTO */}
      {modalAbierto && (
        <div className="modal">
          <h3>Editar tarea</h3>
          <input
            type="text"
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
          />
          <button onClick={guardarCambios}>Guardar</button>
          <button onClick={() => setModalAbierto(false)}>Cancelar</button>
        </div>
      )}

      {/* MODAL COMPLETO (texto + descripción) */}
      {modalItemAbierto && (
        <div
          className="modal"
          style={{
            border: '2px solid black',
            borderRadius: '20px',
            padding: '10px',
          }}
        >
          <h3>Task</h3>
          <input
            type="text"
            value={nuevoTexto2}
            onChange={(e) => setNuevoTexto2(e.target.value)}
          />
          <textarea
            value={nuevaDesc}
            onChange={(e) => setNuevaDesc(e.target.value)}
          />
          <button onClick={guardarCambios2}>Guardar</button>
          <button onClick={() => setModalItemAbierto(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}

export default App;
