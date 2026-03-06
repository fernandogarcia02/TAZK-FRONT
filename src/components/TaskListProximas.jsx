import useTasksContext from '../hooks/useTasksContext';
import TaskItem from './TaskItem';

function TaskListProximas() {
  const { items } = useTasksContext();

  return (
    <div className='h-[100vh] w-4/5'>
      <div className='h-1/10'></div>
      <div className='h-9/10 pl-20'>
        <h2 className='font-bold font-poppins text-[50px] leading-none'>PRÓXIMAS TAREAS</h2>
        <ul className=''>
          {items.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>

      </div>

    </div>
  );
}

export default TaskListProximas;
