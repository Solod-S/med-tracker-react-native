import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const showAlert = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log(`cancel logout`),
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => logout(),
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <Image
        source={{
          uri: "https://img.icons8.com/emoji/96/star-emoji.png", // звёздочка со смайлом
        }}
        style={styles.avatar}
      />

      {user?.displayName && (
        <Text style={styles.username}>{user?.displayName}</Text>
      )}
      <Text style={styles.email}>{user?.email}</Text>

      <View style={styles.menu}>
        <MenuItem
          onPress={() => router.push("/(modals)/addNewMedication")}
          icon={<Ionicons name="add-circle" size={24} color="white" />}
          text="Add New Medication"
        />
        <MenuItem
          onPress={() => router.push("/(tabs)/home")}
          icon={<MaterialIcons name="medication" size={24} color="white" />}
          text="My Medication"
        />
        <MenuItem
          onPress={() => router.push("/(tabs)/history")}
          icon={<Ionicons name="time-outline" size={24} color="white" />}
          text="History"
        />
        <MenuItem
          onPress={() => showAlert()}
          icon={<MaterialIcons name="logout" size={24} color="white" />}
          text="Logout"
        />
      </View>
    </SafeAreaView>
  );
}

const MenuItem = ({ icon, text, onPress = () => {} }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.iconContainer}>{icon}</View>
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 20,
  },
  menu: {
    width: "90%",
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f0ff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  iconContainer: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
