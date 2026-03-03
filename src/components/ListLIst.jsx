import useListsContext from "../hooks/useListsContext";

function ListList() {
    const {listas} = useListsContext();

    return(
        <ul>
            {listas.map((list) =>(
                <li className="pl-10 pt-2 text-white" key={list._id}>{list.nombre}</li>
            ))}
        </ul>
    )
}

export default ListList;