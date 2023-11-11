import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";

let id = 0;

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = () =>
    setTasks([...tasks, { id: id++, description: `task ${id}` }]);

  deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> To-do lists </Text>
      <Button title="Add Task" onPress={addTask} />
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
    fontSize: 30,
    // borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    height: 50,
  },
});

export default App;
