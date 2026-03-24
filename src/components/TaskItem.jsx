import useTasksContext from '../hooks/useTasksContext';

function TaskItem({ task }) {
  const { toggleCompleted, abrirModal } = useTasksContext();

  const vencida = () => {
    const hoy = new Date();
    const fechaTarea = new Date(task.fechaVencimiento);
    const hoySoloFecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const tareaSoloFecha = new Date(fechaTarea.getFullYear(), fechaTarea.getMonth(), fechaTarea.getDate());
    return tareaSoloFecha < hoySoloFecha && !task.completed;
  }

  const estaVencida = vencida();

  const formatearFecha = (fechaRaw) => {
    if(!fechaRaw) return "";
    const fecha = new Date(fechaRaw);
    return fecha.toLocaleDateString('es-ES',{
      day: 'numeric',
      month: 'short'
    }).replace('.','');
  }

  const fechaFormateada = formatearFecha(task.fechaVencimiento);

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
        
        {/* Usamos truncate para que nombres muy largos no rompan el diseño en móvil */}
        <span className={`
          pl-3 md:pl-5 text-base md:text-[18px] truncate
          ${task.completed ? 'line-through opacity-50' : ''} 
          ${task.priority ? 'font-bold text-[#007011]' : ''} 
          ${estaVencida ? 'font-bold text-[#E3D264]' : ''}
        `}>
          {task.text}
        </span>

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