import {View, Text, Modal, TouchableOpacity} from "react-native";
import React, {FC, useContext, useEffect, useState} from "react";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location"
import {Organization} from "../types/organization.type";
import api from "../api";
import {errorHandler} from "../api/errorHandler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../components/AuthProvider";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {MapStackParams} from "../navigation/types";

export type MapRegionType = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

type MapScreenStackProps = NativeStackScreenProps<
    MapStackParams,
    "Map"
>;

const Map: FC<MapScreenStackProps> = ({navigation, route}) => {
    const [mapRegion, setMapRegion] = useState<MapRegionType>({
        latitude: 55.7522200,
        longitude: 37.6155600,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [status, setStatus] = useState<'loading' | 'idle' | 'error' | 'fulfilled'>('idle');
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const {setToken} = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [checkedItem, setCheckedItem] = useState<Organization | null>(null);

    const userLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMessage('Доступ к геопозиции запрещен')
            return;
        }
        let location = await Location.getCurrentPositionAsync({accuracy: 3});
        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,

        })
    }

    const handleClickMarker = (item?: Organization) => {
        if (item) {
            setCheckedItem(item);
            setModalVisible(true);
        } else {
            setCheckedItem(null);
            setModalVisible(false)
        }

    }
    //
    const handleNavigate = () => {
        setModalVisible(false)
        setCheckedItem(null);
        navigation.push("PlaceItem", {id: checkedItem?.id as string})
    }
    // const getCoordinates = (address: string) => {
    //     Geocoder.from(address)
    //         .then(json => {
    //             var location = json.results[0].geometry.location;
    //             console.log(location);
    //         })
    //         .catch(error => console.warn(error));
    // }

    useEffect(() => {
        userLocation();
        setStatus("loading")
        setTimeout(async () => {
            try {
                const res = await api.organizations.getList(route.params?.category || "Все");
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
                errorHandler(e);
            }
        }, 500)
    }, [])

    return (
        <View
            className="flex-1"
        >
            {status === "loading" ?
                <Text className="text-[20px] text-center relative top-[45%]">Загрузка...</Text> : null}
            {status === "error" ?
                <Text className="text-[15px] text-center text-[#FF0000]">Ошибка загрузки данных</Text> : null}
            {status === "fulfilled" ?
                <MapView
                    className="flex-1"
                    mapType={`terrain`}
                    region={mapRegion}
                >
                    {organizations.map(item => (
                        <Marker coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude
                        }} key={item.id} title={item.title} onPress={() => handleClickMarker(item)}/>
                    ))}
                </MapView>
                : null}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >

                    <View className="h-[100%] bg-black opacity-25 absolute z-1 w-[100%]">
                    </View>
                    <View className="bg-white mx-auto my-auto max-w-[700px] z-2 rounded-xl p-2">
                        <Text className="text-[20px] font-bold text-center my-4">{checkedItem?.title}</Text>
                        <Text className="text-[16px]">{checkedItem?.description}</Text>
                        <View className="flex-row justify-center gap-2 mx-2 my-4">
                            <TouchableOpacity onPress={() => handleNavigate()}
                                              className="bg-[#123094] py-3 px-5 rounded-xl mt-5">
                                <Text className="text-center text-white font-bold">Смотреть</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleClickMarker()}
                                              className="bg-[#FF0000] py-3 px-5 rounded-xl mt-5">
                                <Text className="text-center text-white font-bold">Закрыть</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

            </Modal>
        </View>
    );
};

export default Map;
