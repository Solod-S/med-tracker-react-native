import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HomeScreen</Text>
      <Redirect href={"login"} />
    </View>
  );
}
