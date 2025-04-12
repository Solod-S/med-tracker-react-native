import { db } from "@/config/FirebaseConfig";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import uuid from "react-native-uuid";
import { getDatesRange } from "./convertDateTime";
import moment from "moment";

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

medicationsFirebaseServices.updateMedication = async data => {
  try {
    const { docId, name, type, dose, startDate, endDate, reminder, when } =
      data;

    if (!docId) {
      return {
        success: false,
        message: "docId is required to update the medication.",
      };
    }

    const missingFields = [];

    if (!name) missingFields.push("Name");
    if (!type) missingFields.push("Type");
    if (!dose) missingFields.push("Dose");
    if (!when) missingFields.push("When");
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

    const updatedData = {
      ...(name !== undefined && { name }),
      // ...(type !== undefined && { type }),
      ...(dose !== undefined && { dose }),
      ...(when !== undefined && { when }),
      // ...(startDate !== undefined && { startDate }),
      // ...(endDate !== undefined && { endDate }),
      ...(reminder !== undefined && { reminder }),
    };

    // if (startDate && endDate) {
    //   updatedData.dates = getDatesRange(startDate, endDate);
    // }

    const docRef = doc(db, "medication", docId);
    await updateDoc(docRef, updatedData);

    return {
      success: true,
      message: "Data has been successfully updated.",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

medicationsFirebaseServices.deleteMedication = async docId => {
  try {
    await deleteDoc(doc(db, "medication", docId));
    return {
      success: true,
      message: "Medication successfully deleted.",
    };
  } catch (error) {
    console.log("error in deleteMedication:", error.message);
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

// medicationsFirebaseServices.changeStatus = async (status, medicine) => {
//   try {
//     const docRef = doc(db, "medication", medicine?.docId);
//     await updateDoc(docRef, {
//       action: arrayUnion({
//         status,
//         time: moment().format("LT"),
//         date: medicine?.selectedDate,
//       }),
//     });

//     return {
//       success: true,
//       message: "Data has been successfully updated.",
//     };
//   } catch (error) {
//     console.log(`error in changeStatus:`, error.message);
//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };

medicationsFirebaseServices.changeStatus = async (status, medicine) => {
  try {
    const docRef = doc(db, "medication", medicine?.docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Document does not exist");
    }

    const data = docSnap.data();
    const currentActions = data.action || [];

    const newAction = {
      status,
      time: moment().format("LT"),
      date: medicine?.selectedDate,
    };

    // Удаляем старый объект с такой же датой, если он есть
    const updatedActions = currentActions.filter(
      a => a.date !== medicine?.selectedDate
    );

    updatedActions.push(newAction);

    await updateDoc(docRef, {
      action: updatedActions,
    });

    return {
      success: true,
      message: "Data has been successfully updated.",
    };
  } catch (error) {
    console.log(`error in changeStatus:`, error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

export default medicationsFirebaseServices;
