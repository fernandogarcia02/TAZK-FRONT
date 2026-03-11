import TaskListTerminadas from '../components/TaskListTerminadas.jsx';
import TaskForm from '../components/TaskForm';
import CrearLista from '../components/CrearLista.jsx';
import TaskModal from '../components/TaskModal';
import useTasksContext from '../hooks/useTasksContext';
import useListsContext from '../hooks/useListsContext.js';
import Sidebar from '../components/Sidebar.jsx';



const Terminadas = () =>{

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


      <TaskListTerminadas/>

      {modalCrearLista && (
        <CrearLista/>
      )}

      {modalAbierto && (
      <TaskModal/>
      )}
    </div>
    )
}
export default Terminadas;