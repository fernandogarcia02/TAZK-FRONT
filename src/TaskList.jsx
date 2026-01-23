import TaskItem from "./TaskItem";

function TaskList({items, onToggle, onDelete}) {
    return(
        <ul>
            {items.map((item, index)=>{
                <TaskItem
                key={index}
                task={item}
                onToggle={()=>onToggle(index)}
                onDelete={()=>onDelete(index)}
                />
            })}
        </ul>
    )
}

export default TaskList;
