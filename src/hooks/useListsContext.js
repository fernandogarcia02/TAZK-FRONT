import { useContext } from "react";
import ListsContext from "../context/ListsContext";

function useListsContext(){
    return useContext(ListsContext);
}

export default useListsContext;