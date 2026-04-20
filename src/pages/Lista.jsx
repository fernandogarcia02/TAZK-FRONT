import TaskListList from '../components/TaskListList.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskModal from '../components/TaskModal.jsx';
import CrearLista from '../components/CrearLista.jsx';
import Error from '../components/Error.jsx';
import useTasksContext from '../hooks/useTasksContext.js';
import useListsContext from '../hooks/useListsContext.js';
import Sidebar from '../components/Sidebar.jsx';
import Cargando from '../components/Cargando.jsx';
import useUsersContext from '../hooks/useUsersContext.js';
import FotoModal from '../components/FotoModal.jsx';



const Lista = () =>{

    // Hook
  const {
    modalAbierto,
    abrirCrearTarea,
    errorTarea,
    setErrorTarea,
    cargandoTarea
    
  } = useTasksContext();
  const {abrirModalFoto} = useUsersContext();
  const {modalCrearLista, cargandoLista} = useListsContext();
    return (
        <div className='bg-white min-h-screen w-full flex'>

      {abrirCrearTarea && (
        <TaskForm />
      )}
      {abrirModalFoto && <FotoModal/>}
      
      <Sidebar/>


      <TaskListList/>

      {modalCrearLista && (
        <CrearLista/>
      )}

      {modalAbierto && (
      <TaskModal/>
      )}
      {errorTarea && (
        <Error
        mensaje={errorTarea}
        cerrar={()=>setErrorTarea('')}/>
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