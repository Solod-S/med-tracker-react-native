import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AddNewMedForm, AddNewMedHeader } from "../../components";

const AddNewMedication = () => {
  return (
    <SafeAreaView style={{ marginTop: 16 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AddNewMedHeader />
        <AddNewMedForm />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewMedication;

const styles = StyleSheet.create({});
