import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [userToken, setUserToken] = useState(localStorage.getItem("token") || null);
    const [userData, setUserData] = useState(null)
    function getLoggedUserData() {
        axios({
            method: 'get',
            url: 'https://linked-posts.routemisr.com/users/profile-data',
            headers: {
                token: userToken
            }
        }).then((res) => {
            setUserData(res.data.user)
        })
    }
    useEffect(() => { getLoggedUserData() }, [])

    return (
        <AuthContext.Provider value={{ userToken, setUserToken, userData }}>
            {children}
        </AuthContext.Provider>
    );
}