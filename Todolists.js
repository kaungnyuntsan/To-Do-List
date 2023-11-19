import React,{useState} from 'react'
import { FlatList, View, Text, Button, StyleSheet, Switch } from 'react-native'


const Todolists = ({data}) => {
    // const [tasks, setTasks] = useState(data);

    const toggleSwitch = (id) => {
        setTasks(
        tasks.map(task => {
          if(task.id === id) {
            return({
              ...task,
              isDone : !task.isDone
            })
          } else {
            return task
          }
        }))
      };

    const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));  

    return(
        <FlatList
        // data={tasks}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Switch
              value={item.isDone}
              onValueChange={() => toggleSwitch(item.id)}
            />
            <Text style={[styles.text,styles.textFont, item.isDone ? styles.textstrike : null]}> {item.description} </Text>
            <Button title="delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
        />
    )
   
}

const styles = StyleSheet.create({
    listContainer : {
        flexDirection: "row",
        // borderWidth: 1,
        alignItems : 'center'
      },
      text: {
        // fontSize: 20,
        // borderWidth: 1,
        padding: 10,
        marginLeft: 10,
        height: 50,
      },
      textFont: {
        fontSize: 20,
      },
      textstrike :  {
        textDecorationLine : 'line-through'
      },
})

export default  Todolists