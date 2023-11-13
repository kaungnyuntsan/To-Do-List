import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
} from "react-native";

let id = 0;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputData, setInputData] = useState("");

  const addTask = (inputData) => {
    setTasks([...tasks, { id: id++, description: inputData }]);
    setInputData("");
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> To-do lists </Text>
      <TextInput
        style={styles.input}
        value={inputData}
        onChangeText={setInputData}
        onSubmitEditing={() => addTask(inputData)}
        autoFocus
      />
      <Button title="Add" onPress={() => addTask(inputData)} />
      <Button title="console tasks" onPress={() => console.log(tasks)} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}> {item.description} </Text>
            <Button title="delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 20,
    // borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    height: 50,
  },
  input: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    margin: 10,
  },
});

export default App;
