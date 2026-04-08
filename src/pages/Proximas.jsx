import TaskListProximas from '../components/TaskListProximas.jsx';
import TaskForm from '../components/TaskForm';
import CrearLista from '../components/CrearLista.jsx';
import TaskModal from '../components/TaskModal';
import useTasksContext from '../hooks/useTasksContext';
import useListsContext from '../hooks/useListsContext.js';
import Error from '../components/Error.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { useEffect } from 'react';



const Proximas = () =>{

    // Hook
  const {
    modalAbierto,
    abrirCrearTarea,
    error
    
  } = useTasksContext();
  const {modalCrearLista} = useListsContext();
   useEffect(() => {
            document.title = "Proximas Tareas - TAZK";
        }, []);
    return (
        <div className='bg-white min-h-screen w-full flex'>

      {abrirCrearTarea && (
        <TaskForm />
      )}
      
      <Sidebar/>


      <TaskListProximas/>

      {modalCrearLista && (
        <CrearLista/>
      )}

      {modalAbierto && (
      <TaskModal/>
      )}
      {error && (
        <Error/>
      )}
    </div>
    )
}
export default Proximas;