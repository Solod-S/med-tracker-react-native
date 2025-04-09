import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import useAuthStore from "@/store/useAuthStore";
import Entypo from "@expo/vector-icons/Entypo";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

export const Header = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            style={{ width: wp(10), height: wp(10) }}
            source={require("./../../assets/images/hello.png")}
          />

          <Text style={{ fontSize: hp(4), fontWeight: "bold" }}>
            Hello,{" "}
            {user?.fullName
              ? user.fullName.length > 5
                ? user.fullName.slice(0, 2) + "..." + " "
                : user.fullName
              : "Guest"}{" "}
            ⭐
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/(modals)/addNewMedication")}
        >
          <Entypo name="circle-with-plus" size={40} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
