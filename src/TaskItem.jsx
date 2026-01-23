function TaskItem({task, onToggle, onDelete}){
    return(
        <li style={{textDecoration: task.completed ? 'line-through' : none}}>
            <button onClick={onToggle}>✔</button>
            <button onClick={onDelete}>❌</button>
        </li>
    )
}

export default TaskItem;