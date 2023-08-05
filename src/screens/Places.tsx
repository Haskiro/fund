import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image, FlatList,
} from "react-native";
import React, {FC, useContext, useEffect, useState} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {MapStackParams, PlaceStackParams} from "../navigation/types";
import api from "../api";
import {errorHandler} from "../api/errorHandler";
import {Organization} from "../types/organization.type";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../components/AuthProvider";
import {REACT_APP_API_URL} from "@env";

type PlacesScreenStackProps = NativeStackScreenProps<
    PlaceStackParams,
    "PlaceList"
>;

const Places: FC<PlacesScreenStackProps> = ({navigation}) => {
    const [status, setStatus] = useState<'loading' | 'idle' | 'error' | 'fulfilled'>('idle');
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const [category, setCategory] = useState<string>("Все");
    const [categoryStatus, setCategoryStatus] = useState<'loading' | 'idle' | 'error' | 'fulfilled'>('idle');
    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const {setToken} = useContext(AuthContext)

    const getOrganizations = () => {
        setStatus("loading")
        setTimeout(async () => {
            try {
                const res = await api.organizations.getList(category);
                setOrganizations(res)
                setStatus("fulfilled");
            } catch (e) {
                setStatus("error");
                if (axios.isAxiosError(e) && e.response?.status === 401) {
                    await AsyncStorage.removeItem(
                        'token',
                    );
                    setToken("");
                }
                errorHandler(e)
            }
        }, 500)
    }

    const getCategories = () => {
        setCategoryStatus("loading")
        setTimeout(async () => {
            try {
                const res = await api.organizations.getCategories();
                setCategoryList(res)
                setCategoryStatus("fulfilled");
            } catch (e) {
                setCategoryStatus("error");
                errorHandler(e);
            }
        }, 500)
    }

    useEffect(() => {
        getOrganizations();
    }, [category])


    useEffect(() => {
        getCategories();
    }, [])

    return (
        <SafeAreaView className="flex-1">
            <View className="px-5 py-2">
                <Text className="font-bold text-[25px] mb-3 mt-6">Организации</Text>
            </View>
            <View className="px-5 py-1">
                <View>
                    {categoryStatus === "loading" ?
                        <Text className="text-[15px] px-7 py-4">Загрузка категорий...</Text> : null}
                    {categoryStatus === "fulfilled" ? <>
                        <Text className="font-bold text-[20px] mb-3">Выберите категорию</Text>
                        <FlatList data={categoryList}
                                  renderItem={({item}) => <TouchableOpacity
                                      onPress={() => setCategory(item)}
                                      className="bg-[#FAFAFA] border-1 border-black rounded-xl px-7 py-2 items-center mb-5"
                                      style={category === item ? {
                                          backgroundColor: '#123094'
                                      } : null}
                                      key={item}
                                  ><Text style={category === item ? {
                                      color: 'white'
                                  } : {}}>{item}</Text></TouchableOpacity>}
                                  horizontal={true}
                                  contentContainerStyle={{gap: 6}}

                        />

                    </> : null}

                </View>
                <View className="flex-row gap-5 items-center">
                    <Text className="font-bold text-[20px] mb-5 " style={open ? {marginTop: 130} : null}>Список</Text>
                    {status === "fulfilled" ? <TouchableOpacity className="mb-5" onPress={() => navigation.push("Map", {category: category})}><Text className="text-[16px] underline text-blue-600">Посмотреть
                        на карте</Text></TouchableOpacity> : null}
                </View>
                {status === "loading" ? <Text className="text-[15px] px-7 py-4">Загрузка...</Text> : null}
                {status === "error" ?
                    <Text className="text-[15px] px-7 py-4 gap-3 text-[#FF0000]">Ошибка загрузки данных</Text> : null}
                {status === "fulfilled" ?
                    <FlatList
                        data={organizations}
                        renderItem={({item}) => <TouchableOpacity
                            onPress={() => navigation.push("PlaceItem", {id: item.id})}
                            className="bg-[#FAFAFA] flex-row px-7 py-4 gap-3 items-center mb-5"
                            key={item.id}
                        >

                            <Image
                                source={{uri: REACT_APP_API_URL + "/" + item.icon}}
                                className="w-[30%] max-w-[200px] h-[90%] rounded-lg"/>
                            <View>
                                <Text className="text-[14px] font-bold">{item.title}</Text>
                                <Text className="max-w-[70%] text-[11px]">
                                    {item.address}
                                </Text>
                            </View>
                        </TouchableOpacity>}
                        keyExtractor={item => item.id}
                    /> : null}
                {status === "fulfilled" && organizations.length === 0 ?
                    <Text className="text-[15px]">Не найдено ни одной организации в
                        категории <Text className="font-bold">{category}</Text> </Text> : null}

            </View>
        </SafeAreaView>
    );
};

export default Places;
