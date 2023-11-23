import React from "react";
import { FlatList, View, Text, Button, StyleSheet, Switch } from "react-native";

const Todolists = ({ tasks, toggleSwitch, deleteTask }) => {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <View style={styles.listContainer}>
          <Switch
            value={Boolean(item.isDone)}
            onValueChange={() => toggleSwitch(item.id, item.isDone)}
          />
          <Text
            style={[
              styles.text,
              styles.textFont,
              item.isDone ? styles.textstrike : null,
            ]}
          >
            {" "}
            {item.description}{" "}
          </Text>
          <Button title="delete" onPress={() => deleteTask(item.id)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    alignItems: "center",
  },
  text: {
    // borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    height: 50,
  },
  textFont: {
    fontSize: 20,
  },
  textstrike: {
    textDecorationLine: "line-through",
  },
});

export { Todolists };
