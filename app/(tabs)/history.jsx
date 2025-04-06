import { SafeAreaView, Text, View } from "react-native";

import Colors from "@/constants/Colors";

export default function History() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Text>History</Text>
    </SafeAreaView>
  );
}
