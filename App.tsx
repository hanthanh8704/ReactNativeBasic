import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [student, setStudent] = useState([
    {id : 1, name : "Hán Thanh 1", age : 20},
    {id : 2, name : "Hán Thanh 2", age : 21},
    {id : 3, name : "Hán Thanh 3", age : 22},
    {id : 4, name : "Hán Thanh 4", age : 23},
    {id : 5, name : "Hán Thanh 5", age : 24},
    {id : 6, name : "Hán Thanh 6", age : 25},
    {id : 7, name : "Hán Thanh 7", age : 26},
    {id : 8, name : "Hán Thanh 8", age : 27},
    {id : 9, name : "Hán Thanh 9", age : 28},
    {id : 10, name : "Hán Thanh 10", age : 29},
  ]);

  return (
    <View style={styles.container}>
      <Text style={{fontSize : 50}}>Hello Word</Text>
      <FlatList data={student}
      keyExtractor={data => data.id + ""}
      // Có thể sử dụng Object truyền thẳng {item} vào renderItem
        renderItem={(data) => {
          return (
            <View style={styles.heads1}>
              <Text>{data.item.name}</Text>
            </View>
          )
        }}

      />

      {/* <ScrollView>
        {student.map(item => {
          return (
            <View key={item.id} style={styles.heads1}>
              <Text>{item.name}</Text>
            </View>
          )
        })}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop : 100,
    paddingHorizontal : 50,
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },

  heads1 : {
    padding : 20,
    backgroundColor : "pink",
    marginBottom : 20
  }
});
