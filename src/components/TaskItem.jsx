import useTasksContext from '../hooks/useTasksContext';

function TaskItem({ task }) {
  const {
    toggleCompleted,
    abrirModal,
  } = useTasksContext();

  const vencida = () =>{
    const hoy = new Date();
    const fechaTarea = new Date(task.fechaVencimiento);
    const hoySoloFecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const tareaSoloFecha = new Date(fechaTarea.getFullYear(), fechaTarea.getMonth(),fechaTarea.getDate());

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
    <li
    className='flex items-center justify-between py-6 border-b mr-20'
    > 
    <div className='flex items-center'>
      <input 
      type="checkbox" 
      checked={task.completed}
      className='accent-[#007011] w-4 h-4 cursor-pointer hover:scale-105 active:scale-95 transition-all'
      onChange={(e) => {
        toggleCompleted(task._id)
      }
      }
      />
      <span className={`${task.completed ? 'line-through opacity-50' : ''} pl-5 text-[18px] ${task.priority ? 'font-bold text-[#007011]' : ''} ${estaVencida ? 'font-bold text-[#E3D264]' : ''}`}>{task.text}</span>
      {estaVencida && (
        <img src="/icons/warning.png" alt="tarea vencida" className='pl-3' />
      )}
    </div>
    <div className='flex items-center'>
      <span className={`pr-20 text-[#007011] ${estaVencida ? 'font-bold text-[#E3D264]' : ''}`}>{fechaFormateada}</span>
      <button
      className='cursor-pointer hover:scale-110 active:scale-90 transition-all duration-400'
      onClick={()=>abrirModal(task)}
      >
        <img className='h-[20px] w-[20px]' src="/icons/arrow_forward.png" alt="editar tarea" />
      </button>
    </div>
      

    </li>
  );
}

export default TaskItem;
