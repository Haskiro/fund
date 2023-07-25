import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {RootStackParams} from "./types";
import PlaceStackScreen from "./place";
import Profile from "../screens/Profile";
import React, {FC} from "react";
import {FontAwesome, Entypo, FontAwesome5} from '@expo/vector-icons';
import MapStackScreen from "./map";
import {Text, View} from "react-native";
import {Cards} from "../screens";


const RootStack = createBottomTabNavigator<RootStackParams>();
const RootStackScreen: FC = () => {
    return (
        <RootStack.Navigator initialRouteName="Profile">
            <RootStack.Screen
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: "#123094",
                    title: 'Профиль',
                    tabBarIcon: ({focused}) => (<FontAwesome name="user-circle-o" size={24} color={focused ? '#123094' : 'black'}/>),
                }}
                name="Profile"
                component={Profile}

            />
            <RootStack.Screen
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: "#123094",
                    title: 'Скидочные карты',
                    tabBarIcon: ({focused}) => (<FontAwesome name="credit-card-alt" size={22} color={focused ? '#123094' : 'black'} />),
                }}
                name="Cards"
                component={Cards}

            />
            {/*<RootStack.Screen*/}
            {/*    options={{*/}
            {/*        tabBarActiveTintColor: "#04764E",*/}
            {/*        headerShown: false,*/}
            {/*        title: 'Главная',*/}
            {/*        tabBarIcon: ({focused}) => (<Entypo name="home" size={24} color={focused ? '#04764E' : 'black'}/>)*/}
            {/*    }}*/}
            {/*    name="Home"*/}
            {/*    component={Home}*/}
            {/*/>*/}
            <RootStack.Screen
                options={{
                    tabBarActiveTintColor: "#123094",
                    headerShown: false,
                    title: 'Организации',
                    tabBarIcon: ({focused}) => (<Entypo name="shop" size={24} color={focused ? '#123094' : 'black'}/>)
                }}
                name="Places"
                component={PlaceStackScreen}
            />
            <RootStack.Screen
                options={{
                    tabBarActiveTintColor: "#123094",
                    headerShown: false,
                    title: 'Карта',
                    tabBarIcon: ({focused}) => (<FontAwesome5 name="map-marker-alt" size={24} color={focused ? '#123094' : 'black'}/>)
                }}
                name="MapStack"
                component={MapStackScreen}
            />
        </RootStack.Navigator>
    )
        ;
};

export default RootStackScreen;
