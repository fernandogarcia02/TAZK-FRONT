import useTasksContext from '../hooks/useTasksContext';
import TaskItem from './TaskItem';

//Componente para imprimir todas las tareas que ya han sido terminadas
function TaskListTerminadas() {
  //importamos el estado donde guardamos todas las tareas
  const { items } = useTasksContext();

  //filtramos para solo imprimir las tareas que han sido marcadas como terminadas
  const tareasTerminadas = items.filter((task) => task.completed);

  return (
    /* Cambiamos h-[100vh] por min-h-[100dvh] para evitar el fondo blanco en Android
       y w-4/5 por w-full md:w-4/5 para que en móvil use todo el ancho */
    <div className='min-h-[100dvh] w-full md:w-4/5 flex flex-col'>
      
      {/* Espaciador superior: h-20 en móvil para no chocar con el botón de menú */}
      <div className='h-20 md:h-1/10 shrink-0'></div>

      <div className='flex-1 px-6 md:pl-20 md:pr-10'>
        {/* Título responsivo: bajamos de 50px a text-4xl en móvil */}
        <h2 className='font-bold font-poppins text-3xl text-center md:text-left md:text-[50px] leading-none text-[#007011]'>
          TERMINADAS
        </h2>
        
        <ul className='mt-6 flex flex-col gap-2 pb-10'>
          {tareasTerminadas.length > 0 ? (
            tareasTerminadas.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))
          ) : (
            <p className="text-gray-400 font-inter mt-4 italic">No tienes tareas terminadas aún.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskListTerminadas;