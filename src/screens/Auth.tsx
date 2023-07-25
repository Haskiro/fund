import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, {FC, useContext, useState} from "react";
import {useForm} from "../hooks/useForm";
import api from "../api";
import {errorHandler} from "../api/errorHandler";
import {AuthContext} from "../components/AuthProvider";

const Auth: FC = () => {
    const [status, setStatus] = useState<'loading' | 'idle' | 'error'>('idle');
    const {form, handleChange} = useForm({
        number: "",
    })
    const {setToken} = useContext(AuthContext);

    const handleSubmit = async () => {
        setStatus("loading")
        setTimeout(async () => {
            try {
                const token = await api.auth.authByNumber(form.number);
                setStatus("idle")
                setToken(token)
            } catch (e) {
                setStatus("error");
                errorHandler(e);
            }
        }, 500)
    }


    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center">
            <Text className="font-bold text-[25px] mb-5">Вход</Text>
            <View>
                <Text className="mb-2 font-semibold text-[15px]">Введите код:</Text>
                <TextInput
                    style={{width: 250}}
                    className="bg-[#F5F5F5] mb-3 py-3 px-5 rounded-xl"
                    placeholder="******"
                    onChangeText={handleChange("number")}
                ></TextInput>
                <TouchableOpacity onPress={handleSubmit}
                                  className="bg-[#123094] py-3 px-5 rounded-xl"
                                  style={status === "error" ? {backgroundColor: "red"} : {}}
                                  disabled={status === "loading"}>
                    <Text className="text-center text-white font-bold">{status === "loading" ? "Загрузка..." : "Войти"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Auth;
