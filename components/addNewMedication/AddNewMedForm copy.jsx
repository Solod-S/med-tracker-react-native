import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import { TypeList, WhenToTake } from "./../../constants/Options";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export const AddNewMedForm = () => {
  const [showStartDate, setShowStartDate] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(Platform.OS);
  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log(`formData`, formData);
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
            itemStyle={{ height: hp(18) }}
            selectedValue={formData?.when || WhenToTake[0]}
            onValueChange={(itemValue, itemIndex) =>
              onHandleInputChange("when", itemValue)
            }
            // style={{ borderWidth: 1 }}
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
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>{formData?.startDate ?? "Start Date"}</Text>
          {/* {showStartDate && (
            <RNDateTimePicker
              value={formData?.startDate ?? new Date()}
              onChange={event => {
                console.log(event.nativeEvent.timestamp);
                setShowStartDate(false);
              }}
              minimumDate={new Date()}
            />
          )} */}
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>{formData?.endDate ?? "End Date"}</Text>
        </View>
      </View>
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
});
