import {MapStackParams} from "./types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceItem from "../screens/PlaceItem";
import Map from "../screens/Map";

const MapStack = createNativeStackNavigator<MapStackParams>();

const MapStackScreen = () => {
    return (
        <MapStack.Navigator initialRouteName="Map">
            <MapStack.Screen
                options={{ headerShown: false }}
                name="Map"
                component={Map}
            />
            <MapStack.Screen
                options={{ headerTintColor: "#123094", headerTitle: "" }}
                name="PlaceItem"
                component={PlaceItem}
            />
        </MapStack.Navigator>
    );
};

export default MapStackScreen;
