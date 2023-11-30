import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, Button } from "react-native";
import { Todolists } from "./features/Todolists";
import { Inputbox } from "./features/Inputbox";
import { Title } from "./features/Title";
import { Loading } from "./features/Loading";
import * as SQLite from "expo-sqlite";
import { addTaskDb } from "./features/addTaskDb";
import { deleteTaskDb } from "./features/deleteTaskDb";
import { switchTaskDb } from "./features/switchTaskDb";
import { createDb } from "./features/createDb";
import { queryDb } from "./features/queryDb";

const App = () => {
  const db = SQLite.openDatabase("todolist.db");
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // database create
    createDb(db);

    // query tasks from database
    queryDb(db, setTasks);

    // remove loading screen
    setIsLoading(false);
  }, []);

  // add task into database & UI state
  const addTask = (inputData) => {
    addTaskDb(db, inputData, setTasks, tasks);
  };

  // delete task into database & UI state
  const deleteTask = (id) => {
    deleteTaskDb(db, id, setTasks, tasks);
  };

  // update database & UI state
  const toggleSwitch = (id, isDone) => {
    switchTaskDb(db, id, isDone, setTasks, tasks);
  };

  // loading screen
  if (isLoading) return <Loading />;

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
