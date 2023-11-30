const createDb = (db) => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS todolist (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, isDone INTEGER)"
    );
  });
};
export { createDb };
