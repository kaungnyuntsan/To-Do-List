import React from "react";
import {
  FlatList,
  View,
  Text,
  Button,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";

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
          <ScrollView horizontal={true}>
            <Text
              style={[
                styles.text,
                styles.textFont,
                item.isDone ? styles.textstrike : null,
              ]}
            >
              {item.description}
            </Text>
          </ScrollView>
          <Button title="delete" onPress={() => deleteTask(item.id)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
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
