import { useParams } from 'react-router-dom';
import useTasksContext from '../hooks/useTasksContext';
import TaskItem from './TaskItem';
import useListsContext from '../hooks/useListsContext';

function TaskListList() {
  const { items } = useTasksContext();
  const {id} = useParams();
  const {listas} = useListsContext();

  const lista = listas.find((list) => list._id === id);

  const tareasLista = items.filter((task) =>{
    return task.list_id === id;
  });

  return (
    <div className='h-[100vh] w-4/5'>
      <div className='h-1/10'></div>
      <div className='h-9/10 pl-20'>
        <h2 className='font-bold font-poppins text-[50px] leading-none uppercase'>{lista?.nombre ? lista.nombre : ""}</h2>
        <ul className=''>
          {tareasLista.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>

      </div>

    </div>
  );
}

export default TaskListList;
