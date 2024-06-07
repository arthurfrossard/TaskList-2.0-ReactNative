import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';
import { editTask, getTasks } from '../api';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditTask() {
  const [task, setTask] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const tasks = await getTasks();
      const taskToEdit = tasks.find((task) => task.id === id);
      setTask(taskToEdit);
    } catch (error) {
      console.error('Failed to fetch task', error);
    }
  };

  const handleSubmit = async (updatedTask) => {
    try {
      await editTask(id, updatedTask);
      navigation.navigate('TaskList');
    } catch (error) {
      console.error('Failed to edit task', error);
    }
  };

  return (
    <View style={styles.container}>
      {task && <TaskForm initialValues={task} onSubmit={handleSubmit} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
