import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './screens/TaskList';
import CreateTask from './screens/CreateTask';
import EditTask from './screens/EditTask';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList" component={TaskList} options={{ title: 'Tarefas' }} />
        <Stack.Screen name="CreateTask" component={CreateTask} options={{ title: 'Criar Tarefa' }} />
        <Stack.Screen name="EditTask" component={EditTask} options={{ title: 'Editar Tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
