import { Header, MedicationList } from "@/components";
import Colors from "@/constants/Colors";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <FlatList
        data={[]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ padding: 25 }}>
            <Header />
            <MedicationList />
          </View>
        }
      />
    </SafeAreaView>
  );
}
