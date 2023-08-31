import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FieldBase from './components/FieldBase';

export default function App() {
  return (
    <View style={styles.container}>
      <FieldBase
        label='My field'
        name='my-field'
      >
        <Text>Field input will be here</Text>
      </FieldBase>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
