import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Todolists } from "./features/Todolists";
import { Inputbox } from "./features/Inputbox";
import { Title } from "./features/Title";

let id = 0;

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (inputData) => {
    setTasks([...tasks, { id: id++, description: inputData, isDone: false }]);
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const toggleSwitch = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isDone: !task.isDone,
          };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title tasks={tasks} />
      <Inputbox addTask={addTask} />
      <Todolists
        tasks={tasks}
        toggleSwitch={toggleSwitch}
        deleteTask={deleteTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    // borderWidth: 1,
  },
});

export default App;
