import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Colors from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import {
  BackButton,
  Button,
  CustomKeyboardView,
  Loading,
} from "../../components";
import useAuthStore from "../../store/useAuthStore";
import Ionicons from "@expo/vector-icons/Ionicons";
const SignUp = () => {
  const { register } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [securePass, setSecurePass] = useState(true);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const fullNameRef = useRef("");

  const handleSignUp = async () => {
    try {
      if (!emailRef.current || !fullNameRef.current || !passwordRef.current) {
        Alert.alert("Error", "Please fill all the fields");
        return;
      }

      setIsLoading(true);
      await register(
        emailRef.current.trim(),
        passwordRef.current,
        fullNameRef.current
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const router = useRouter();
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, marginHorizontal: 16, marginTop: 10 }}
    >
      <CustomKeyboardView>
        <BackButton />
        <View>
          <Text style={styles.textHeader}>Create New Account</Text>
          <Text style={styles.subHeader}>Enjoy this app</Text>
          <View style={{ marginTop: 25 }}>
            <Text>Email</Text>
            <TextInput
              onChangeText={value => {
                emailRef.current = value;
              }}
              style={styles.textInput}
              placeholder="Email"
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <Text>Full Name</Text>
            <TextInput
              onChangeText={value => {
                fullNameRef.current = value;
              }}
              style={styles.textInput}
              placeholder="Full name"
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <Text>Password</Text>
            <View style={{ position: "relative", justifyContent: "center" }}>
              <TextInput
                onChangeText={value => {
                  passwordRef.current = value;
                }}
                secureTextEntry={securePass}
                style={styles.textInput}
                placeholder="Password"
              />
              <TouchableOpacity
                onPress={() => setSecurePass(prevState => !prevState)}
                style={{
                  position: "absolute",
                  right: 15,
                  top: "50%",
                  transform: [{ translateY: -12 }],
                }}
              >
                <Ionicons
                  name={securePass ? "eye" : "eye-off"}
                  size={24}
                  color={Colors.DARK_GRAY}
                />
              </TouchableOpacity>
            </View>
          </View>

          {isLoading ? (
            <View style={styles.button}>
              <Loading color={Colors.WHITE} size={hp(3)} />
            </View>
          ) : (
            <Button
              onPress={() => handleSignUp()}
              style={{ marginTop: 20 }}
              text={"Create Account"}
            />
          )}
          <Button
            onPress={() => router.replace("signIn")}
            style={{ marginTop: 20 }}
            backgroundColor={Colors.WHITE}
            color={Colors.PRIMARY}
            borderColor={Colors.PRIMARY}
            text={"Already account? Sign In"}
          />
        </View>
      </CustomKeyboardView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  textHeader: {
    fontSize: hp(3),
    fontWeight: "bold",
  },
  subHeader: {
    marginTop: 10,
    color: Colors.DARK_GRAY,
    fontSize: hp(3),
    fontWeight: "bold",
  },
  textInput: {
    padding: 10,
    marginTop: 5,
    fontSize: hp(1.7),
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  button: {
    marginTop: 35,
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
  },
  buttonCreate: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
  },
});
