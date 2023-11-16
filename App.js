import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  Switch,
} from "react-native";

let id = 0;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputData, setInputData] = useState("");

  const addTask = (inputData) => {
    setTasks([...tasks, { id: id++, description: inputData, isDone: false }]);
    setInputData("");
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  // const toggleSwitch = (id) => {
  //   const currentTask = tasks.filter((task) => task.id === id)[0];
  //   currentTask.isDone = !currentTask.isDone;
  //   // console.log(currentTask);
  //   setTasks([...tasks, currentTask]);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> To-do lists </Text>
      <Text style={styles.font}> {`Total todo lists : ${tasks.length}`}</Text>
      <Text style={styles.font}>
        {" "}
        {`Remaining todo lists : ${tasks.length}`}
      </Text>

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
            <Switch
              value={item.isDone}
              onValueChange={() => toggleSwitch(item.id)}
            />
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
  font: {
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    margin: 10,
  },
});

export default App;
