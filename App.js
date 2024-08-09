import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text } from "react-native"
import Login from "./src/components/Login";

const App = () => {
  const [user,setUser] = useState(null);

  if(!user){
    return <Login />
  }

  return(
    <SafeAreaView style={styles.container}>
      <Text>TASK SCREEN</Text>
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#f2f6fc'
  }
})


export default App;