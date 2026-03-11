import useTasksContext from "../hooks/useTasksContext";
import useListsContext from "../hooks/useListsContext";
function TaskModal() {
    const {
        taskEditar,
        setTaskEditar,
        editarTexto,
        setEditarTexto,
        editarDescription,
        setEditarDescription,
        editarFechaVencimiento,
        setEditarFechaVencimiento,
        editarPrioridad,
        setEditarPrioridad,
        guardarCambios,
        setModalAbierto,
        borrarItem,

    } = useTasksContext();

    const {
        listas,
        editarLista,
        setEditarLista
    } = useListsContext();



    
    return(
        // 1. Contenedor de "overlay" (fondo oscuro tras el modal)
<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    
   <form className="relative flex flex-col gap-5 bg-[#007011] p-6 rounded-2xl w-[600px] h-[700px]" >
                <h2 className="font-poppins text-white text-[25px] text-center">Tarea</h2>
                <button
                className="absolute top-5 right-6 hover:scale-110 transition-transform cursor-pointer"
                onClick={(e)=>{
                    e.preventDefault();
                    setModalAbierto(false);
                    setTaskEditar(null);
                    setEditarTexto('');
                    setEditarDescription('');
                    setEditarFechaVencimiento(null);
                    setEditarPrioridad(null);
                    setEditarLista(null);
                }}>
                    <img src="/icons/close.png" alt="close" className="w-[35px] h-[35px]" />
                </button>
                <input type="text"
                    className="font-inter text-xl placeholder:text-white placeholder:font-bold text-white rounded p-3 outline-none transition-all duration-600" 
                    value={editarTexto}
                    onChange={(e) => setEditarTexto(e.target.value)}
                    placeholder="TITULO"
                />

                <textarea className="font-inter text-base placeholder:text-white text-white rounded p-2 outline-none" 
                    value={editarDescription}
                    rows="10"
                    onChange={(e) => setEditarDescription(e.target.value)}
                    placeholder="Añade una descripción..."
                />
                
                <div className="w-[150px] p-1 items-center flex bg-white rounded-xl transition-transform duration-200 hover:scale-105 active:scale-95">
                    <label htmlFor="lista_select">
                        <img src="/icons/icono_lista.png" alt="icono lista"/>
                    </label>
                        

                    <select 
                    className="appearance-none font-inter text-center text-[#007011] cursor-pointer focus:outline-none flex-1 "
                    name="lista" 
                    id="lista_select"
                    value={editarLista}
                    onChange={(e) => setEditarLista(e.target.value)}>
                        
                        {listas.map((list) => (
                            <option key={list._id} value={list._id}>{list.nombre}</option>
                        ))}

                    </select>
                </div>

                <button
                    // 1. Aplicamos el borde y padding
                    className={`flex cursor-pointer items-center font-inter w-[150px] bg-white rounded-xl p-1 transition-transform duration-200 hover:scale-105 active:scale-95
                    ${editarPrioridad === true ? 'font-bold' : ''}
                    
                    `}
                    onClick={(e) =>{
                        e.preventDefault();
                        setEditarPrioridad(!editarPrioridad)}}
                >
                    <img src={`${editarPrioridad === true ? '/icons/flag_fill.png' : '/icons/flag_unfill.png'} `} alt="flag" />
                    <span className={`${editarPrioridad === true ? 'text-bold' : ''} text-[#007011] flex-1 font-inter`}>Importante</span>
                </button>
                <div className="w-[150px] p-1 flex bg-white rounded-xl transition-transform duration-200 hover:scale-105 active:scale-95"> 
                    <img src="/icons/calendar_green.png" alt="calendar" className="mr-2" />
                    <input 
                    type="date" 
                    name="fechaVencimiento" 
                    id="fechaVencimiento" 
                    value={editarFechaVencimiento}
                    onChange={(e)=>setEditarFechaVencimiento(e.target.value)}
                    onClick={(e) => e.target.showPicker()}
                    className="font-inter text-center text-[#007011] cursor-pointer"
                    />
                </div>
                <button
                className="font-inter absolute bottom-10 right-10 text-white border border-white bg-red-700 rounded-xl p-2 w-30 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                onClick={(e)=>{
                    e.preventDefault();
                    borrarItem(taskEditar._id);
                }}
                >Eliminar
                </button>
                <button
                className="font-inter absolute bottom-10 right-43 text-white border border-white bg-[#7B9F7D] rounded-xl p-2 w-30 hover:scale-110 transition-transform cursor-pointer active:scale-95"
                onClick={(e)=>{
                    e.preventDefault();
                    guardarCambios();
                }}>Guardar</button>
            </form>
</div>
    )
}

export default TaskModal;