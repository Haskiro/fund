import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {RootStackParams} from "./types";
import PlaceStackScreen from "./place";
import Profile from "../screens/Profile";
import React, {FC} from "react";
import {FontAwesome, Entypo, FontAwesome5} from '@expo/vector-icons';
import MapStackScreen from "./map";


const RootStack = createBottomTabNavigator<RootStackParams>();
const RootStackScreen: FC = () => {
    return (
        <RootStack.Navigator initialRouteName="Profile">
            <RootStack.Screen
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: "#04764E",
                    title: 'Профиль',
                    tabBarIcon: ({focused}) => (<FontAwesome name="user-circle-o" size={24} color={focused ? '#04764E' : 'black'}/>)
                }}
                name="Profile"
                component={Profile}

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
                    tabBarActiveTintColor: "#04764E",
                    headerShown: false,
                    title: 'Организации',
                    tabBarIcon: ({focused}) => (<Entypo name="shop" size={24} color={focused ? '#04764E' : 'black'}/>)
                }}
                name="Places"
                component={PlaceStackScreen}
            />
            <RootStack.Screen
                options={{
                    tabBarActiveTintColor: "#04764E",
                    headerShown: false,
                    title: 'Карта',
                    tabBarIcon: ({focused}) => (<FontAwesome5 name="map-marker-alt" size={24} color={focused ? '#04764E' : 'black'}/>)
                }}
                name="MapStack"
                component={MapStackScreen}
            />
        </RootStack.Navigator>
    )
        ;
};

export default RootStackScreen;
