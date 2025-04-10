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
import FontAwesome from "@expo/vector-icons/FontAwesome";
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

  const showAlert = () => {
    Alert.alert("Logout", "Are you sure you want to delete this?", [
      {
        text: "Cancel",
        onPress: () => console.log(`cancel logout`),
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => deleteAction(),
        style: "destructive",
      },
    ]);
  };

  const deleteAction = async status => {
    try {
      setIsLoading(true);
      const result = await medicationsFirebaseServices.deleteMedication(
        medicine.docId
      );
      if (result.success) {
        Alert.alert("Delete", "Medication Deleted!", [
          { text: "ok", onPress: () => router.replace("(tabs)/home") },
        ]);
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.log(`Error deleteAction:`, error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <View style={{ backgroundColor: "white" }}>
        <BackButton
          style={{ position: "absolute", top: wp(4), right: wp(4) }}
        />

        <View style={styles.container}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              disabled={isLoading}
              onPress={() => showAlert()}
              style={[
                styles.deleteButton,
                { borderColor: isLoading ? "gray" : "red" },
              ]}
            >
              <Ionicons
                name="trash-outline"
                size={hp(3.5)}
                color={isLoading ? "gray" : "red"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isLoading}
              // onPress={() => showAlert()}
              style={[
                styles.editButton,
                { borderColor: isLoading ? "gray" : Colors.PRIMARY },
              ]}
            >
              <FontAwesome
                name="edit"
                size={hp(3.5)}
                color={isLoading ? "gray" : Colors.PRIMARY}
              />
            </TouchableOpacity>
            <Image
              source={require("./../../assets/images/clock.png")}
              style={{ width: hp(20), height: hp(20) }}
            />
          </View>
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
  deleteButton: {
    position: "absolute",
    right: 0,
    top: -30,
    gap: 6,
    padding: 10,
    flexDirection: "row",
    // borderWidth: 1,
    borderRadius: 10,
  },
  editButton: {
    position: "absolute",
    left: 0,
    top: -30,
    gap: 6,
    padding: 10,
    flexDirection: "row",
    // borderWidth: 1,
    borderRadius: 10,
  },
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
