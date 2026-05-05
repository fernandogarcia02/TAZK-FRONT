import useTasksContext from '../hooks/useTasksContext';
import TaskItem from './TaskItem';

//Componente para listar las tareas de hoy
function TaskList() {
  //Nos traemos el estado donde guardamos todos los items
  const { items } = useTasksContext();

  //filtramos para imprimir solo las tareas de hoy
  const hoy = new Date().toLocaleDateString();
  const tareasHoy = items.filter((task) =>{
    // Asegúrate de que task.fechaVencimiento sea una fecha válida
    const fechaTarea = new Date(task.fechaVencimiento).toLocaleDateString();
    return hoy === fechaTarea;
  });

  return (
    /* En móvil ocupa el 100% del ancho. 
       En escritorio vuelve al 80% (w-4/5).
    */
    <div className='min-h-[100dvh] w-full md:w-4/5 flex flex-col'>
      
      {/* Espaciador superior: 
          En móvil es más pequeño (h-16) para dejar sitio al botón del Sidebar. 
          En PC mantenemos tu proporción (h-1/10).
      */}
      <div className='h-20 md:h-1/10 shrink-0'></div>

      <div className='flex-1 px-6 md:pl-20 md:pr-10'>
        {/* Título: 
            Bajamos el tamaño en móvil (text-4xl) para que no rompa la línea.
        */}
        <h2 className='font-bold font-poppins text-center md:text-left text-4xl md:text-[50px] leading-none text-[#007011]'>
          HOY
        </h2>
        
        {/* Lista: 
            Añadimos un margen superior para que respire.
        */}
        <ul className='mt-6 flex flex-col gap-3 pb-10'>
          {tareasHoy.length > 0 ? (
            tareasHoy.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))
          ) : (
            <p className="text-gray-400 font-inter mt-4 italic">No hay tareas para hoy.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;