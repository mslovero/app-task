import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import InputTask from './components/InputTask';


export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
   fetchData();
  }, []);
  
  async function fetchData () {
    const respose = await fetch("http://localhost:8080/todos/1");
    const data = await respose.json();
    setTodos(data);
  }
//funcion que aplica un filtro y nos pone todos los todo menos el q le estamos pasando
  function clearTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completada: todo.completada === 1 ? 0 : 1 }
          : todo
      )
    );
  }
  return (
    <GestureHandlerRootView style={styles.container}>
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}> 
        <FlatList
        data={todos}
        keyExtractor={(todo) => todo.id.toString()}
        // keyExtractor={(todo) => todo.id}
        renderItem={({ item }) =>
        //  <Text>{item.titulo}</Text>}
        <Task {...item} toggleTodo={toggleTodo} clearTodo={clearTodo}/>}
         ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
         contentContainerStyle={styles.contentContainerStyle}
          />
         <InputTask todos={todos} setTodos={setTodos} />

      </SafeAreaView>
      {/* <Text>{ JSON.stringify(todos)}</Text> */}
      <StatusBar style="auto" />
    </BottomSheetModalProvider>
        </GestureHandlerRootView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    backgroundColor: '#E9E9EF',
    
  },
  contentContainerStyle: {
    padding:15
  },

  title: {
    fontWeight:'800',
    fontSize:30,
    marginBottom:15
  }

});
