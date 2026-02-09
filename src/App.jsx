import { useState } from 'react';
import './App.css';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskModal from './TaskModal';
import useTasksContext from './hooks/useTasksContext';


function App() {

  // Hook
  const {
    items,
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
  } = useTasksContext();

 


  return (
    <div className='bg-blue-900 min-h-screen w-full pt-10 '>

      <TaskForm />

      <div className='flex justify-center'>
        <div className='w-[300px] h-[30px] bg-gray-300 my-6 flex justify-center rounded-2xl'>
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
      </div>

      <TaskList/>

      {modalAbierto && (
      <TaskModal/>
      )}
    </div>
  );
}

export default App;
