import { HistoryList } from "@/components/history/HistoryList";
import Colors from "@/constants/Colors";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
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
        ListHeaderComponent={<HistoryList />}
      />
    </SafeAreaView>
  );
}
