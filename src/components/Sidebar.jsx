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
        <div id="sidebar">
            <div id="foto-perfil">
                <img src="" alt="" />
            </div>
            <div id="nombre-perfil">
                <p>{localStorage.getItem('nombre_usuario')}</p>
            </div>

            <div id="tareas">
                <button onClick={modalCrearTarea}>
                    <img src="" alt="" />
                    <span>Añadir Tarea</span>
                </button>
                <h2>Tareas</h2>
                <div>
                    <button>
                        <img src="" alt="" />
                        <span>Próximas tareas</span>
                    </button>
                    <button>
                        <img src="" alt="" />
                        <span>Hoy</span>
                    </button>
                    <button>
                        <img src="" alt="" />
                        <span>Calendario</span>
                    </button>
                    <button>
                        <img src="" alt="" />
                        <span>Terminadas</span>
                    </button>
                    <button>
                        <img src="" alt="" />
                        <span>Importantes</span>
                    </button>
                </div>
                <h2>Listas</h2>
                <div>
                     <ListList/>
                </div>
                <button>
                    <img src="" alt="" />
                    <span>Añadir Lista</span>
                </button>
                <button onClick={cerrarSesion}>
                    <img src="" alt="" />
                    <span>Cerrar sesion</span>
                </button>
            </div>
        </div>
    )
}
export default Sidebar;