import { Image, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import useAuthStore from "@/store/useAuthStore";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";

export const Header = () => {
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
        <Feather name="settings" size={34} color={Colors.DARK_GRAY} />
      </View>
    </View>
  );
};
