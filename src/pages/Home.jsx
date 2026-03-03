import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskModal from '../components/TaskModal';
import useTasksContext from '../hooks/useTasksContext';
import Sidebar from '../components/Sidebar.jsx';



const Home = () =>{

    // Hook
  const {
    filtro,
    setFiltro,
    filtroPrioridad,
    setFiltroPrioridad,
    modalAbierto,
    abrirCrearTarea
    
  } = useTasksContext();
    return (
        <div className='bg-white min-h-screen w-full flex'>

      {abrirCrearTarea && (
        <TaskForm />
      )}
      
      <Sidebar/>


      {/*}<div className='flex justify-center'>
        <div className='w-[300px] h-[30px] bg-gray-300 my-6 flex justify-center rounded-2xl'>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="completadas">Completadas</option>
          <option value="pendientes">Pendientes</option>
        </select>

        <select
          value={filtroPrioridad}
          onChange={(e) => setFiltroPrioridad(e.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        </div>
      </div>{*/}

      <TaskList/>

      {modalAbierto && (
      <TaskModal/>
      )}
    </div>
    )
}
export default Home;