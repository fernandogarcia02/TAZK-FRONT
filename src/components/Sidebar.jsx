import { useNavigate, NavLink } from "react-router-dom";
import useUsersContext from "../hooks/useUsersContext";
import useListsContext from "../hooks/useListsContext";
import useTasksContext from "../hooks/useTasksContext";
import ListList from "./ListLIst";


const Sidebar = () =>{
    const navigate = useNavigate();
    
    //listsContext
    const{
        listas,
        imprimirListas,
        setModalCrearLista,
        modalCrearLista
    } = useListsContext();

    //usersContext
    const {
        cerrarSesion,
        perfil
    } = useUsersContext();

    //taskscontext
    const {
        modalCrearTarea
    } = useTasksContext();

    const urlFoto = perfil?.fotoPerfil ? `http://localhost:3000${perfil.fotoPerfil}` : '/icons/account.png';

    const linkStyle = ({isActive}) =>{
        const estiloResaltado = "bg-[#D9D9D9]/50 rounded-xl";
        const estiloNormal = "hover:bg-[#D9D9D9]/50 rounded-xl";

        return `flex items-center pl-5 pt-2 pb-2 transition-all duration-300 mx-3 my-1 ${isActive ? estiloResaltado : estiloNormal}`;
    }


    return (
        <div id="sidebar"
        className="w-1/5 h-screen flex flex-col"
        >
            <div className="flex items-center h-1/10 pl-5">
                <div id="foto-perfil" className=" w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img src={urlFoto} alt="foto de perfil" className="h-full w-full object-cover" />
                </div>
                <div id="nombre-perfil" className="pl-2">
                    <p className="font-poppins font-bold text-[#007011]">{perfil?.nombre || localStorage.getItem('nombre_usuario')}</p>
                </div>
            </div>

            <div id="tareas"
            className="relative rounded-r-[25px] font-inter bg-[#007011] h-9/10 flex-1"
            >
                <button onClick={modalCrearTarea}
                className="flex items-center pt-10 pl-5 cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-125 active:scale-95"
                >
                    <img src="/icons/add.png" alt="add task" />
                    <span className="p-2 font-bold text-[20px]">Añadir Tarea</span>
                </button>
                <h2 className="text-white font-bold text-[25px] pl-5 pt-4">Tareas</h2>
                <div>
                    <NavLink className={linkStyle} to="/proximas">
                        <img src="/icons/proximas_tareas.png" alt="proximas tareas" className="h-[45px] w-[45px]" />
                        <span className="text-white pl-2">Próximas tareas</span>
                    </NavLink>
                    <NavLink className={linkStyle} to="/home">
                        <img src="/icons/hoy.png" alt="hoy" className="h-[45px] w-[45px]"/>
                        <span className="text-white pl-2">Hoy</span>
                    </NavLink>
                    <NavLink className={linkStyle} to="/calendario">
                        <img src="/icons/calendario.png" alt="calendario" className="h-[45px] w-[45px]"/>
                        <span className="text-white pl-2">Calendario</span>
                    </NavLink>
                    <NavLink className={linkStyle} to="/terminadas">
                        <img src="/icons/terminadas.png" alt="terminadas" className="h-[45px] w-[45px]"/>
                        <span className="text-white pl-2">Terminadas</span>
                    </NavLink>
                    <NavLink className={linkStyle} to="/importantes">
                        <img src="/icons/importantes.png" alt="importantes" className="h-[45px] w-[45px]"/>
                        <span className="text-white pl-2">Importantes</span>
                    </NavLink>
                </div>
                <h2 className="text-white font-bold text-[25px] pl-5 pt-4">Listas</h2>
                <div>
                     <ListList/>
                </div>
                <button className="flex items-center pl-3 pt-4 opacity-80 hover:scale-110 cursor-pointer transition-all"
                onClick={()=>{
                    setModalCrearLista(!modalCrearLista);
                }}
                >
                    <img src="/icons/add_list.png" alt="add list" className="h-[30px] w-[30px]" />
                    <span className="text-[#A7A7A7]">Añadir Lista</span>
                </button>
                <button
                className="absolute flex left-6 bottom-10 items-center hover:scale-110 active:scale-95 transition-all cursor-pointer" 
                 onClick={cerrarSesion}>
                    <img src="/icons/logout.png" alt="logout" />
                    <span className="font-bold">Cerrar sesion</span>
                </button>
            </div>
        </div>
    )
}
export default Sidebar;