import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import { Button } from "../ui";
import { useRouter } from "expo-router";

export const EmptyState = () => {
  const router = useRouter();
  return (
    <View style={{ marginTop: "80", display: "flex", alignItems: "center" }}>
      <Image
        // style={{ width: 120, height: 120 }}
        style={{ width: hp(15), height: hp(15) }}
        source={require("./../../assets/images/empty_medicine.png")}
      />
      <Text style={{ fontSize: hp(3.3), fontWeight: "bold", marginTop: 30 }}>
        No Medications!
      </Text>
      <Text
        style={{
          fontSize: hp(1.7),
          color: Colors.DARK_GRAY,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        You have 0 medication setup, kindly setup a new one
      </Text>
      <Button
        onPress={() => router.push("/(modals)/addNewMedication")}
        style={{ marginTop: 20 }}
        text={"+ Add New Medication"}
      />
    </View>
  );
};
