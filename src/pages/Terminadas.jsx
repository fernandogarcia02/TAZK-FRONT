import TaskListTerminadas from '../components/TaskListTerminadas.jsx';
import TaskForm from '../components/TaskForm';
import CrearLista from '../components/CrearLista.jsx';
import TaskModal from '../components/TaskModal';
import useTasksContext from '../hooks/useTasksContext';
import useListsContext from '../hooks/useListsContext.js';
import Sidebar from '../components/Sidebar.jsx';
import Error from '../components/Error.jsx';
import { useEffect } from 'react';
import Cargando from '../components/Cargando.jsx';



const Terminadas = () => {

  // Hook
  const {
    modalAbierto,
    abrirCrearTarea,
    error,
    cargandoTarea

  } = useTasksContext();
  const { modalCrearLista, cargandoLista } = useListsContext();
  useEffect(() => {
    document.title = "Terminadas - TAZK";
  }, []);
  return (
    <div className='bg-white min-h-screen w-full flex'>

      {abrirCrearTarea && (
        <TaskForm />
      )}

      <Sidebar />


      <TaskListTerminadas />

      {modalCrearLista && (
        <CrearLista />
      )}

      {modalAbierto && (
        <TaskModal />
      )}
      {error && (
        <Error />
      )}
      {cargandoTarea && (
        <Cargando />
      )}

      {cargandoLista && (
        <Cargando />
      )}
    </div>
  )
}
export default Terminadas;