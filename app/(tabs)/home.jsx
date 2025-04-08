import { EmptyState, Header, MedicationList } from "@/components";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

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
        {/* <EmptyState /> */}
        <MedicationList />
      </View>
    </SafeAreaView>
  );
}
