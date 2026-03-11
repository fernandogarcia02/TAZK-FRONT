import TaskListList from '../components/TaskListList.jsx';
import TaskForm from '../components/TaskForm';
import TaskModal from '../components/TaskModal';
import CrearLista from '../components/CrearLista.jsx';
import useTasksContext from '../hooks/useTasksContext';
import useListsContext from '../hooks/useListsContext.js';
import Sidebar from '../components/Sidebar.jsx';



const Listas = () =>{

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


      <TaskListList/>

      {modalCrearLista && (
        <CrearLista/>
      )}

      {modalAbierto && (
      <TaskModal/>
      )}
    </div>
    )
}
export default Listas;