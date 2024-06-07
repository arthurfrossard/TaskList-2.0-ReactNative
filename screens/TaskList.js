import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { getTasks, deleteTask, updateTaskStep } from '../api';
import Task from '../components/Task';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const handleUpdateStep = async (id, step) => {
    try {
      await updateTaskStep(id, step);
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task step', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const renderTask = ({ item }) => (
    <Task task={item} onDelete={handleDelete} onUpdateStep={handleUpdateStep} onEdit={() => navigation.navigate('EditTask', { id: item.id })} />
  );

  const tasksByStep = (step) => tasks.filter((task) => task.step === step);

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('CreateTask')} style={styles.createButton}>
        <Text style={styles.buttonText}>Criar Tarefa</Text>
      </Button>
      {['Para fazer', 'Em andamento', 'Pronto'].map((step) => (
        <View key={step} style={styles.taskList}>
          <Text style={styles.title}>{step}</Text>
          <FlatList data={tasksByStep(step)} renderItem={renderTask} keyExtractor={(item) => item.id.toString()} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  createButton: {
    marginBottom: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskList: {
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
