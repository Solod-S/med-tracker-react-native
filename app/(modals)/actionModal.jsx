import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { BackButton, MedicationCardItem } from "../../components";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import medicationsFirebaseServices from "./../../service/medicationsFirebaseServices";

const ActionModal = () => {
  const router = useRouter();
  const medicine = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const updateActionStatus = async status => {
    try {
      setIsLoading(true);
      await medicationsFirebaseServices.changeStatus(status, medicine);
      Alert.alert(status, "Response Saved!", [
        { text: "ok", onPress: () => router.replace("(tabs)/home") },
      ]);
    } catch (error) {
      console.log(`Error updateActionStatus:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={[styles.container, { backgroundColor: "white" }]}>
        <BackButton
          style={{ position: "absolute", top: wp(4), right: wp(4) }}
        />
        <Image
          source={require("./../../assets/images/clock.png")}
          style={{ width: hp(20), height: hp(20) }}
        />
        <Text style={{ fontSize: hp(2) }}>{medicine?.selectedDate}</Text>
        <Text
          style={{
            fontSize: hp(4.5),
            fontWeight: "bold",
            color: Colors.PRIMARY,
          }}
        >
          {medicine?.reminder}
        </Text>
        <Text style={{ fontSize: hp(2) }}>It's time to take</Text>
        <MedicationCardItem medicine={medicine} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={isLoading}
            style={[
              styles.successButton,
              { backgroundColor: isLoading ? "gray" : Colors.GREEN },
            ]}
            onPress={() => updateActionStatus("Taken")}
          >
            <Ionicons name="checkmark-outline" size={hp(3)} color="white" />
            <Text
              style={{ fontSize: hp(2), color: "white", fontWeight: "700" }}
            >
              Taken
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => updateActionStatus("Missed")}
            style={[
              styles.missedButton,
              { borderColor: isLoading ? "gray" : "red" },
            ]}
          >
            <Ionicons
              name="close-outline"
              size={hp(3)}
              color={isLoading ? "gray" : "red"}
            />
            <Text
              style={{
                fontSize: hp(2),
                color: isLoading ? "gray" : "red",
                fontWeight: "700",
              }}
            >
              Missed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ActionModal;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: { flexDirection: "row", gap: 15, marginTop: 25 },
  missedButton: {
    gap: 6,
    padding: 10,
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    // borderColor: "red",
    borderRadius: 10,
  },
  successButton: {
    gap: 6,
    padding: 10,
    flexDirection: "row",
    // backgroundColor: Colors.GREEN,
    alignItems: "center",
    borderRadius: 10,
  },
});
