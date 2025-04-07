import { db } from "@/config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import uuid from "react-native-uuid";

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

    await setDoc(doc(db, "medication", docId), {
      ...data,
      docId,
    });
    return {
      success: true,
      message: "Data has been successfully saved.",
    };
  } catch (error) {
    throw error;
  }
};

export default medicationsFirebaseServices;
