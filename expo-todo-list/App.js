import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { CheckBox } from '@rneui/themed';

// Main App component
export default function App() {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([
    { id: '1', description: 'Task 1', completed: false },
    { id: '2', description: 'Task 2', completed: true },
    { id: '3', description: 'Task 3', completed: false },
  ]);

  // State to store the new task input
  const [newTask, setNewTask] = useState('');

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() === '') return; // Don't add empty tasks
    const newTaskItem = {
      id: String(tasks.length + 1), // Generate a unique ID
      description: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskItem]); // Add the new task to the list
    setNewTask(''); // Clear the input
  };

  // Function to render each task in the list
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <CheckBox
          checked={item.completed}
          onPress={() => toggleTaskCompletion(item.id)}
        />
        <Text style={item.completed ? styles.completedText : styles.text}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Display the list of tasks */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.id}
      />

      {/* Input and button to add new tasks */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          onSubmitEditing={addTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#2F80E6',
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: "white",
  },
  completedText: {
    fontSize: 16,
    marginLeft: 10,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
});