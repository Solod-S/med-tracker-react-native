import { EmptyState, Header } from "@/components";
import Colors from "@/constants/Colors";
import useAuthStore from "@/store/useAuthStore";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <View style={{ padding: 25 }}>
        <Header />
        <EmptyState />
      </View>
    </SafeAreaView>
  );
}
