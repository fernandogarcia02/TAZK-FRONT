import UserContext from "./UsersContext";
import useUsers from "../hooks/useUsers";

function UsersProvider ({children}) {
    const users = useUsers();

    return (
        <UserContext.Provider value={users}>
            {children}
        </UserContext.Provider>
    )
}

export default UsersProvider;