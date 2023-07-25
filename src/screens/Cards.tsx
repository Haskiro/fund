import {
    View,
    Text,
    SafeAreaView, Image, ScrollView,
} from "react-native";
import React, {FC} from "react";


const Cards: FC = () => {
    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="px-5 py-2">
                <Text className="font-bold text-[25px] mb-3 mt-6">Скидочные карты</Text>
            </View>
            <ScrollView className="px-5 py-2 mt-3">
                <View>
                    <Text className="font-bold text-[20px] mb-5 " >Белая аптека</Text>
                    <Image className="w-[320px] h-[425px] mb-2 mx-auto"  source={require('../static/1.png')} resizeMode={"contain"}/>
                </View>
                <View>
                    <Text className="font-bold text-[20px] mb-5 " >Лента</Text>
                    <Image className="w-[320px] h-[437px] mb-2 mx-auto" source={require('../static/2.png')} resizeMode="contain"/>
                </View>
                <View>
                    <Text className="font-bold text-[20px] mb-5 " >Гринвиль</Text>
                    <Image className="w-[320px] h-[357px] mx-auto mb-2" source={require('../static/3.png')} resizeMode="contain"/>
                </View>
                <View>
                    <Text className="font-bold text-[20px] mb-5" >Компас здоровья</Text>
                    <Image className="w-[320px] h-[412px] mx-auto mb-3" source={require('../static/4.png')} resizeMode="contain"/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Cards;
