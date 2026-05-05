import { useParams } from 'react-router-dom';
import useTasksContext from '../hooks/useTasksContext';
import TaskItem from './TaskItem';
import useListsContext from '../hooks/useListsContext';
import React, { useEffect } from 'react';

//Componente para imprimir las tareas que son de una lista en concreto
function TaskListList() {
  //Importamos los estados necesarios tanto el de tareas como las listas
  const { items } = useTasksContext();
  const { id } = useParams();
  const { listas } = useListsContext();

  //buscamos la lista en concreto que necesitamos
  const lista = listas.find((list) => list._id === id);

  //filtramos para imprimir solo las tareas que pertenecen a esa lista
  const tareasLista = items.filter((task) => {
    return task.list_id === id;
  });

  //Use effect para poner el nombre de la lista en el titulo de la pestaña
  useEffect(() => {
    if (lista?.nombre) {
      document.title = `${lista.nombre} - TAZK`;
    } else {
      document.title = "Lista - TAZK";
    }
  }, [lista]);
  

  return (
    /* w-full para móvil y md:w-4/5 para escritorio. 
       min-h-[100dvh] para que el fondo sea fluido en Android */
    <div className='min-h-[100dvh] w-full md:w-4/5 flex flex-col'>
      
      {/* Espaciador superior para el botón de menú móvil */}
      <div className='h-20 md:h-1/10 shrink-0'></div>

      <div className='flex-1 px-6 md:pl-20 md:pr-10'>
        {/* Título: Usamos break-words por si el nombre de la lista es muy largo */}
        <h2 className='font-bold font-poppins text-3xl text-center md:text-left md:text-[50px] leading-none uppercase text-[#007011] break-words'>
          {lista?.nombre ? lista.nombre : "Lista"}
        </h2>
        
        <ul className='mt-6 flex flex-col gap-2 pb-10'>
          {tareasLista.length > 0 ? (
            tareasLista.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))
          ) : (
            <p className="text-gray-400 font-inter mt-4 italic">Esta lista está vacía.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskListList;