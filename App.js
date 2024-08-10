import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Login from './src/components/Login';
import TaskItem from './src/components/TaskItem';
import firebase from './src/services/firebaseConnection';
import Feather from 'react-native-vector-icons/Feather';

const App = () => {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskKey, setTaskKey] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    const getUser = () => {
      if (!user) {
        return;
      }

      firebase
        .database()
        .ref('tasks')
        .child(user)
        .once('value', snapshot => {
          setTasks([]);

          snapshot?.forEach(childItem => {
            let data = {
              key: childItem.key,
              task: childItem.val().task,
            };
            setTasks(oldTasks => [...oldTasks, data]);
          });
        });
    };

    getUser();
  }, [user]);

  if (!user) {
    return <Login changeUser={user => setUser(user)} />;
  }

  const handleAdd = () => {
    if (newTask === '') {
      return;
    }

    if (taskKey !== '') {
      firebase
        .database()
        .ref('tasks')
        .child(user)
        .child(taskKey)
        .update({
          task: newTask,
        })
        .then(() => {
          const taskIndex = tasks.findIndex(item => item.key === taskKey);
          const tasksClone = tasks;
          tasksClone[taskIndex].task = newTask;

          setTasks([...tasksClone]);
        });

      Keyboard.dismiss();
      setNewTask('');
      setTaskKey('');
      return;
    }

    let taskList = firebase.database().ref('tasks').child(user);
    let key = taskList.push().key;

    taskList
      .child(key)
      .set({
        task: newTask,
      })
      .then(() => {
        const data = {
          key: key,
          task: newTask,
        };
        setTasks(oldTasks => [...oldTasks, data]);
      });

    Keyboard.dismiss();
    setNewTask('');
  };

  const handleDelete = key => {
    firebase
      .database()
      .ref('tasks')
      .child(user)
      .child(key)
      .remove()
      .then(() => {
        const findTasks = tasks.filter(task => task.key != key);
        setTasks(findTasks);
      });
  };

  const handleEdit = data => {
    setTaskKey(data.key);
    setNewTask(data.task);
    inputRef.current.focus();
  };

  const cancelEdit = () => {
    setTaskKey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.container}>

      {taskKey.length > 0 && (
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <TouchableOpacity onPress={cancelEdit}>
            <Feather name="x-circle" size={20} color="#ff0000" />
          </TouchableOpacity>
          <Text style={{marginLeft: 5, color: '#ff0000'}}>
            You're Editing An Task!!
          </Text>
        </View>
      )}

      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={newTask}
          onChangeText={text => setNewTask(text)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.addBtnArea} onPress={handleAdd}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <TaskItem
            data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
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
