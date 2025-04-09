import { Stack, useRouter, useSegments } from "expo-router";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/config/ToastConfig";

export default function RootLayout() {
  const { user, isAuthenticated, initAuthListener } = useAuthStore();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = initAuthListener();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    //  check if the user is authenticated or not
    if (typeof isAuthenticated == "undefined") return;
    // user in app group
    const inApp = segments[0] === "(tabs)";
    const inAuth = segments[0] === "(auth)";

    if (isAuthenticated && !inApp) {
      router.replace("/home");
    } else if (isAuthenticated === false && !inAuth) {
      router.replace("/welcome");
    }
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/addNewMedication"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="(modals)/actionModal"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack>
      <Toast config={toastConfig} />
    </View>
  );
}
