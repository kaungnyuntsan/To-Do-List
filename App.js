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

  const toggleSwitch = (id) => {
    setTasks(
    tasks.map(task => {
      if(task.id === id) {
        return({
          ...task,
          isDone : !task.isDone
        })
      } else {
        return task
      }
    }))
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.summaryContainer}>
        <Text style={styles.title}> To-do lists </Text>
        <Text style={styles.textFont}> {`Total todo lists : ${tasks.length}`}</Text>
        <Text style={styles.textFont}>
          {" "}
          {`Remaining todo lists : ${tasks.filter(task => task.isDone !== true).length}`}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputData}
          onChangeText={setInputData}
          onSubmitEditing={() => addTask(inputData)}
          autoFocus
        />
        <Button title="Add" onPress={() => addTask(inputData)} />
        {/* <Button title="console tasks" onPress={() => console.log(tasks)} /> */}
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Switch
              value={item.isDone}
              onValueChange={() => toggleSwitch(item.id)}
            />
            <Text style={[styles.text,styles.textFont, item.isDone ? styles.textstrike : null]}> {item.description} </Text>
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
    margin : 10,
    // borderWidth: 1,

  },
  title :  {
    fontSize : 25
  },
  text: {
    // fontSize: 20,
    // borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    height: 50,
  },
  textstrike :  {
    textDecorationLine : 'line-through'
  },
  textFont: {
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    margin: 10,
  },
  listContainer : {
    flexDirection: "row",
    // borderWidth: 1,
    alignItems : 'center'
  },
  summaryContainer :{
    // borderWidth: 1,
    marginBottom : 10,
  } ,
  inputContainer :{
    // borderWidth: 1,
    marginBottom : 10,

  }
});

export default App;
