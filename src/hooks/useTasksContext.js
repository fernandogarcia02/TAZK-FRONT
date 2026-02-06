import { useContext } from 'react';
import TasksContext from '../context/TasksContext';

function useTasksContext() {
  return useContext(TasksContext);
}

export default useTasksContext;
