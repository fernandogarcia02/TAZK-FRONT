import useTasksContext from "./hooks/useTasksContext";
function TaskModal() {
    const {
        nuevoTexto,
        setNuevoTexto,
        nuevaDesc,
        setNuevaDesc,
        guardarCambios,
        setModalAbierto
    } = useTasksContext();
    
    return(
        // 1. Contenedor de "overlay" (fondo oscuro tras el modal)
<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    
    {/* 2. Caja del Modal (Estilo)*/}
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md flex flex-col gap-4">
        
        <h2 className="text-xl font-bold">Editar Tarea</h2>

        <input
            className="border border-gray-300 rounded p-2"
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
            placeholder="Título"
        />
        <textarea
            className="border border-gray-300 rounded p-2"
            value={nuevaDesc}
            onChange={(e) => setNuevaDesc(e.target.value)}
            placeholder="Descripción"
        />
        
        {/* 3. Contenedor de botones*/}
        <div className="flex justify-end gap-2 mt-2">
            <button 
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                onClick={() => setModalAbierto(false)}>
                Cerrar
            </button>
            <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={guardarCambios}>
                Guardar
            </button>
        </div>
    </div>
</div>
    )
}

export default TaskModal;