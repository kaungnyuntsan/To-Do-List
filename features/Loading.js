import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> Loading tasks... </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
  },
});

export { Loading };
