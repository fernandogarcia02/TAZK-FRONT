import useListsContext from "../hooks/useListsContext";
import useTasksContext from "../hooks/useTasksContext";
import TaskForm from "../components/TaskForm";
import TaskModal from "../components/TaskModal";
import CrearLista from "../components/CrearLista";
import DeleteModal from "../components/DeleteModal";
import ListModal from "../components/ListModal";
import Error from "../components/Error";
import Sidebar from "../components/Sidebar";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Cargando from "../components/Cargando";
import useUsersContext from "../hooks/useUsersContext";
import FotoModal from "../components/FotoModal";

//en esta página mostramos todas las listas que ha creado el usuario
function Listas() {
    const {
        listas,
        setModalEliminarLista,
        modalEliminarLista,
        modalCrearLista,
        setListaAEliminar,
        abrirModal,
        modalEditarLista,
        cargandoLista
    } = useListsContext();
    const {abrirModalFoto} = useUsersContext();

    const { modalAbierto, abrirCrearTarea, errorTarea,setErrorTarea,cargandoTarea } = useTasksContext();
    useEffect(() => {
        document.title = "Listas - TAZK";
    }, []);

    return (
        
        <div className='bg-white min-h-[100dvh] w-full flex flex-col md:flex-row'>

            {abrirCrearTarea && <TaskForm />}
            {abrirModalFoto && <FotoModal/>}
            {modalCrearLista && <CrearLista />}
            {modalEditarLista && <ListModal />}
            {modalAbierto && <TaskModal />}
            {errorTarea && <Error
            mensaje={errorTarea}
            cerrar={()=>setErrorTarea('')} />}
            {modalEliminarLista && <DeleteModal />}
            {cargandoTarea && (
                <Cargando />
            )}

            {cargandoLista && (
                <Cargando />
            )}

            <Sidebar />

            <div className="min-h-screen w-full md:w-4/5 flex flex-col">

                <div className="h-20 md:h-1/10 shrink-0"></div>

                <div className="flex-1 px-6 md:pl-20 md:pr-10">
                    <h2 className="font-bold font-poppins text-center md:text-left text-3xl md:text-[50px] leading-none text-[#007011]">
                        LISTAS
                    </h2>

                    <ul className="mt-6 pb-10">
                        {/*imprimimos todas las listas*/}
                        {listas.map((lista) => (
                            <li
                                className="flex items-center justify-between py-5 md:py-6 border-b border-gray-400 mr-0 md:mr-20"
                                key={lista._id}
                            >
                                <NavLink
                                    to={`/lista/${lista._id}`}
                                    className="text-lg md:text-[20px] cursor-pointer hover:text-[#007011] transition-all font-inter truncate pr-4"
                                >
                                    {lista.nombre}
                                </NavLink>

                                <div className="flex items-center shrink-0">
                                    {/*botones para eliminar o editar el nombre de la lista*/}
                                    <button
                                        onClick={() => abrirModal(lista)}
                                        className="p-2 cursor-pointer hover:scale-110 transition-all active:scale-90"
                                    >
                                        <img src="/icons/edit.png" alt="Editar" className="w-5 h-5 md:w-auto" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setListaAEliminar(lista._id);
                                            setModalEliminarLista(true);
                                        }}
                                        className="p-2 cursor-pointer hover:scale-110 active:scale-90 transition-all"
                                    >
                                        <img src="/icons/delete.png" alt="Eliminar" className="w-5 h-5 md:w-auto" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Listas;