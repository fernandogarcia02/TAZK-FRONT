import useTasksContext from "./hooks/useTasksContext";

function TaskForm(){
    const {
        text,
        setText,
        description,
        setDescription,
        prioridad,
        setPrioridad,
        agregarItem
    } = useTasksContext();
    
    
    return(
        <form className="flex flex-col gap-5 bg-gray-300 p-6 max-w-md mx-auto rounded-2xl " >
            <input type="text"
                className="border border-gray-600 rounded p-2 outline-none focus:shadow-md focus:border-blue-600 transition-all duration-600" 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tarea"
            />

            <textarea className="border border-gray-600 rounded p-2 outline-none focus:shadow-md focus:border-blue-600 transition-all duration-600" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción"
            />
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
        </form>
    )
}

export default TaskForm;