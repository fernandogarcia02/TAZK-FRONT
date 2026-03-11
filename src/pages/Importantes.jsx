import TaskListImportantes from '../components/TaskListImportantes.jsx';
import TaskForm from '../components/TaskForm';
import TaskModal from '../components/TaskModal';
import CrearLista from '../components/CrearLista.jsx';
import useTasksContext from '../hooks/useTasksContext';
import useListsContext from '../hooks/useListsContext.js';
import Sidebar from '../components/Sidebar.jsx';



const Importantes = () =>{

    // Hook
  const {
    modalAbierto,
    abrirCrearTarea
    
  } = useTasksContext();
  const {modalCrearLista} = useListsContext();
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
    </div>
    )
}
export default Importantes;