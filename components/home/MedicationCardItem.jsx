import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export const MedicationCardItem = ({ medicine }) => {
  console.log(`medicine`, medicine);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: 60, height: 60 }}
            source={{ uri: medicine?.type?.icon }}
          />
        </View>
        <View>
          <Text>{medicine?.name}</Text>
          <Text>{medicine?.when}</Text>
          <Text>
            {medicine?.dose} {medicine?.type?.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  imageContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
