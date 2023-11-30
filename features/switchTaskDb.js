const switchTaskDb = (db, id, isDone, setTasks, tasks) => {
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

export { switchTaskDb };
