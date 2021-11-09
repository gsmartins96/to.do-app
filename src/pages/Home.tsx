import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskReapted = tasks.find(task => task.title === newTaskTitle)

    if(taskReapted){
      return Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newTaskArray = tasks.map(task => ({ ...task }));
    const foundItem = newTaskArray.find(item => item.id === id);

    if(!foundItem) return;

    foundItem.done = !foundItem.done;
    setTasks(newTaskArray);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const newArrayTasks = tasks.filter(task => task.id !== id);
          setTasks(newArrayTasks);
        }
      }
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    const newTaskArray = tasks.map(task => ({ ...task }));
    const foundItem = newTaskArray.find(item => item.id === taskId);

    if(!foundItem) return;

    foundItem.title = taskNewTitle;
    setTasks(newTaskArray);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})