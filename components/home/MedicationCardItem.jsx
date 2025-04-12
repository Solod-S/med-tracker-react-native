import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

export const MedicationCardItem = ({ medicine, selectedDate = "" }) => {
  const [status, setStatus] = useState();
  const checkStatus = () => {
    if (Array.isArray(medicine?.action)) {
      const data = medicine.action.find(item => item.date === selectedDate);
      console.log(`data`, data);
      setStatus(data);
    }
  };
  useEffect(() => {
    checkStatus();
  }, [medicine]);
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
      {status?.date && (
        <View style={styles.statusContainer}>
          {status?.status == "Taken" && (
            <FontAwesome
              name="check-circle"
              size={hp(2)}
              color={Colors.GREEN}
            />
          )}
          {status?.status == "Missed" && (
            <AntDesign name="closecircle" size={hp(1.8)} color="red" />
          )}
        </View>
      )}
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
  reminderContainer: {
    padding: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,

    alignItems: "center",
  },
  statusContainer: {
    position: "absolute",
    top: 5,
    padding: 7,
  },
});
