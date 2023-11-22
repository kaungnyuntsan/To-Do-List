import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = ({ tasks }) => {
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.title}> To-do lists </Text>
      <Text style={styles.textFont}>
        {" "}
        {`Total todo lists : ${tasks.length}`}
      </Text>
      <Text style={styles.textFont}>
        {" "}
        {`Remaining todo lists : ${
          tasks.filter((task) => Boolean(task.isDone) !== true).length
        }`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    // borderWidth: 1,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
  },
  textFont: {
    fontSize: 20,
  },
});

export { Title };
