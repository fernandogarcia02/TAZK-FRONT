import { useState } from 'react';
import './App.css';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import useTasks from './hooks/useTasks';

function App() {
  // Estado solo de inputs y modales

  const [modalAbierto, setModalAbierto] = useState(false);
  const [taskActual, setTaskActual] = useState(null);
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');

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
  } = useTasks();

  const abrirModal = (task) => {
    setTaskActual(task);
    setNuevoTexto(task.text);
    setNuevaDesc(task.description);
    setModalAbierto(true);
  };

  const guardarCambios = () => {
    editarItem(taskActual.id, nuevoTexto, nuevaDesc);
    setModalAbierto(false);
  };

  return (
    <div>
      <TaskForm 
        text={text}
        description={description}
        setText={setText}
        setDescription={setDescription}
        prioridad={prioridad}
        setPrioridad={setPrioridad}
        agregarItem={agregarItem}
      />

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

      <TaskList
        items={items}
        onToggle={toggleCompleted}
        onDelete={borrarItem}
        abrirModal={abrirModal}
        colorTexto={obtenerColor}
      />

      {modalAbierto && (
        <div className="modal">
          <input
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
          />
          <textarea
            value={nuevaDesc}
            onChange={(e) => setNuevaDesc(e.target.value)}
          />
          <button onClick={guardarCambios}>Guardar</button>
          <button onClick={() => setModalAbierto(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}

export default App;
