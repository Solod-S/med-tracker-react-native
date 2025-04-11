import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useEffect, useState } from "react";
import { getPrevDateRangeToDisplay } from "./../../service/convertDateTime";

import medicationsFirebaseServices from "./../../service/medicationsFirebaseServices";
import useAuthStore from "./../../store/useAuthStore";
import { MedicationCardItem } from "./../../components";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

export const HistoryList = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
  const [dateRange, setDateRange] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [medList, setMedList] = useState([]);
  useEffect(() => {
    if (selectedDate && user?.userId) getMedList();
  }, [selectedDate, user]);

  const getMedList = async () => {
    try {
      setIsLoading(true);
      setMedList([]);

      const response = await medicationsFirebaseServices.fetchMedication(
        user,
        selectedDate
      );

      if (response?.data) {
        setMedList(response.data);
      }
    } catch (error) {
      console.log(`error in setIsLoading:`, setIsLoading());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDateList();
  }, []);

  const getDateList = () => {
    const dates = getPrevDateRangeToDisplay();
    setDateRange(dates);
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>Medication History</Text>
      <Image
        style={styles.imageBanner}
        source={require("./../../assets/images/history.png")}
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
      {medList?.length > 0 && !isLoading ? (
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
              <MedicationCardItem medicine={item} selectedDate={selectedDate} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text
          style={{
            fontSize: hp(3),
            fontWeight: "bold",
            padding: 20,
            color: Colors.GRAY,
            textAlign: "center",
          }}
        >
          No Medication Found
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: "white",
  },
  imageBanner: {
    width: "100%",
    height: hp(30),
    resizeMode: "contain",
    borderRadius: 15,
  },
  header: {
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: "bold",
    // marginTop: 5,
  },
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
