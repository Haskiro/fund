import {RootStackScreen} from "./src/navigation";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import AuthProvider from "./src/components/AuthProvider";
import {Auth} from "./src/screens";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
    const [token, setToken] = useState<string>("");
    return (
        <AuthProvider setToken={setToken}>
            <NavigationContainer>
                {token ? <RootStackScreen/> : <Auth />}
                <StatusBar/>
            </NavigationContainer>
        </AuthProvider>
    );
}
