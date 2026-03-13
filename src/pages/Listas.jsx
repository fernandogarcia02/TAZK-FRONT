import useListsContext from "../hooks/useListsContext";
import useTasksContext from "../hooks/useTasksContext";
import TaskForm from "../components/TaskForm";
import TaskModal from "../components/TaskModal";
import CrearLista from "../components/CrearLista";
import DeleteModal from "../components/DeleteModal";
import ListModal from "../components/ListModal";
import Sidebar from "../components/Sidebar";
import { NavLink } from "react-router-dom";


function Listas() {

    const { listas,setModalEliminarLista,modalEliminarLista, modalCrearLista,setListaAEliminar,abrirModal,modalEditarLista } = useListsContext();
    const {modalAbierto, abrirCrearTarea} = useTasksContext();
    return (
        <div className='bg-white min-h-screen w-full flex'>

            {abrirCrearTarea && (
                <TaskForm/>
            )}

            {modalCrearLista && (
                <CrearLista/>
            )}
            {modalEditarLista && (
                <ListModal/>
            )}

            {modalAbierto && (
                <TaskModal/>
            )}
            {modalEliminarLista && (
                <DeleteModal/>
            )}

            <Sidebar />
            <div className="h-[100vh] w-4/5">
            <div className="h-1/10"></div>
                <div className="h-9/10 pl-20">
                <h2 className="font-bold font-poppins text-[50px] leading-none">LISTAS</h2>
                
                    <ul>
                        {listas.map((lista) => (
                            <li 
                            className="flex items-center justify-between py-6 border-b mr-20"
                            key={lista._id}>
                                <NavLink to={`/lista/${lista._id}`} className="text-[20px] cursor-pointer hover:scale-105 active:scale-95 transition-all font-inter">{lista.nombre}</NavLink>
                                <div className="">
                                    <button 
                                    onClick={ () =>{
                                        abrirModal(lista);}}
                                    className="px-3 cursor-pointer hover:scale-105 transition-all active:scale-95"><img src="/icons/edit.png" alt="Editar" /></button>
                                    <button 
                                    onClick={()=>{
                                        setListaAEliminar(lista._id);
                                        setModalEliminarLista(true)}}
                                    className="cursor-pointer hover:scale-105 active:scale-95 transition-all"><img src="/icons/delete.png" alt="Eliminar" /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )

}

export default Listas