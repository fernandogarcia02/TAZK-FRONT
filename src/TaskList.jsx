import useTasksContext from './hooks/useTasksContext';
import TaskItem from './TaskItem';

function TaskList() {
  const { items } = useTasksContext();

  return (
    <ul className='bg-gray-300 border-l-4 border-green-500 rounded-xl shadow-lg mx-auto w-[900px] h-[400px] font-bold text-lg'>
      {items.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
