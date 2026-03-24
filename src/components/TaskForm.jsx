import useTasksContext from "../hooks/useTasksContext";
import useListsContext from "../hooks/useListsContext";

function TaskForm() {
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
        setFechaVencimiento,
        fechaHoy
    } = useTasksContext();

    const {
        listas,
        lista,
        setLista
    } = useListsContext();

    return (
        /* min-h-[100dvh] para asegurar que el fondo oscuro cubra todo en el Pixel */
        <div className="fixed z-[100] inset-0 bg-black/60 flex justify-center items-center p-4 min-h-[100dvh]">

            {/* Ancho: 95% en móvil, 600px en escritorio 
                Alto: Ajustable en móvil, 700px en escritorio
            */}
            <form className="relative flex flex-col gap-4 md:gap-5 bg-[#007011] p-6 rounded-2xl w-full max-w-[600px] h-auto md:h-[700px] shadow-2xl overflow-y-auto max-h-[90dvh] md:max-h-none" >

                <h2 className="font-poppins text-white text-[22px] md:text-[25px] text-center">Tarea</h2>

                <button
                    className="absolute top-4 right-4 md:top-5 md:right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                        e.preventDefault();
                        setAbrirCrearTarea(false);
                        setFechaVencimiento(fechaHoy());
                    }}>
                    <img src="/icons/close.png" alt="close" className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]" />
                </button>

                <input type="text"
                    className="font-inter text-lg md:text-xl placeholder:text-white/70 placeholder:font-bold text-white rounded p-3 outline-none focus:bg-white/20 transition-all"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="TÍTULO"
                />

                <textarea className="font-inter text-sm md:text-base placeholder:text-white/70 text-white rounded p-3 outline-none resize-none"
                    value={description}
                    rows={window.innerWidth < 768 ? "6" : "8"}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Añade una descripción..."
                />

                {/* Quitamos el md:flex-row para que siempre sea flex-col (uno debajo del otro) */}
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
                            value={lista}
                            onChange={(e) => setLista(e.target.value)}>
                            {listas.map((list) => (
                                <option key={list._id} value={list._id}>{list.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* Botón Importante */}
                    <button
                        type="button"
                        className={`flex cursor-pointer items-center font-inter w-full bg-white rounded-xl p-2 transition-transform hover:scale-105 active:scale-95
                        ${prioridad ? 'font-bold ring-2 ring-yellow-400' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setPrioridad(!prioridad)
                        }}
                    >
                        <img src={prioridad ? '/icons/flag_fill.png' : '/icons/flag_unfill.png'} alt="flag" className="w-5 h-5" />
                        <span className="text-[#007011] flex-1 font-inter text-sm ml-1 text-center">Importante</span>
                    </button>

                    {/* Fecha */}
                    <div className="w-full p-2 flex bg-white rounded-xl transition-transform hover:scale-105 active:scale-95">
                        <img src="/icons/calendar_green.png" alt="calendar" className="mr-2 w-5 h-5 shrink-0" />
                        <input
                            type="date"
                            name="fechaVencimiento"
                            id="fechaVencimiento"
                            value={fechaVencimiento}
                            onChange={(e) => setFechaVencimiento(e.target.value)}
                            onClick={(e) => e.target.showPicker()}
                            className="font-inter text-sm text-[#007011] cursor-pointer bg-transparent outline-none w-full text-center"
                        />
                    </div>
                </div>
                <button
                    className="font-inter mt-6 md:absolute md:bottom-10 md:right-10 text-white border border-white bg-[#7B9F7D] rounded-xl p-3 md:p-2 w-full md:w-30 hover:scale-105 transition-transform cursor-pointer active:scale-95 shadow-md"
                    onClick={(e) => {
                        e.preventDefault();
                        setAbrirCrearTarea(false);
                        agregarItem();
                    }}>Guardar</button>
            </form>
        </div>
    )
}

export default TaskForm;