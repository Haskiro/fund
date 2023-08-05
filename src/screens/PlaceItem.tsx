import {View, Text, SafeAreaView, Image, ScrollView} from "react-native";
import React, {FC, useContext, useEffect, useState} from "react";
import {Organization} from "../types/organization.type";
import api from "../api";
import {errorHandler} from "../api/errorHandler";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {PlaceStackParams, RootStackParams} from "../navigation/types";
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
        <SafeAreaView className="flex-1 h-full">
            <ScrollView className="flex-1 bg-white h-full">
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
                        className="object-cover h-[200px]"
                        style={{width: "100%"}}
                        source={{uri: REACT_APP_API_URL + "/" + organization.icon}}
                    />
                    <View className="px-3 py-2">
                        <Text className="font-bold text-[25px] mb-2">{organization.title}</Text>
                        <Text>{organization.address}</Text>
                        <Text>{organization.description}</Text>
                    </View>
                    {organization.specialCardImageUrl ? <View  className="px-3 h-full">
                        <Text className="font-bold text-[20px] mb-2">Скидочная карта</Text>
                        <Image className="w-full h-[400px] mb-2 mx-auto"
                               source={{uri: REACT_APP_API_URL + "/" + organization.specialCardImageUrl}}
                               resizeMode="contain"/>
                        {/*<Image*/}
                        {/*    // className="object-cover h-full"*/}
                        {/*    style={{width: "100%"}}*/}

                        {/*    source={{uri: REACT_APP_API_URL + "/" + organization.specialCardImageUrl}}*/}
                        {/*/>*/}
                    </View> : null}
                </> : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export default PlaceItem;
