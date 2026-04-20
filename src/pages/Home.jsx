import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskModal from '../components/TaskModal';
import CrearLista from '../components/CrearLista.jsx';
import useTasksContext from '../hooks/useTasksContext';
import Error from '../components/Error.jsx';
import Sidebar from '../components/Sidebar.jsx';
import useListsContext from '../hooks/useListsContext.js';
import React, { useEffect } from 'react';
import Cargando from '../components/Cargando.jsx';
import useUsersContext from '../hooks/useUsersContext.js';
import FotoModal from '../components/FotoModal.jsx';



const Home = () =>{

    // Hook
  const {
    modalAbierto,
    abrirCrearTarea,
    errorTarea,
    setErrorTarea,
    cargandoTarea
  } = useTasksContext();
  const {
    cargandoLista
  } = useListsContext();
  const {
    abrirModalFoto
  } = useUsersContext();
  useEffect(() => {
        document.title = "Home - TAZK";
    }, []);

  const {modalCrearLista} = useListsContext();
    return (
        <div className='bg-white h-[100vh] w-full flex'>

      {abrirCrearTarea && (
        <TaskForm />
      )}
      {abrirModalFoto && (
        <FotoModal/>
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