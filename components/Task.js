import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, IconButton, Card, Paragraph } from 'react-native-paper';

const steps = ['Para fazer', 'Em andamento', 'Pronto'];

export default function Task({ task, onDelete, onUpdateStep, onEdit }) {
  const handleNextStep = () => {
    const currentStepIndex = steps.indexOf(task.step);
    if (currentStepIndex < steps.length - 1) {
      onUpdateStep(task.id, steps[currentStepIndex + 1]);
    }
  };

  const handlePrevStep = () => {
    const currentStepIndex = steps.indexOf(task.step);
    if (currentStepIndex > 0) {
      onUpdateStep(task.id, steps[currentStepIndex - 1]);
    }
  };

  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskDetails}>
        <Text style={styles.title}>{task.title}</Text>
        <Paragraph style={styles.description}>{task.description}</Paragraph>
      </View>
      <View style={styles.buttons}>
        <Button onPress={onEdit}>Editar</Button>
        <Button onPress={() => onDelete(task.id)} color="red">Deletar</Button>
        {task.step !== 'Para fazer' && <IconButton icon="arrow-up" onPress={handlePrevStep} />}
        {task.step !== 'Pronto' && <IconButton icon="arrow-down" onPress={handleNextStep} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  taskDetails: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
