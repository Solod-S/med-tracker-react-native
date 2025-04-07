import { BaseToast } from "react-native-toast-message";
import Colors from "@/constants/Colors";

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.PRIMARY,
        // borderLeftWidth: 5,
        // backgroundColor: "#F0F8FF",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 14,
        color: "#333",
      }}
    />
  ),
};
