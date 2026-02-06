import useTasksContext from './hooks/useTasksContext';

function TaskItem({ task }) {
  const {
    toggleCompleted,
    borrarItem,
    abrirModal,
    obtenerColor
  } = useTasksContext();

  return (
    <li
      onClick={() => abrirModal(task)}
      style={{
        cursor: 'pointer',
        color: obtenerColor(task.priority),
        textDecoration: task.completed ? 'line-through' : 'none'
      }}
    >
      {task.text}

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleCompleted(task.id);
        }}
      >
        ✔
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          borrarItem(task.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

export default TaskItem;
