import { useState } from 'react';

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

  // ======================
  // CRUD
  // ======================
  const agregarItem = () => {
    if (text.trim() === '') return;

    const nuevaTarea = {
      id: crypto.randomUUID(),
      text,
      description,
      completed: false,
      priority: prioridad,
    };

    setItems((prev) => [...prev, nuevaTarea]);
    setText('');
    setDescription('');
  };

  const toggleCompleted = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const borrarItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
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
        return 'white';
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
  };
}

export default useTasks;
