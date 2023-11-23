import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const Inputbox = ({ addTask }) => {
  const [inputData, setInputData] = useState("");

  const submitData = (inputData) => {
    if (inputData) {
      addTask(inputData);
      setInputData("");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={inputData}
        onChangeText={setInputData}
        onSubmitEditing={() => submitData(inputData)}
      />
      <Button
        title="Add"
        onPress={() => submitData(inputData)}
        disabled={!inputData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // borderWidth: 1,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    margin: 10,
  },
});

export { Inputbox };
