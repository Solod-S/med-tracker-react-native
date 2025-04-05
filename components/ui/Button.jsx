import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const Button = ({
  text,
  style,
  fontSize = hp(2),
  backgroundColor = Colors.PRIMARY,
  color = Colors.WHITE,
  borderColor = backgroundColor,
  onPress = () => {
    console.log(`pressed`);
  },
}) => {
  return (
    <View style={style}>
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          padding: 15,
          backgroundColor,
          borderRadius: 99,
          borderWidth: 1,
          borderColor: borderColor,
        }}
      >
        <Text
          style={{
            fontSize,
            textAlign: "center",
            fontWeight: "bold",
            color,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
