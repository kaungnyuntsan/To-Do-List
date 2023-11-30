const queryDb = (db, setTasks) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM todolist",
      null,
      (txObj, resultSet) => setTasks(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export { queryDb };
