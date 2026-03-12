import TaskListList from '../components/TaskListList.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskModal from '../components/TaskModal.jsx';
import CrearLista from '../components/CrearLista.jsx';
import useTasksContext from '../hooks/useTasksContext.js';
import useListsContext from '../hooks/useListsContext.js';
import Sidebar from '../components/Sidebar.jsx';



const Lista = () =>{

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
export default Lista;