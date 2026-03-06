import TaskListProximas from '../components/TaskListProximas.jsx';
import TaskForm from '../components/TaskForm';
import TaskModal from '../components/TaskModal';
import useTasksContext from '../hooks/useTasksContext';
import Sidebar from '../components/Sidebar.jsx';



const Proximas = () =>{

    // Hook
  const {
    modalAbierto,
    abrirCrearTarea
    
  } = useTasksContext();
    return (
        <div className='bg-white min-h-screen w-full flex'>

      {abrirCrearTarea && (
        <TaskForm />
      )}
      
      <Sidebar/>


      <TaskListProximas/>

      {modalAbierto && (
      <TaskModal/>
      )}
    </div>
    )
}
export default Proximas;