import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
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
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { formatTime } from "../../service/convertDateTime";
import { Picker } from "@react-native-picker/picker";
import { WhenToTake } from "../../constants/Options";

const ActionModal = () => {
  const router = useRouter();
  const medicine = useLocalSearchParams();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async data => {
    try {
      const { success, message } =
        await medicationsFirebaseServices.updateMedication({
          ...medicine,
          ...data,
        });
      console.log(`success`, success);
      if (!success) {
        Alert.alert("Medication", message);
      } else {
        medicine = { ...medicineParams, ...data };

        setIsModalVisible(false);
      }
      console.log(`Error in handleEdit: `, error.message);
    } catch (error) {
    } finally {
    }
  };

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
              onPress={() => setIsModalVisible(true)}
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
      <EditDataModal
        medicine={medicine}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleEdit={handleEdit}
      />
    </SafeAreaView>
  );
};

export default ActionModal;

const EditDataModal = ({
  medicine,
  isModalVisible,
  setIsModalVisible,
  handleEdit,
}) => {
  console.log(`medicine`, medicine);
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [when, setWhen] = useState(WhenToTake[0]);
  const [reminder, setReminder] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleCancelEdit = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setName(medicine?.name || "");
    setDose(medicine?.dose || "");
    setWhen(medicine?.when || WhenToTake[0]);
    setReminder(medicine?.reminder || null);
  }, [isModalVisible]);

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      onRequestClose={handleCancelEdit}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit</Text>
          <View style={{ marginTop: 5, width: "100%" }}>
            <Text>Name</Text>
            <TextInput
              placeholder={"Name"}
              value={name}
              style={styles.textInput}
              onChangeText={text => setName(text)}
            />
          </View>

          <View style={{ marginTop: 5, width: "100%" }}>
            <Text>Dose</Text>
            <TextInput
              placeholder={"Dose"}
              value={dose}
              style={styles.textInput}
              onChangeText={text => setDose(text)}
            />
          </View>
          <View style={{ marginTop: 5, width: "100%" }}>
            <Text>Time</Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={[styles.inputGroup, { width: "100%" }]}
            >
              <Ionicons
                style={styles.icon}
                name="time"
                size={24}
                color="black"
              />
              <Text style={{ fontSize: hp(1.8), padding: 10 }}>
                {reminder ?? "Select Time Reminder"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 5, width: "100%" }}>
            <Text>When</Text>
            <View style={styles.inputGroup}>
              <Ionicons
                style={styles.icon}
                name="time-outline"
                size={24}
                color="black"
              />

              <Picker
                selectedValue={when || WhenToTake[0]}
                onValueChange={(itemValue, itemIndex) => setWhen(itemValue)}
                style={{ width: "90%" }}
              >
                {WhenToTake.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={[styles.missedButton, { borderColor: "red" }]}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  color: "red",
                  fontWeight: "700",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleEdit({ name, dose, when, reminder });
              }}
              style={[styles.successButton, { backgroundColor: Colors.GREEN }]}
            >
              <Text
                style={{ fontSize: hp(2), color: "white", fontWeight: "700" }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showTimePicker && (
        <RNDateTimePicker
          display="spinner"
          mode="time"
          value={new Date(reminder) ?? new Date()}
          onChange={(event, selectedDate) => {
            if (event.type === "set" && selectedDate) {
              setReminder(formatTime(selectedDate));
            }
            setShowTimePicker(false);
          }}
          minimumDate={new Date()}
        />
      )}
    </Modal>
  );
};

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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: wp(80),
    alignItems: "center",
  },
  modalTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 16,
    marginTop: 15,
  },
  cancelButton: {
    // backgroundColor: colors.neutral600,
    flex: 1,
  },
  saveButton: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
  },
  textInput: {
    width: "100%",
    padding: 10,
    marginTop: 5,
    fontSize: hp(1.7),
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 5,
    backgroundColor: Colors.WHITE,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 10,
    borderRightColor: Colors.GRAY,
  },
});
