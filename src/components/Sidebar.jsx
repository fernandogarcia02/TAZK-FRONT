import { useNavigate } from "react-router-dom";
import useUsersContext from "../hooks/useUsersContext";
import useListsContext from "../hooks/useListsContext";
import useTasksContext from "../hooks/useTasksContext";
import ListList from "./ListLIst";


const Sidebar = () =>{
    const navigate = useNavigate();
    
    //listsContext
    const{
        listas,
        imprimirListas
    } = useListsContext();

    //usersContext
    const {
        cerrarSesion
    } = useUsersContext();

    //taskscontext
    const {
        modalCrearTarea
    } = useTasksContext();


    return (
        <div id="sidebar"
        className="w-1/5 h-screen flex flex-col"
        >
            <div className="flex items-center h-1/10 pl-5">
                <div id="foto-perfil">
                    <img src="/icons/account.png" alt="foto de perfil" className="h-[50px] w-[50px]" />
                </div>
                <div id="nombre-perfil" className="pl-2">
                    <p className="font-poppins font-bold text-[#007011]">{localStorage.getItem('nombre_usuario')}</p>
                </div>
            </div>

            <div id="tareas"
            className="relative rounded-r-[25px] font-inter bg-[#007011] h-9/10 flex-1"
            >
                <button onClick={modalCrearTarea}
                className="flex items-center pt-10 pl-5"
                >
                    <img src="/icons/add.png" alt="add task" />
                    <span className="p-2 font-bold text-[20px]">Añadir Tarea</span>
                </button>
                <h2 className="text-white font-bold text-[25px] pl-5 pt-4">Tareas</h2>
                <div>
                    <button className="flex items-center pl-10 pt-2">
                        <img src="/icons/proximas_tareas.png" alt="proximas tareas" className="h-[45px] w-[45px]" />
                        <span className="text-white">Próximas tareas</span>
                    </button>
                    <button className="flex items-center pl-10 pt-2">
                        <img src="/icons/hoy.png" alt="hoy" className="h-[45px] w-[45px]"/>
                        <span className="text-white pl-2">Hoy</span>
                    </button>
                    <button className="flex items-center pl-10 pt-2">
                        <img src="/icons/calendario.png" alt="calendario" className="h-[45px] w-[45px]"/>
                        <span className="text-white pl-2">Calendario</span>
                    </button>
                    <button className="flex items-center pl-10 pt-2">
                        <img src="/icons/terminadas.png" alt="terminadas" className="h-[45px] w-[45px]"/>
                        <span className="text-white pl-2">Terminadas</span>
                    </button>
                    <button className="flex items-center pl-10 pt-2">
                        <img src="/icons/importantes.png" alt="importantes" className="h-[45px] w-[45px]"/>
                        <span className="text-white pl-2">Importantes</span>
                    </button>
                </div>
                <h2 className="text-white font-bold text-[25px] pl-5 pt-4">Listas</h2>
                <div>
                     <ListList/>
                </div>
                <button className="flex items-center pl-3 pt-4 opacity-80">
                    <img src="/icons/add_list.png" alt="add list" className="h-[30px] w-[30px]" />
                    <span className="text-[#A7A7A7]">Añadir Lista</span>
                </button>
                <button
                className="absolute flex left-6 bottom-10 items-center" 
                 onClick={cerrarSesion}>
                    <img src="/icons/logout.png" alt="logout" />
                    <span className="font-bold">Cerrar sesion</span>
                </button>
            </div>
        </div>
    )
}
export default Sidebar;