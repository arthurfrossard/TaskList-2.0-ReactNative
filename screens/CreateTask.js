import React from 'react';
import { View, StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';
import { createTask } from '../api';
import { useNavigation } from '@react-navigation/native';

export default function CreateTask() {
  const navigation = useNavigation();

  const handleSubmit = async (task) => {
    try {
      await createTask(task);
      navigation.navigate('TaskList');
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  return (
    <View style={styles.container}>
      <TaskForm onSubmit={handleSubmit} initialValues={{ title: '', description: '', step: 'Para fazer' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
