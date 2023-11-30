const deleteTaskDb = (db, id, setTasks, tasks) => {
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

export { deleteTaskDb };
