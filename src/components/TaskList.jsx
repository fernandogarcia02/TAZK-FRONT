import useTasksContext from '../hooks/useTasksContext';
import TaskItem from './TaskItem';

function TaskList() {
  const { items } = useTasksContext();

  return (
    <div className='h-[100vh] w-4/5'>

      <h2>HOY</h2>
      <ul className=''>
        {items.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>

    </div>
  );
}

export default TaskList;
