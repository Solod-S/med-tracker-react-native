import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import Colors from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, alignItems: "center", marginTop: 10 }}
    >
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/images/login.png")}
        />
      </View>
      <View
        style={{
          padding: 25,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          width: "100%",
          height: "100%",
          backgroundColor: Colors.PRIMARY,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: hp(3.5),
            fontWeight: "bold",
            color: Colors.WHITE,
          }}
        >
          Take Charge of Your Health!
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: hp(2),
            color: Colors.WHITE,
            marginTop: 20,
          }}
        >
          Keep track of your medications, stay in control, and feel confident
          about your health every day.
        </Text>
        <TouchableOpacity
          onPress={() => router.push("signIn")}
          style={styles.button}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: hp(2),
              fontWeight: "bold",
              color: Colors.PRIMARY,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.WHITE,
            fontSize: hp(1.5),
            marginTop: 8,
          }}
        >
          Note: By tapping "Continue", you agree to our Terms & Conditions.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: { width: wp(50), height: hp(50), borderRadius: 23 },
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    marginTop: 20,
  },
});
