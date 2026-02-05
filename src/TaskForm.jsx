function TaskForm({text,description,setText,setDescription,prioridad,setPrioridad,agregarItem}){
    return(
        <form >
            <input type="text" 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tarea"
            />

            <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción"
            />
            <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
            </select>
            <button onClick={(e)=>{
                e.preventDefault();
                agregarItem();
            }}>Agregar</button>
        </form>
    )
}

export default TaskForm;