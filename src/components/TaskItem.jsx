import useTasksContext from '../hooks/useTasksContext';

//Componente Tarea para taskList
function TaskItem({ task }) {
  //importamos los estados y funcionaes necesarias
  const { toggleCompleted, abrirModal } = useTasksContext();

  //función que devuelve true or false en función de si ha pasado la fecha de vencimiento de la tarea o no.
  const vencida = () => {
    const hoy = new Date();
    const fechaTarea = new Date(task.fechaVencimiento);
    const hoySoloFecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const tareaSoloFecha = new Date(fechaTarea.getFullYear(), fechaTarea.getMonth(), fechaTarea.getDate());
    return tareaSoloFecha < hoySoloFecha && !task.completed;
  }
  const estaVencida = vencida();

  //formateamos la fecha para que se vea como queramos Ej: 28 abr
  const formatearFecha = (fechaRaw) => {
    if(!fechaRaw) return "";
    const fecha = new Date(fechaRaw);
    return fecha.toLocaleDateString('es-ES',{
      day: 'numeric',
      month: 'short'
    }).replace('.','');
  }
  const fechaFormateada = formatearFecha(task.fechaVencimiento);

  //devolvemos un li para el ul de tasklist
  return (
    <li className='flex items-center justify-between py-4 md:py-6 border-b border-gray-400 mr-0 md:mr-20 group'> 
      
      {/* Lado izquierdo: Checkbox + Texto */}
      <div className='flex items-center flex-1 min-w-0'>
        <input 
          type="checkbox" 
          checked={task.completed}
          className='accent-[#007011] w-5 h-5 md:w-4 md:h-4 cursor-pointer shrink-0 transition-transform active:scale-90'
          onChange={() => toggleCompleted(task._id)}
        />
        
        {/* Usamos truncate para que nombres muy largos no rompan el diseño en móvil, en caso de que esté completada se verá resaltada en verde
        en caso de que esté completada la pondremos que se vea menos tacharemos y en caso de que esté vencida la pondremos en amarillo */}
        <span className={`
          pl-3 md:pl-5 text-base md:text-[18px] truncate
          ${task.completed ? 'line-through opacity-50' : ''} 
          ${task.priority ? 'font-bold text-[#007011]' : ''} 
          ${estaVencida ? 'font-bold text-[#E3D264]' : ''}
        `}>
          {task.text}
        </span>

        {/*Si está vencida le ponemos una señal de warning para advertir*/}
        {estaVencida && (
          <img src="/icons/warning.png" alt="vencida" className='pl-2 w-5 h-5 md:w-auto shrink-0' />
        )}
      </div>

      {/* Lado derecho: Fecha + Flecha */}
      <div className='flex items-center shrink-0 ml-2'>
        <span className={`
          pr-4 md:pr-20 text-sm md:text-base text-[#007011]
          ${estaVencida ? 'font-bold text-[#E3D264]' : ''}
        `}>
          {fechaFormateada}
        </span>
        
        {/*Botón flecha para abrir el editar tarea*/}
        <button
          className='p-2 -mr-2 cursor-pointer hover:scale-110 active:scale-90 transition-all duration-300'
          onClick={() => abrirModal(task)}
        >
          <img className='h-5 w-5 md:h-[20px] md:w-[20px]' src="/icons/arrow_forward.png" alt="editar" />
        </button>
      </div>
      
    </li>
  );
}

export default TaskItem;