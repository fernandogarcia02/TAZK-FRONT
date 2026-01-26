import TaskItem from "./TaskItem";

function TaskList({items, onToggle, onDelete,abrirModal,colorTexto}) {
    return(
        <ul>
            {items.map((item, index)=>{
                console.log(items);
                return(
                <TaskItem
                key={item.id}
                task={item}
                onToggle={()=>onToggle(item.id)}
                onDelete={()=>onDelete(item.id)}
                abrirModal={()=>abrirModal(item.id)}
                colorTexto={colorTexto(item)}
                />);
            })}
        </ul>
    )
}

export default TaskList;
