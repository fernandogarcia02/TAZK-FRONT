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

    return (
        /* Fondo oscuro con altura dinámica */
        <div className="fixed z-[100] inset-0 bg-black/60 flex justify-center items-center p-4 min-h-[100dvh]">

            {/* Estilo de formulario igual a TaskForm */}
            <form className="relative flex flex-col gap-4 md:gap-5 bg-[#007011] p-6 rounded-2xl w-full max-w-[600px] h-auto md:h-[700px] shadow-2xl overflow-y-auto max-h-[90dvh] md:max-h-none" >

                <h2 className="font-poppins text-white text-[22px] md:text-[25px] text-center">Tarea</h2>

                <button
                    className="absolute top-4 right-4 md:top-5 md:right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                        e.preventDefault();
                        setModalAbierto(false);
                        setTaskEditar(null);
                        setEditarTexto('');
                        setEditarDescription('');
                        setEditarFechaVencimiento(null);
                        setEditarPrioridad(null);
                        setEditarLista(null);
                    }}>
                    <img src="/icons/close.png" alt="close" className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]" />
                </button>

                <input type="text"
                    className="font-inter text-lg md:text-xl placeholder:text-white/70 placeholder:font-bold text-white rounded p-3 outline-none focus:bg-white/20 transition-all"
                    value={editarTexto}
                    onChange={(e) => setEditarTexto(e.target.value)}
                    placeholder="TÍTULO"
                />

                <textarea className="font-inter text-sm md:text-base placeholder:text-white/70 text-white rounded p-3 outline-none resize-none"
                    value={editarDescription}
                    rows={window.innerWidth < 768 ? "6" : "8"}
                    onChange={(e) => setEditarDescription(e.target.value)}
                    placeholder="Añade una descripción..."
                />

                {/* Selectores verticales */}
                <div className="flex flex-col gap-4 md:pt-6 w-[150px]">

                    {/* Lista Select */}
                    <div className="w-full p-2 items-center flex bg-white rounded-xl transition-transform hover:scale-105 active:scale-95">
                        <label htmlFor="lista_select" className="shrink-0">
                            <img src="/icons/icono_lista.png" alt="icono lista" className="w-5 h-5" />
                        </label>
                        <select
                            className="appearance-none font-inter text-sm flex-1 text-center text-[#007011] cursor-pointer focus:outline-none bg-transparent"
                            name="lista"
                            id="lista_select"
                            value={editarLista}
                            onChange={(e) => setEditarLista(e.target.value)}>
                            {listas.map((list) => (
                                <option key={list._id} value={list._id}>{list.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* Botón Importante */}
                    <button
                        type="button"
                        className={`flex cursor-pointer items-center font-inter w-full bg-white rounded-xl p-2 transition-transform hover:scale-105 active:scale-95
                        ${editarPrioridad ? 'font-bold ring-2 ring-yellow-400' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setEditarPrioridad(!editarPrioridad)
                        }}
                    >
                        <img src={editarPrioridad ? '/icons/flag_fill.png' : '/icons/flag_unfill.png'} alt="flag" className="w-5 h-5" />
                        <span className="text-[#007011] flex-1 font-inter text-sm ml-1 text-center">Importante</span>
                    </button>

                    {/* Fecha */}
                    <div className="w-full p-2 flex bg-white rounded-xl transition-transform hover:scale-105 active:scale-95">
                        <img src="/icons/calendar_green.png" alt="calendar" className="mr-2 w-5 h-5 shrink-0" />
                        <input
                            type="date"
                            name="fechaVencimiento"
                            id="fechaVencimiento"
                            value={editarFechaVencimiento}
                            onChange={(e) => setEditarFechaVencimiento(e.target.value)}
                            onClick={(e) => e.target.showPicker()}
                            className="font-inter text-sm text-[#007011] cursor-pointer bg-transparent outline-none w-full text-center"
                        />
                    </div>
                </div>

                {/* Botones de acción (Eliminar y Guardar) */}
                <div className="flex flex-col md:block mt-6 md:mt-0">
                    <button
                        className="font-inter md:absolute md:bottom-10 md:right-44 text-white border border-white bg-red-700 rounded-xl p-3 md:p-2 w-full md:w-30 hover:scale-105 transition-transform cursor-pointer active:scale-95 shadow-md mb-3 md:mb-0"
                        onClick={(e) => {
                            e.preventDefault();
                            borrarItem(taskEditar._id);
                        }}
                    >Eliminar
                    </button>
                    
                    <button
                        className="font-inter md:absolute md:bottom-10 md:right-10 text-white border border-white bg-[#7B9F7D] rounded-xl p-3 md:p-2 w-full md:w-30 hover:scale-105 transition-transform cursor-pointer active:scale-95 shadow-md"
                        onClick={(e) => {
                            e.preventDefault();
                            guardarCambios();
                        }}>Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default TaskModal;