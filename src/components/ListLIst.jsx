import useListsContext from "../hooks/useListsContext";

function ListList() {
    const {listas} = useListsContext();

    return(
        <ul>
            {listas.map((list) =>(
                <li key={list._id}>{list.nombre}</li>
            ))}
        </ul>
    )
}

export default ListList;