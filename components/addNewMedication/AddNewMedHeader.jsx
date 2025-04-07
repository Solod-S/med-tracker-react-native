import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackButton } from "../ui";

export const AddNewMedHeader = () => {
  return (
    <View>
      <Image
        style={{ width: wp(100), height: hp(30), resizeMode: "contain" }}
        source={require("./../../assets/images/add.png")}
      />
      <BackButton style={{ position: "absolute", top: 5, right: 10 }} />
    </View>
  );
};

const styles = StyleSheet.create({});
