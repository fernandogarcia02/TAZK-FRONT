import TaskListList from '../components/TaskListList.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskModal from '../components/TaskModal.jsx';
import CrearLista from '../components/CrearLista.jsx';
import Error from '../components/Error.jsx';
import useTasksContext from '../hooks/useTasksContext.js';
import useListsContext from '../hooks/useListsContext.js';
import Sidebar from '../components/Sidebar.jsx';
import Cargando from '../components/Cargando.jsx';



const Lista = () =>{

    // Hook
  const {
    modalAbierto,
    abrirCrearTarea,
    error,
    cargandoTarea
    
  } = useTasksContext();
  const {modalCrearLista, cargandoLista} = useListsContext();
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
export default Lista;