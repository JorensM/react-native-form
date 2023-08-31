import { View, StyleSheet, Pressable, Text } from 'react-native'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from './components/TextField';
import DropdownField from './components/DropdownField';
import SliderField from './components/SliderField';

type FormValues = {
  username: string,
  profession: 'developer' | 'cook' | 'writer',
  coolness: number
}

export default function App() {

  const initialValues: FormValues = {
    username: '',
    profession: 'developer',
    coolness: 50
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too short!')
      .max(16, 'Too long!')
      .required('Required'),
    profession: Yup.string()
      .oneOf(['developer', 'cook', 'writer'], 'Invalid value')
      .required('Required!'),
    coolness: Yup.number()
      .min(0, 'Value must be between 0 and 100')
      .max(100, 'Value must be between 0 and 100')
      .required('Required!')
  })

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={console.log}
        validationSchema={validationSchema}
      >
        {formik => (
          <Form
            style={styles.form}
          >
            <TextField
              label='username'
              name='username'
            />
            <DropdownField
              label='profession'
              name='profession'
              data={[
                {
                  label: 'Developer',
                  value: 'developer'
                },
                {
                  label: 'Cook',
                  value: 'cook'
                },
                {
                  label: 'Writer',
                  value: 'writer'
                }
              ]}
            />
            <SliderField
              label='How cool are you?'
              name='coolness'
            />
            <Pressable
              style={styles.submit_button}
              onPress={() => formik.submitForm()}
            >
              <Text>Submit</Text>
            </Pressable>
          </Form>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  submit_button: {
    borderWidth: 1,
    borderColor: 'blue',
    width: 104,
    alignItems: 'center',
    padding: 8
  }
});
