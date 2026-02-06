import useTasksContext from './hooks/useTasksContext';
import TaskItem from './TaskItem';

function TaskList() {
  const { items } = useTasksContext();

  return (
    <ul>
      {items.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
