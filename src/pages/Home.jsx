import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskModal from '../components/TaskModal';
import CrearLista from '../components/CrearLista.jsx';
import useTasksContext from '../hooks/useTasksContext';
import Error from '../components/Error.jsx';
import Sidebar from '../components/Sidebar.jsx';
import useListsContext from '../hooks/useListsContext.js';



const Home = () =>{

    // Hook
  const {
    modalAbierto,
    abrirCrearTarea,
    error,
    setError
  } = useTasksContext();

  const {modalCrearLista} = useListsContext();
    return (
        <div className='bg-white h-[100vh] w-full flex'>

      {abrirCrearTarea && (
        <TaskForm />
      )}

      {error && (
        <Error/>
      )}
      
      <Sidebar/>


      <TaskList/>

      {modalCrearLista && (
        <CrearLista/>
      )}

      {modalAbierto && (
      <TaskModal/>
      )}
    </div>
    )
}
export default Home;