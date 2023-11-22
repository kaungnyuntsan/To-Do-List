import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  ScrollView,
} from "react-native";
import { Todolists } from "./features/Todolists";
import { Inputbox } from "./features/Inputbox";
import { Title } from "./features/Title";
import * as SQLite from "expo-sqlite";

let id = 0;

const App = () => {
  const db = SQLite.openDatabase("todolist.db");
  const [tasks, setTasks] = useState([]);
  // const [dbtasks, setDbtasks] = useState([]);
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
        // (txObj, resultSet) => setDbtasks(resultSet.rows._array),
        (txObj, resultSet) => setTasks(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, []);

  // const selectdb = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "SELECT * FROM todolist",
  //       null,
  //       (txObj, resultSet) => console.log(resultSet.rows._array),
  //       (txObj, error) => console.log(error)
  //     );
  //   });
  // };

  // const insertdb = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "INSERT INTO todolist (description, isDone) VALUES (?,?) ",
  //       ["test2", false],
  //       (txObj, resultSet) => console.log(resultSet),
  //       (txObj, error) => console.log(error)
  //     );
  //   });
  // };

  // const updatedb = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "UPDATE todolist SET isDone = ? WHERE id = ?",
  //       [1, 2],
  //       (txObj, resultSet) => console.log(resultSet),
  //       (txObj, error) => console.log(error)
  //     );
  //   });
  // };

  // const deletedb = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "DELETE FROM todolist WHERE id = ?",
  //       [1],
  //       (txObj, resultSet) => console.log(resultSet),
  //       (txObj, error) => console.log(error)
  //     );
  //   });
  // };

  // const droptb = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "DROP TABLE todolist",
  //       null,
  //       (txObj, resultSet) => console.log(resultSet.rows._array),
  //       (txObj, error) => console.log(error)
  //     );
  //   });
  // };

  const addTask = (inputData) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO todolist (description, isDone) VALUES (?,?) ",
        [inputData, false],
        (txObj, resultSet) => {
          console.log(resultSet);
          setTasks([
            ...tasks,
            { id: resultSet.insertId, description: inputData, isDone: false },
          ]);
        },
        (txObj, error) => console.log(error)
      );
    });
    // setTasks([...tasks, { id: id++, description: inputData, isDone: false }]);
  };

  const deleteTask = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM todolist WHERE id = ?",
        [id],
        (txObj, resultSet) => {
          console.log(resultSet);
          setTasks(tasks.filter((task) => task.id !== id));
        },
        (txObj, error) => console.log(error)
      );
    });
    // setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleSwitch = (id, isDone) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE todolist SET isDone = ? WHERE id = ?",
        [!isDone, id],
        (txObj, resultSet) => {
          console.log(resultSet);
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

    // setTasks(
    //   tasks.map((task) => {
    //     if (task.id === id) {
    //       return {
    //         ...task,
    //         isDone: !task.isDone,
    //       };
    //     } else {
    //       return task;
    //     }
    //   })
    // );
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text
          style={{
            fontSize: 30,
          }}
        >
          {" "}
          Loading tasks...{" "}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title tasks={tasks} />
      <Inputbox addTask={addTask} />
      {/* <Button title="selectdb" onPress={selectdb} />
      <Button title="insertdb" onPress={insertdb} />
      <Button title="updatedb" onPress={updatedb} />
      <Button title="deletedb" onPress={deletedb} /> */}
      {/* <Button title="droptb" onPress={droptb} /> */}
      {/* <Button title="console dbtask" onPress={() => console.log(dbtasks)} /> */}
      {/* <Button title="console tasks" onPress={() => console.log(tasks)} /> */}
      {/* <ScrollView>
        {dbtasks.map((task) => (
          <Text key={task.id}>
            {" "}
            {task.description} {task.isDone}
          </Text>
        ))}
      </ScrollView> */}
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
