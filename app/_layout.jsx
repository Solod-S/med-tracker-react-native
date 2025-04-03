import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";

import { View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </View>
  );
}
