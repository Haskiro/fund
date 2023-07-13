import React, {createContext, FC, ReactNode, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext<{ setToken: React.Dispatch<React.SetStateAction<string>> }>({
    setToken: () => {
    }
})
export type AuthProviderProps = {
    children: ReactNode,
    setToken: React.Dispatch<React.SetStateAction<string>>
}

const AuthProvider: FC<AuthProviderProps> = ({children, setToken}) => {
    useEffect(() => {
        const getTokenFromStorage = async () => {
            const token = await AsyncStorage.getItem(
                'token',
            );
            if (token) setToken(token);
        }
        getTokenFromStorage();
    }, [])
    return (
        <AuthContext.Provider value={{setToken}}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthProvider;