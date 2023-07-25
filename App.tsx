import {RootStackScreen} from "./src/navigation";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import AuthProvider from "./src/components/AuthProvider";
import {Auth} from "./src/screens";
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {HTTP} from "./src/api/init";

export default function App() {
    const [token, setToken] = useState<string>("");
    const setTokenForRequests = async () => {
       const token = await AsyncStorage.getItem(
            'token',
        );
       setToken(token || "");
        HTTP.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    useEffect(() => {
        setTokenForRequests();
    }, [token])
    return (
        <AuthProvider setToken={setToken}>
            <NavigationContainer>
                {token ? <RootStackScreen/> : <Auth />}
                <StatusBar/>
            </NavigationContainer>
        </AuthProvider>
    );
}
