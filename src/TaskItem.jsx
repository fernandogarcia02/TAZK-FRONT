function TaskItem({task, onToggle, onDelete,abrirModal,colorTexto}){
    return(
        <li onClick={abrirModal}
             style={{color:colorTexto,cursor:'pointer',textDecoration: task.completed ? 'line-through' : 'none'}}>
             {task.text}
            <button onClick={(e)=>{e.stopPropagation(); onToggle()}}>✔</button>
            <button onClick={(e)=>{e.stopPropagation();onDelete()}}>❌</button>
        </li>
    )
}

export default TaskItem;