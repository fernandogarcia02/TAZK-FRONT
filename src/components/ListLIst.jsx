import useListsContext from "../hooks/useListsContext";
import { NavLink } from "react-router-dom";

function ListList() {
    const {listas} = useListsContext();
      const linkStyle = ({isActive}) =>{
        const estiloResaltado = "bg-[#D9D9D9]/50 rounded-xl";
        const estiloNormal = "hover:bg-[#D9D9D9]/50 rounded-xl";

        return `flex items-center pl-7 pt-2 pb-2 transition-all duration-300 mx-3 my-1 ${isActive ? estiloResaltado : estiloNormal}`;
    }

    return(
        <ul>
            {listas.map((list) =>(
                <li key={list._id}>
                    <NavLink
                    to={`/lista/${list._id}`}
                    className={linkStyle}
                    >
                        <span className="text-white">{list.nombre}</span>
                    </NavLink>
                    </li>
            ))}
        </ul>
    )
}

export default ListList;