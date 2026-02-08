import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext()
export const AUTH_TOKEN_KEY = 'auth_token'

function decodeAuthToken(auth_token) {
    try {
        return jwtDecode(auth_token);
    } catch (error) {
        console.error("Token inválido:", error);
        return null;
    }
}

function AuthContextProvider({ children }) {
    const auth_token = localStorage.getItem(AUTH_TOKEN_KEY)
    const [isLogged, setIsLogged] = useState(Boolean(auth_token))
    const [session, setSession] = useState(auth_token ? decodeAuthToken(auth_token) : null)

    useEffect(
        () => {
            /* 
            Normalmente los backends suelen tener un endpoint 
            GET /api/auth/validate-token (Authorization: Bearer auth_token) Te responde si el token es valido o no
            */
            /* Este useEfecct seria valido si en el futuro*/
            /*             const auth_token = localStorage.getItem(AUTH_TOKEN_KEY)
                        if(auth_token){
                            setIsLogged(true)
                            const session_decoded = jwtDecode(auth_token)
                            setSession(session_decoded)
                        } */
        },
        []
    )

    function saveSession(auth_token) {
        const session_decoded = decodeAuthToken(auth_token);
        if (session_decoded) {
            localStorage.setItem(AUTH_TOKEN_KEY, auth_token);
            setSession(session_decoded);
            setIsLogged(true);
        }
    }

    //Funcion para cerrar sesion
    function logout() {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setSession(null);
        setIsLogged(false);
    }
    const providerValues = {
        saveSession,
        session,
        isLogged
    }
    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider