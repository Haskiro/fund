import {View, Text, SafeAreaView, Image} from "react-native";
import React, {FC, useContext, useEffect, useState} from "react";
import {Organization} from "../types/organization.type";
import api from "../api";
import {errorHandler} from "../api/errorHandler";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {PlaceStackParams} from "../navigation/types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../components/AuthProvider";
import {REACT_APP_API_URL} from "@env";

type PlaceItemScreenStackProps = NativeStackScreenProps<
    PlaceStackParams,
    "PlaceItem"
>;

const PlaceItem: FC<PlaceItemScreenStackProps> = ({route}) => {
    const [status, setStatus] = useState<'loading' | 'idle' | 'error'>('idle');
    const [organization, setOrganization] = useState<Organization | null>(null)
    const {setToken} = useContext(AuthContext)

    useEffect(() => {
        setStatus("loading")
        setTimeout(async () => {
            try {
                const res = await api.organizations.getOrganizationById(route.params.id)
                setOrganization(res)
                setStatus("idle");
            } catch (e) {
                setStatus("error");
                if (axios.isAxiosError(e) && e.response?.status === 401) {
                    await AsyncStorage.removeItem(
                        'token',
                    );
                    setToken("");
                }
                errorHandler(e);
            }
        }, 500)
    }, [])
    return (
        <SafeAreaView className="flex-1 bg-white">
            {status === "loading" ? <Text className="text-[15px] text-center">Загрузка...</Text> : null}
            {status === "error" ?
                <Text className="text-[15px] text-center text-[#FF0000]">Ошибка загрузки данных</Text> : null}
            {status === "idle" && organization ? <>
                {
                    organization.offers?.map(offer => (
                        <View className="bg-[#123094] px-3 py-5 mb-2" key={offer.id}>
                            <Text className="text-white font-semibold">{offer.text}</Text>
                        </View>
                    ))
                }
                <Image
                    className="object-cover h-[30%]"
                    style={{width: "100%"}}
                    source={{uri: REACT_APP_API_URL + "/" + organization.icon}}
                />
                <View className="px-3 py-2">
                    <Text className="font-bold text-[25px] mb-2">{organization.title}</Text>
                    <Text>{organization.address}</Text>
                    <Text>{organization.description}</Text>
                    {/*<Text className="font-semibold text-[#00A35E]">Открыто</Text>*/}
                </View></> : null}
        </SafeAreaView>
    );
};

export default PlaceItem;
