import React from "react"
import { StyleSheet, Text, View } from "react-native"

const TaskItem = ({data}) => {

    return(
        <View style={styles.container}>
            <Text>{data.name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})

export default TaskItem;