import { createContext } from "react";
import { useQuery } from "react-query";
import { getUserDetails } from "../db/getUserDetails"

export const Context = createContext()

export const Provider = ({ children }) => {
    const userData = useQuery("user", () => getUserDetails)

    if (userData.isError) {
        console.error(userData.error)
    }

    if (userData.isLoading) {
        console.log("Loading user data...")
    }
}
