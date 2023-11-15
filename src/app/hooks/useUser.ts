import { useContext } from "react";
import UserContext, { UserContextType } from "../contexts/UserContext";

function useUser() {
    return useContext<UserContextType>(UserContext);
}

export default useUser;