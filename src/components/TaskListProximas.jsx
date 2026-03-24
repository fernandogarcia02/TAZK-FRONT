import useTasksContext from '../hooks/useTasksContext';
import TaskItem from './TaskItem';

function TaskListProximas() {
  const { items } = useTasksContext();

  return (
    /* Cambiamos h-[100vh] por min-h-[100dvh] para el navegador del móvil
       y w-4/5 por w-full md:w-4/5 para que en móvil use toda la pantalla */
    <div className='min-h-[100dvh] w-full md:w-4/5 flex flex-col'>
      
      {/* Espaciador superior adaptado al botón de menú del móvil */}
      <div className='h-20 md:h-1/10 shrink-0'></div>

      {/* Padding dinámico: en móvil px-6, en escritorio recuperamos tu pl-20 */}
      <div className='flex-1 px-6 md:pl-20 md:pr-10'>
        
        {/* Título responsivo para que no se corte en pantallas estrechas */}
        <h2 className='font-bold font-poppins text-3xl text-center md:text-left md:text-[50px] leading-none text-[#007011] uppercase'>
          Próximas Tareas
        </h2>
        
        {/* Lista de tareas con margen superior y separación entre items */}
        <ul className='mt-6 flex flex-col gap-2 pb-10'>
          {items.length > 0 ? (
            items.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))
          ) : (
            <p className="text-gray-400 font-inter mt-4 italic">No hay tareas pendientes.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskListProximas;