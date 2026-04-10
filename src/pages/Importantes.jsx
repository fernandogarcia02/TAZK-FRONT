import TaskListImportantes from '../components/TaskListImportantes.jsx';
import TaskForm from '../components/TaskForm';
import TaskModal from '../components/TaskModal';
import CrearLista from '../components/CrearLista.jsx';
import useTasksContext from '../hooks/useTasksContext';
import useListsContext from '../hooks/useListsContext.js';
import Error from '../components/Error.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Cargando from '../components/Cargando.jsx';
import { useEffect } from 'react';



const Importantes = () =>{

    // Hook
  const {
    modalAbierto,
    abrirCrearTarea,
    error,
    cargandoTarea
    
  } = useTasksContext();
  const {modalCrearLista, cargandoLista} = useListsContext();
  useEffect(() => {
          document.title = "Importantes - TAZK";
      }, []);
      

    return (
        <div className='bg-white min-h-screen w-full flex'>

      {abrirCrearTarea && (
        <TaskForm />
      )}
      
      <Sidebar/>


      <TaskListImportantes/>

      {modalCrearLista && (
        <CrearLista/>
      )}

      {modalAbierto && (
      <TaskModal/>
      )}
      {error && (
        <Error/>
      )}
        {cargandoTarea && (
        <Cargando/>
      )}

      {cargandoLista && (
        <Cargando/>
      )}
    </div>
    )
}
export default Importantes;