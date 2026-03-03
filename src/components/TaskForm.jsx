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
        setAbrirCrearTarea,
        fechaVencimiento,
        setFechaVencimiento
    } = useTasksContext();

    const {
        listas,
        lista,
        setLista
    } = useListsContext();

    
    
    
    return(
        <div className="fixed z-50 inset-0 bg-black/60 flex justify-center items-center">
            <form className="relative flex flex-col gap-5 bg-[#007011] p-6 rounded-2xl w-[600px] h-[700px]" >
                <h2 className="font-poppins text-white text-[25px] text-center">Tarea</h2>
                <button
                className="absolute top-5 right-6 hover:scale-110 transition-transform cursor-pointer"
                onClick={(e)=>{
                    e.preventDefault();
                    setAbrirCrearTarea(false);
                }}>
                    <img src="/icons/close.png" alt="close" className="w-[35px] h-[35px]" />
                </button>
                <input type="text"
                    className="font-inter text-xl placeholder:text-white placeholder:font-bold text-white rounded p-3 outline-none transition-all duration-600" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="TITULO"
                />

                <textarea className="font-inter text-base placeholder:text-white text-white rounded p-2 outline-none" 
                    value={description}
                    rows="10"
                    onChange={(e) => setDescription(e.target.value)}
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
                    value={lista}
                    onChange={(e) => setLista(e.target.value)}>
                        
                        {listas.map((list) => (
                            <option key={list._id} value={list._id}>{list.nombre}</option>
                        ))}

                    </select>
                </div>

                <button
                    // 1. Aplicamos el borde y padding
                    className={`flex cursor-pointer items-center font-inter w-[150px] bg-white rounded-xl p-1 transition-transform duration-200 hover:scale-105 active:scale-95
                    ${prioridad === true ? 'font-bold' : ''}
                    
                    `}
                    onClick={(e) =>{
                        e.preventDefault();
                        setPrioridad(!prioridad)}}
                >
                    <img src={`${prioridad === true ? '/icons/flag_fill.png' : '/icons/flag_unfill.png'} `} alt="flag" />
                    <span className={`${prioridad === true ? 'text-bold' : ''} text-[#007011] flex-1 font-inter`}>Importante</span>
                </button>
                <div className="w-[150px] p-1 flex bg-white rounded-xl transition-transform duration-200 hover:scale-105 active:scale-95"> 
                    <img src="/icons/calendar_green.png" alt="calendar" className="mr-2" />
                    <input 
                    type="date" 
                    name="fechaVencimiento" 
                    id="fechaVencimiento" 
                    value={fechaVencimiento}
                    onChange={(e)=>setFechaVencimiento(e.target.value)}
                    onClick={(e) => e.target.showPicker()}
                    className="font-inter text-center text-[#007011] cursor-pointer"
                    />
                </div>
                <button
                className="font-inter absolute bottom-10 right-10 text-white border border-white bg-[#7B9F7D] rounded-xl p-2 w-30 hover:scale-110 transition-transform cursor-pointer active:scale-95"
                onClick={(e)=>{
                    e.preventDefault();
                    setAbrirCrearTarea(false);
                    agregarItem();
                }}>Guardar</button>
            </form>
        </div>
    )
}

export default TaskForm;