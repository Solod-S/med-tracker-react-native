import { db } from "@/config/FirebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { getDatesRange } from "./convertDateTime";

const medicationsFirebaseServices = {};

medicationsFirebaseServices.saveMedication = async data => {
  try {
    const { name, type, dose, startDate, endDate, reminder } = data;

    const docId = uuid.v4();

    const missingFields = [];

    if (!name) missingFields.push("Name");
    if (!type) missingFields.push("Type");
    if (!dose) missingFields.push("Dose");
    if (!startDate) missingFields.push("Start Date");
    if (!endDate) missingFields.push("End Date");
    if (!reminder) missingFields.push("Reminder");
    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Please fill in the following fields: ${missingFields.join(
          ", "
        )}`,
      };
    }
    const dates = getDatesRange(startDate, endDate);

    await setDoc(doc(db, "medication", docId), {
      ...data,
      docId,
      dates,
    });
    return {
      success: true,
      message: "Data has been successfully saved.",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

medicationsFirebaseServices.fetchMedication = async (user, selectedDate) => {
  try {
    const q = query(
      collection(db, "medication"),
      where("uid", "==", user?.userId),
      where("dates", "array-contains", selectedDate)
    );
    const queySnapshot = await getDocs(q);
    const data = [];
    queySnapshot.forEach(doc => {
      data.push(doc.data());
    });

    return {
      success: true,
      data,
      message: "Data has been successfully saved.",
    };
  } catch (error) {
    console.log(`error in fetchMedication:`, error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

export default medicationsFirebaseServices;
