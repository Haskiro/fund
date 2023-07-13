import { View, Text, SafeAreaView } from "react-native";
import React from "react";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-2">
        <Text className="font-bold text-[25px] mb-3 mt-6">Уведомления</Text>
        <View className="bg-[#F6FBFF] px-5 py-5 rounded-xl mb-5">
          <Text className="text-[#04764E] font-semibold text-[18px] mb-3">
            Новое уведомление
          </Text>
          <Text>
            Текст уведомления Текст уведомления Текст уведомления Текст
            уведомления Текст уведомления
          </Text>
        </View>
        <View className="bg-[#F5F5F5] px-5 py-5 rounded-xl mb-5">
          <Text className="font-semibold text-[18px] mb-3">
            Cтарое уведомление
          </Text>
          <Text>
            Текст уведомления Текст уведомления Текст уведомления Текст
            уведомления Текст уведомления
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
