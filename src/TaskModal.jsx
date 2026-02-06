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
         <div className="modal">
            <input
                value={nuevoTexto}
                onChange={(e) => setNuevoTexto(e.target.value)}
            />
            <textarea
                value={nuevaDesc}
                onChange={(e) => setNuevaDesc(e.target.value)}
            />
            <button onClick={guardarCambios}>Guardar</button>
            <button onClick={() => setModalAbierto(false)}>Cerrar</button>
        </div>
    )
}

export default TaskModal;