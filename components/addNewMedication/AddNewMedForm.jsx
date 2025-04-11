import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import Colors from "@/constants/Colors";
import { TypeList, WhenToTake } from "./../../constants/Options";
import medicationsFirebaseServices from "@/service/medicationsFirebaseServices";
import { formateDateForText, formatTime } from "@/service/convertDateTime";
import { delay } from "@/service/utils";

import { Button, Loading } from "../ui";
import useAuthStore from "@/store/useAuthStore";

export const AddNewMedForm = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formData, setFormData] = useState({ when: "Morning" });
  const [isLoading, setIsLoading] = useState(false);

  const onHandleSave = async () => {
    try {
      setIsLoading(true);
      const { success, message } =
        await medicationsFirebaseServices.saveMedication({
          ...formData,
          email: user?.email,
          uid: user?.uid,
        });
      if (success) {
        setTimeout(() => {
          Toast.show({
            type: "success",
            position: "top",
            // text1: "Error",
            text2: message,
            visibilityTime: 2000,
            autoHide: true,
          });
        }, 500);
        router.back();
      } else {
        Alert.alert("Medication", message);
      }
    } catch (error) {
      console.log(`Error in onHandleSave`, error.message);
      Alert.alert("Medication", error.message);
    } finally {
      await delay(1000);
      setIsLoading(false);
    }
  };

  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.header}>Add New Medication</Text>
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="medkit-outline"
          size={24}
          color="black"
        />
        <TextInput
          onChangeText={value => onHandleInputChange("name", value)}
          style={styles.textInput}
          placeholder="Medicine Name"
        />
      </View>
      {/* Type List */}
      <FlatList
        data={TypeList}
        horizontal={true}
        style={{ marginTop: 5 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onHandleInputChange("type", item)}
            style={[
              styles.inputGroup,
              { marginRight: 10 },
              {
                backgroundColor:
                  item.name === formData?.type?.name
                    ? Colors.PRIMARY
                    : "transparent",
              },
            ]}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color:
                    item.name === formData?.type?.name ? Colors.WHITE : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      {/* Dose input */}
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="eyedrop-outline"
          size={24}
          color="black"
        />
        <TextInput
          onChangeText={value => onHandleInputChange("dose", value)}
          style={styles.textInput}
          placeholder="Dose Ex 2, 5ml"
        />
      </View>
      {/* When To Take DropDown*/}
      {Platform.OS == "ios" ? (
        <View>
          <Ionicons
            style={[
              styles.icon,
              {
                position: "absolute",
                borderRightWidth: 0,
                top: hp(2),
                left: hp(1),
              },
            ]}
            name="time-outline"
            size={24}
            color="black"
          />
          <Picker
            itemStyle={{ height: hp(18), color: "black" }}
            selectedValue={formData?.when || WhenToTake[0]}
            onValueChange={(itemValue, itemIndex) =>
              onHandleInputChange("when", itemValue)
            }
          >
            {WhenToTake.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>
      ) : (
        <View style={styles.inputGroup}>
          <Ionicons
            style={styles.icon}
            name="time-outline"
            size={24}
            color="black"
          />

          <Picker
            selectedValue={formData?.when || WhenToTake[0]}
            onValueChange={(itemValue, itemIndex) =>
              onHandleInputChange("when", itemValue)
            }
            style={{ width: "90%" }}
          >
            {WhenToTake.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>
      )}
      {/* Start and End Date */}
      <View style={styles.dateGroup}>
        <TouchableOpacity
          onPress={() => setShowStartDatePicker(true)}
          style={[styles.inputGroup, { flex: 1 }]}
        >
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formData?.startDate
              ? formateDateForText(formData.startDate)
              : "Start Date"}
          </Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <RNDateTimePicker
            value={new Date(formData?.startDate) ?? new Date()}
            onChange={event => {
              onHandleInputChange("startDate", event.nativeEvent.timestamp);

              setShowStartDatePicker(false);
            }}
            minimumDate={new Date()}
          />
        )}
        <TouchableOpacity
          onPress={() => setShowEndDatePicker(true)}
          style={[styles.inputGroup, { flex: 1 }]}
        >
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formData?.endDate
              ? formateDateForText(formData.endDate)
              : "End Date"}
          </Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <RNDateTimePicker
            value={new Date(formData?.endDate) ?? new Date()}
            onChange={event => {
              onHandleInputChange("endDate", event.nativeEvent.timestamp);

              setShowEndDatePicker(false);
            }}
            minimumDate={new Date()}
          />
        )}
      </View>
      {/* Set Reminder Input */}
      <View style={styles.dateGroup}>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={[styles.inputGroup, { flex: 1 }]}
        >
          <Ionicons style={styles.icon} name="time" size={24} color="black" />
          <Text style={styles.text}>
            {formData?.reminder ?? "Select Time Reminder"}
          </Text>
        </TouchableOpacity>
      </View>
      {showTimePicker && (
        <RNDateTimePicker
          display="spinner"
          mode="time"
          value={new Date(formData?.reminder) ?? new Date()}
          // onChange={event => {
          //   onHandleInputChange(
          //     "reminder",
          //     formatTime(event.nativeEvent.timestamp)
          //   );

          //   setShowTimePicker(false);
          // }}
          onChange={(event, selectedDate) => {
            if (event.type === "set" && selectedDate) {
              onHandleInputChange(
                "reminder",
                formatTime(event.nativeEvent.timestamp)
              );
            }
            setShowTimePicker(false);
          }}
          minimumDate={new Date()}
        />
      )}
      {isLoading ? (
        <View style={styles.button}>
          <Loading color={Colors.WHITE} size={hp(3)} />
        </View>
      ) : (
        <Button
          onPress={() => onHandleSave()}
          style={{ marginTop: 20 }}
          text={"Add New Medication"}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: { fontSize: hp(3), fontWeight: "bold" },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    backgroundColor: Colors.WHITE,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: hp(2),
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 10,
    borderRightColor: Colors.GRAY,
  },
  typeText: { fontSize: hp(1.8) },
  text: { fontSize: hp(1.8), padding: 10 },
  dateGroup: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    // justifyContent: "center",
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
  },
});
