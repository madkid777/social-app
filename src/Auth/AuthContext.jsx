import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [userToken, setUserToken] = useState(localStorage.getItem("token") || null);
    const [userData, setUserData] = useState()
    function getLoggedUserData() {
        axios({
            method: 'get',
            url: 'https://linked-posts.routemisr.com/posts',
            headers: {
                token: userToken
            }
        }).then((res) => { res.data })
    }
    useEffect(() => getLoggedUserData(), [])

    return (
        <AuthContext.Provider value={{ userToken, setUserToken }}>
            {children}
        </AuthContext.Provider>
    );
}