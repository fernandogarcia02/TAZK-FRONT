//Provider para poder usar el context de listas
import ListsContext from "./ListsContext";
import useLists from "../hooks/useLists.js";

function ListsProvider({children}){
    const lists = useLists();

    return(
        <ListsContext.Provider value={lists}>
            {children}
        </ListsContext.Provider>
    )
} 
export default ListsProvider;