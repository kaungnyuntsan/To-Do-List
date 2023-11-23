import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, Button } from "react-native";
import { Todolists } from "./features/Todolists";
import { Inputbox } from "./features/Inputbox";
import { Title } from "./features/Title";
import { Loading } from "./features/Loading";
import * as SQLite from "expo-sqlite";

const App = () => {
  const db = SQLite.openDatabase("todolist.db");
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS todolist (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, isDone INTEGER)"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todolist",
        null,
        (txObj, resultSet) => setTasks(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, []);

  const addTask = (inputData) => {
    const def_false = false;
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO todolist (description, isDone) VALUES (?,?) ",
        [inputData, def_false],
        (txObj, resultSet) => {
          setTasks([
            ...tasks,
            {
              id: resultSet.insertId,
              description: inputData,
              isDone: def_false,
            },
          ]);
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const deleteTask = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM todolist WHERE id = ?",
        [id],
        (txObj, resultSet) => {
          setTasks(tasks.filter((task) => task.id !== id));
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const toggleSwitch = (id, isDone) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE todolist SET isDone = ? WHERE id = ?",
        [!isDone, id],
        (txObj, resultSet) => {
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
        },
        (txObj, error) => console.log(error)
      );
    });
  };

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
