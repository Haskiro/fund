import {AxiosResponse} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {HTTP} from "./init";
import {User} from "../types/user.type";

const authByNumber = async (number: number): Promise<string> => {
    const res: AxiosResponse<{ token: string }> = await HTTP.post("/auth/loginByNumber", {
        number
    });
    await AsyncStorage.setItem(
        'token',
        res.data.token,
    );
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    return res.data.token;
}

const getCurrentUserInfo = async (): Promise<User> => {
    const res: AxiosResponse<User> = await HTTP.get("/accounts/getInfo");
    return res.data;
}

export {
    authByNumber,
    getCurrentUserInfo
}