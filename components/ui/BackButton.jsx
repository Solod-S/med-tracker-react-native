import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const BackButton = ({ style, iconSize = 4 }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => router.back()}
    >
      <Ionicons
        name="caret-back-sharp"
        size={hp(iconSize)}
        color={Colors.PRIMARY}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    alignSelf: "flex-end",
    borderRadius: 100,
    padding: 5,
    borderCurve: "continuous",
  },
});
