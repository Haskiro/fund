import { PlaceStackParams } from "./types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceItem from "../screens/PlaceItem";
import {Places} from "../screens";

const PlaceStack = createNativeStackNavigator<PlaceStackParams>();

const PlaceStackScreen = () => {
  return (
    <PlaceStack.Navigator initialRouteName="PlaceList">
      <PlaceStack.Screen
        options={{ headerShown: false }}
        name="PlaceList"
        component={Places}
      />
      <PlaceStack.Screen
        options={{ headerTintColor: "#123094", headerTitle: "" }}
        name="PlaceItem"
        component={PlaceItem}
      />
    </PlaceStack.Navigator>
  );
};

export default PlaceStackScreen;
