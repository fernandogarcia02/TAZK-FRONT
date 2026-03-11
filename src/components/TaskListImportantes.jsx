import useTasksContext from '../hooks/useTasksContext';
import TaskItem from './TaskItem';

function TaskListImportantes() {
  const { items } = useTasksContext();

  const tareasImportantes = items.filter((task) => task.priority);

  return (
    <div className='h-[100vh] w-4/5'>
      <div className='h-1/10'></div>
      <div className='h-9/10 pl-20'>
        <h2 className='font-bold font-poppins text-[50px] leading-none'>IMPORTANTES</h2>
        <ul className=''>
          {tareasImportantes.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>

      </div>

    </div>
  );
}

export default TaskListImportantes;
