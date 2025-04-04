import { View, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.PRIMARY} />
    </View>
  );
}
