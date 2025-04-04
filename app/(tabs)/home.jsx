import useAuthStore from "@/store/useAuthStore";
import { Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const { logout } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}
