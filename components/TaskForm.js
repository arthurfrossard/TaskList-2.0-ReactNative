import React from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';

const stepSchema = yup
  .string()
  .matches(/Para fazer|Em andamento|Pronto/, 'Os passos devem ser "Para fazer", "Em andamento" ou "Pronto"');

const taskSchema = yup.object({
  title: yup
    .string()
    .required("É necessário informar o título")
    .min(4, "O título precisa ter pelo menos 4 caracteres")
    .max(64, "O título pode ter no máximo 64 caracteres"),
  description: yup
    .string()
    .required("É necessário informar a descrição")
    .min(8, "A descrição precisa ter pelo menos 8 caracteres")
    .max(128, "A descrição pode ter no máximo 128 caracteres"),
  step: stepSchema,
});

export default function TaskForm({ initialValues, onSubmit }) {
  return (
    <Formik
      enableReinitialize
      validationSchema={taskSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Título"
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
          <Picker
            selectedValue={values.step}
            onValueChange={(itemValue) => setFieldValue('step', itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Para fazer" value="Para fazer" />
            <Picker.Item label="Em andamento" value="Em andamento" />
            <Picker.Item label="Pronto" value="Pronto" />
          </Picker>
          {errors.step && <Text style={styles.errorText}>{errors.step}</Text>}
          <Button onPress={handleSubmit} title="Salvar Tarefa" />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
});
