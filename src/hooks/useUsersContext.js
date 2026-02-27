import UserContext from "../context/UsersContext";
import { useContext } from "react";

function useUsersContext() {
    return useContext(UserContext);
}

export default useUsersContext;