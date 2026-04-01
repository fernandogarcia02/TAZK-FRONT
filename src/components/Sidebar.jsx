import { useState } from "react"; // 1. Añadimos useState
import { useNavigate, NavLink } from "react-router-dom";
import useUsersContext from "../hooks/useUsersContext";
import useListsContext from "../hooks/useListsContext";
import useTasksContext from "../hooks/useTasksContext";
import ListList from "./ListLIst";

const Sidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // Estado para el menú móvil

    const { listas, setModalCrearLista, modalCrearLista,comprobarListas } = useListsContext();
    const { cerrarSesion, perfil } = useUsersContext();
    const { modalCrearTarea,error,setError } = useTasksContext();

    const fotoPerfil = perfil?.fotoPerfil;
    const urlFoto = fotoPerfil 
        ? (fotoPerfil.startsWith('http') 
            ? fotoPerfil 
            : `http://localhost:3000${fotoPerfil}`) 
        : '/icons/account.png';

    const linkStyle = ({ isActive }) => {
        const estiloResaltado = "bg-[#D9D9D9]/50 rounded-xl";
        const estiloNormal = "hover:bg-[#D9D9D9]/50 rounded-xl";
        return `flex items-center pl-5 pt-2 pb-2 transition-all duration-300 mx-3 my-1 ${isActive ? estiloResaltado : estiloNormal}`;
    }

    return (
        <>
            {/* 2. BOTÓN HAMBURGUESA (Solo visible en móvil) */}
            <button 
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-6 left-6 z-40 p-2"
            >
                <img src="/icons/menu.png" alt="menu" className="w-6 h-6" />
            </button>

            {/* 3. OVERLAY (Fondo oscuro al abrir en móvil) */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-[60] md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 4. EL SIDEBAR ADAPTADO */}
            <div id="sidebar"
                className={`
                    fixed md:static inset-y-0 left-0 z-[70]
                    w-[280px] md:w-1/5 bg-white md:bg-transparent
                    flex flex-col transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                {/* Cabecera Perfil */}
                <div className="flex items-center h-20 md:h-1/10 pl-5">
                    <div id="foto-perfil" className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-[#007011]">
                        <img src={urlFoto} alt="foto de perfil" className="h-full w-full object-cover" />
                    </div>
                    <div id="nombre-perfil" className="pl-2">
                        <p className="font-poppins font-bold text-[#007011] truncate max-w-[150px]">
                            {perfil?.nombre || localStorage.getItem('nombre_usuario')}
                        </p>
                    </div>
                    {/* Botón cerrar sidebar (Solo móvil) */}
                    <button onClick={() => setIsOpen(false)} className="md:hidden ml-auto mr-5">
                        <img src="/icons/close.png" alt="cerrar" className="w-6 h-6 opacity-50" />
                    </button>
                </div>

                {/* Contenedor Verde */}
                <div id="tareas"
                    className="relative rounded-t-[25px] md:rounded-r-[25px] font-inter bg-[#007011] h-full flex-1 overflow-y-auto pb-20"
                >
                    <button onClick={() => { 
                        
                        if (listas.length === 0){
                            setError("Deben haber listas para crear una tarea");
                            return;
                        }
                        modalCrearTarea(); setIsOpen(false); }}
                        className="flex items-center pt-8 md:pt-10 pl-5 cursor-pointer transition-all hover:scale-105"
                    >
                        <img src="/icons/add.png" alt="add task" className="" />
                        <span className="p-2 font-bold text-[18px] md:text-[20px] text-white">Añadir Tarea</span>
                    </button>

                    <h2 className="text-white font-bold text-[22px] md:text-[25px] pl-5 pt-4">Tareas</h2>
                    
                    <div className="mt-2">
                        {[
                            { to: "/proximas", icon: "/icons/proximas_tareas.png", label: "Próximas" },
                            { to: "/home", icon: "/icons/hoy.png", label: "Hoy" },
                            { to: "/calendario", icon: "/icons/calendario.png", label: "Calendario" },
                            { to: "/terminadas", icon: "/icons/terminadas.png", label: "Terminadas" },
                            { to: "/importantes", icon: "/icons/importantes.png", label: "Importantes" },
                        ].map((item) => (
                            <NavLink key={item.to} className={linkStyle} to={item.to} onClick={() => setIsOpen(false)}>
                                <img src={item.icon} alt={item.label} className="h-[35px] w-[35px] md:h-[45px] md:w-[45px]" />
                                <span className="text-white pl-2 text-sm md:text-base">{item.label}</span>
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex justify-between items-center py-3 px-5 mt-4">
                        <h2 className="text-white font-bold text-[22px] md:text-[25px]">Listas</h2>
                        <NavLink to="/listas" onClick={() => setIsOpen(false)}>
                            <img className='h-[20px] w-[20px] hover:translate-x-1 transition-transform' src="/icons/forward_white.png" alt="ir" />
                        </NavLink>
                    </div>

                    <div className="max-h-[140px] overflow-y-auto custom-scrollbar">
                        <ListList />
                    </div>

                    <button className="flex items-center pl-4 pt-4 opacity-80 hover:opacity-100 cursor-pointer"
                        onClick={() => setModalCrearLista(!modalCrearLista)}
                    >
                        <img src="/icons/add_list.png" alt="add list" className="h-[25px] w-[25px]" />
                        <span className="text-[#A7A7A7] pl-2 text-sm">Añadir Lista</span>
                    </button>

                    <button
                        className="absolute flex left-6 bottom-5 items-center hover:scale-105 transition-all text-white cursor-pointer"
                        onClick={cerrarSesion}>
                        <img src="/icons/logout.png" alt="logout" className="" />
                        <span className="font-bold pl-2">Cerrar sesión</span>
                    </button>
                </div>
            </div>
        </>
    )
}
export default Sidebar;