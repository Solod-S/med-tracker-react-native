import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { EmptyState } from "./EmptyState";
import { useRouter } from "expo-router";

export const MedicationList = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      setIsLoading(true);
      setMedList([]);

      const { data } = await medicationsFirebaseServices.fetchMedication(
        user,
        selectedDate
      );

      if (data) setMedList(data);
    } catch (error) {
      console.log(`error in setIsLoading:`, setIsLoading());
    } finally {
      setIsLoading(false);
    }
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
            onPress={() => {
              setSelectedDate(item.formattedDate);
              // getMedList(item.formattedDate);
            }}
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
      {medList?.length > 0 ? (
        <FlatList
          data={medList}
          onRefresh={() => getMedList()}
          refreshing={isLoading}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(modals)/actionModal",
                  params: { ...item, selectedDate },
                })
              }
            >
              <MedicationCardItem medicine={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <EmptyState />
      )}
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
