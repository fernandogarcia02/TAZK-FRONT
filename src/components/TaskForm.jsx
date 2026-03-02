import useTasksContext from "../hooks/useTasksContext";
import useListsContext from "../hooks/useListsContext";

function TaskForm(){
    const {
        text,
        setText,
        description,
        setDescription,
        prioridad,
        setPrioridad,
        agregarItem,
        setAbrirCrearTarea
    } = useTasksContext();

    const {
        listas,
        lista,
        setLista
    } = useListsContext();
    
    
    return(
        <div className="fixed z-50 inset-0 bg-black/60 flex justify-center items-center">
            <form className="flex flex-col gap-5 bg-[#007011] p-6 rounded-2xl w-[600px] h-[700px]" >
                <h2 className="font-inter text-white">Tarea</h2>
                <input type="text"
                    className="text-xl placeholder:text-white placeholder:font-bold text-white rounded p-3 outline-none transition-all duration-600" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="TITULO"
                />

                <textarea className="text-base placeholder:text-white text-white rounded p-2 outline-none transition-all duration-600 h-[200px]" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Añade una descripción..."
                />
                
                <div className="w-[150px] p-1 items-center flex bg-white rounded-xl">
                    <label htmlFor="lista_select">
                        <img src="/icons/icono_lista.png" alt="icono lista"/>
                    </label>
                        

                    <select 
                    className="appearance-none text-center text-[#007011] cursor-pointer focus:outline-none flex-1"
                    name="lista" 
                    id="lista_select"
                    value={lista}
                    onChange={(e) => setLista(e.target.value)}>
                        
                        {listas.map((list) => (
                            <option value={list._id}>{list.nombre}</option>
                        ))}

                    </select>
                </div>

                <select
                    // 1. Aplicamos el borde y padding
                    className={`border border-gray-600 rounded p-2 font-bold focus:shadow-md focus:border-blue-600 transition-all duration-600
                    ${prioridad === 'alta' ? 'text-red-600' : ''}
                    ${prioridad === 'media' ? 'text-orange-500' : ''}
                    ${prioridad === 'baja' ? 'text-green-600' : ''}
                    `}
                    value={prioridad}
                    onChange={(e) => setPrioridad(e.target.value)}
                >
                    {/* 2. Quitamos las clases de color de las opciones */}
                    <option className="text-red-600 font-bold" value="alta">Alta</option>
                    <option className="text-orange-500 font-bold" value="media">Media</option>
                    <option className="text-green-600 font-bold" value="baja">Baja</option>
                </select>
                <button
                className=" border border-blue-600 bg-blue-600 text-white font-bold uppercase cursor-pointer rounded-xl active:scale-95 hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600 transition-all duration-600  "
                onClick={(e)=>{
                    e.preventDefault();
                    agregarItem();
                }}>Agregar</button>
                <button
                className=" border border-blue-600 bg-blue-600 text-white font-bold uppercase cursor-pointer rounded-xl active:scale-95 hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600 transition-all duration-600  "
                onClick={(e)=>{
                    e.preventDefault();
                    setAbrirCrearTarea(false);
                }}>Cerrar</button>
            </form>
        </div>
    )
}

export default TaskForm;