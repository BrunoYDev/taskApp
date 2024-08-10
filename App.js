import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Login from './src/components/Login';
import TaskItem from './src/components/TaskItem';

const App = () => {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');

  if (!user) {
    return <Login changeUser={user => setUser(user)} />;
  }

  let list = [
    {key: 1, name: 'buy coke'},
    {key: 2, name: 'run'},
    {key: 3, name: 'yes'}
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={newTask}
          onChangeText={text => setNewTask(text)}
        />
        <TouchableOpacity style={styles.addBtnArea}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
      data={list}
      keyExtractor={(item) => item.key}
      renderItem={({item}) => <TaskItem data={item}/>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#f2f6fc',
  },
  containerInput: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45,
  },
  addBtnArea: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 22,
  },
});

export default App;
