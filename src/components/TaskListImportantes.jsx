import useTasksContext from '../hooks/useTasksContext';
import TaskItem from './TaskItem';

function TaskListImportantes() {
  const { items } = useTasksContext();

  // Filtramos solo las que tienen prioridad activada
  const tareasImportantes = items.filter((task) => task.priority);

  return (
    /* Cambiamos h-[100vh] por min-h-[100dvh] para el Pixel
       y w-4/5 por w-full md:w-4/5 para escritorio */
    <div className='min-h-[100dvh] w-full md:w-4/5 flex flex-col'>
      
      {/* Espaciador superior: h-20 en móvil para dejar sitio al menú */}
      <div className='h-20 md:h-1/10 shrink-0'></div>

      <div className='flex-1 px-6 md:pl-20 md:pr-10'>
        {/* Título responsivo: bajamos de 50px a text-3xl/4xl en móvil */}
        <h2 className='font-bold font-poppins text-3xl text-center md:text-left md:text-[50px] leading-none text-[#007011]'>
          IMPORTANTES
        </h2>
        
        <ul className='mt-6 flex flex-col gap-2 pb-10'>
          {tareasImportantes.length > 0 ? (
            tareasImportantes.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))
          ) : (
            <p className="text-gray-400 font-inter mt-4 italic">No tienes tareas marcadas como importantes.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskListImportantes;