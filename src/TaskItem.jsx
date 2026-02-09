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
    className='flex items-center justify-between'
      onClick={() => abrirModal(task)}
      style={{
        cursor: 'pointer',
        color: obtenerColor(task.priority),
        textDecoration: task.completed ? 'line-through' : 'none'
      }}
    >
      {task.text}

      <div>

      <button
      className='text-green-600 border-2 rounded p-2 m-8 hover:bg-green-100 hover:text-green-600'
        onClick={(e) => {
          e.stopPropagation();
          toggleCompleted(task.id);
        }}  
      >
        Terminada
      </button>

      <button
      className='text-red-600 hover:bg-red-100 hover:text-white border-2 rounded p-2'
        onClick={(e) => {
          e.stopPropagation();
          borrarItem(task.id);
        }}
      >
        Eliminar
      </button>
      </div>
    </li>
  );
}

export default TaskItem;
