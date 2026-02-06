import TasksContext from './TasksContext';
import useTasks from '../hooks/useTasks';

function TasksProvider({ children }) {
  const tasks = useTasks(); // TODO tu hook tal cual

  return (
    <TasksContext.Provider value={tasks}>
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;
