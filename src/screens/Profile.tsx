import {
    View,
    Text,
    SafeAreaView, TouchableOpacity,
} from "react-native";
import React, {FC, useContext, useEffect, useState} from "react";
import {dateFormatter} from "../utils/dateFormatter";
import {User} from "../types/user.type";
import api from "../api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {errorHandler} from "../api/errorHandler";
import {AuthContext} from "../components/AuthProvider";


const Profile: FC = () => {
    const {setToken} = useContext(AuthContext);
    const [status, setStatus] = useState<'loading' | 'idle' | 'error'>('idle');
    const [user, setUser] = useState<User | null>(null)

    const clearToken = async () => {
        await AsyncStorage.removeItem(
            'token',
        );
        setToken("");
    }

    useEffect(() => {
        setStatus("loading")
        setTimeout(async () => {
            try {
                const user = await api.auth.getCurrentUserInfo();
                setUser(user);
                setStatus("idle");
            } catch (e) {
                setStatus("error");
                if (axios.isAxiosError(e) && e.response?.status === 401) {
                    await clearToken();
                }
                console.log(e)
            }
        }, 500)
    }, [])

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="px-5 py-2">
                <Text className="font-bold text-[25px] mb-3 mt-6">Профиль</Text>
            </View>
            <View className="px-5 py-2 mt-3">
                {status === "loading" ? <Text className="text-center">Загрузка...</Text> : null}
                {status === "error" ?
                    <Text className="text-center text-[#FF0000] text-[15px]">Ошибка при загрузке данных
                        пользователя</Text> : null}
                {status === "idle" && user ? <View>
                    <View className="flex-col gap-1 p-4 rounded-xl bg-[#F6FBFF]">
                        <Text className="text-[#123094] font-semibold text-[18px]">Имя: {user.firstName}</Text>
                        <Text className="text-[#123094] font-semibold text-[18px]">Фамилия: {user.lastName}</Text>
                        <Text className="text-[#123094] font-semibold text-[18px]">Почта: {user.email}</Text>
                        <Text className="text-[#123094] font-semibold text-[18px]">Дата регистрации: {dateFormatter(new Date(user.createdAt))}</Text>
                    </View>
                    <TouchableOpacity onPress={clearToken}
                                      className="bg-[#FF0000] py-3 px-5 rounded-xl mt-5 w-[200]">
                        <Text className="text-center text-white font-bold">Выйти</Text>
                    </TouchableOpacity>
                </View> : null}
            </View>
        </SafeAreaView>
    );
};

export default Profile;
