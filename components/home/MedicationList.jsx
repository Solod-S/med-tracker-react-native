import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import { getDateRangeToDisplay } from "@/service/convertDateTime";
import moment from "moment";
import useAuthStore from "@/store/useAuthStore";
import medicationsFirebaseServices from "@/service/medicationsFirebaseServices";
import { MedicationCardItem } from "./MedicationCardItem";

export const MedicationList = () => {
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
  const [medList, setMedList] = useState();
  const [dateRange, setDateRange] = useState();
  useEffect(() => {
    getDateRangeList();
  }, []);

  useEffect(() => {
    if (selectedDate && user?.userId) getMedList();
  }, [selectedDate, user]);

  const getDateRangeList = () => {
    const result = getDateRangeToDisplay();
    setDateRange(result);
  };

  const getMedList = async () => {
    setMedList([]);

    const { data } = await medicationsFirebaseServices.fetchMedication(
      user,
      selectedDate
    );

    if (data) setMedList(data);
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Image
        source={require("./../../assets/images/medication.png")}
        style={{ width: "100%", height: hp(30) }}
        resizeMode="contain"
      />
      <FlatList
        data={dateRange}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 15 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item.formattedDate)}
            style={[
              styles.dateGroup,
              {
                backgroundColor:
                  item?.formattedDate == selectedDate
                    ? Colors.PRIMARY
                    : Colors.LIGHT_GRAY_BORDER,
              },
            ]}
            key={index}
          >
            <Text
              style={[
                styles.day,
                {
                  color:
                    item?.formattedDate == selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.date,
                {
                  color:
                    item?.formattedDate == selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />
      <FlatList
        data={medList}
        renderItem={({ item, index }) => <MedicationCardItem medicine={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateGroup: {
    padding: 15,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
  },
  day: {
    fontSize: hp(2.2),
  },
  date: {
    fontSize: hp(3),
    fontWeight: "bold",
  },
});
