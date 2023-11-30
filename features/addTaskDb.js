const addTaskDb = (db, inputData, setTasks, tasks) => {
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

export { addTaskDb };
