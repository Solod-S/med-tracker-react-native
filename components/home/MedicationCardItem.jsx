import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export const MedicationCardItem = ({ medicine }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 60, height: 60 }}
          source={{ uri: medicine?.type?.icon }}
        />
      </View>
      <View>
        <Text style={{ fontSize: hp(3), fontWeight: "bold" }}>
          {medicine?.name}
        </Text>
        <Text style={{ fontSize: hp(2.2) }}>{medicine?.when}</Text>
        <Text style={{ color: "white" }}>
          {medicine?.dose} {medicine?.type?.name}
        </Text>
      </View>
      <View style={styles.reminderContainer}>
        <MaterialCommunityIcons name="timer-outline" size={24} color="black" />
        <Text style={{ fontWeight: "bold", fontSize: hp(2.2) }}>
          {medicine?.reminder}
        </Text>
      </View>
      {/* <View style={styles.subContainer}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_PRIMARY,
    // backgroundColor: Colors.LIGHT_PRIMARY,
    marginTop: 10,
    borderRadius: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginRight: 15,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reminderContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
  },
});
