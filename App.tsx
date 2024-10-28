import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface ITodo {
  id: number;
  name: string;
}

export default function App() {
  const [todo, setTodo] = useState("");
  const [listTodo, setListTodo] = useState<ITodo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null); // Trạng thái lưu id của mục đang chỉnh sửa

  const genIdNumber = () => {
    return Math.floor(Math.random() * 1000000000); // tạo số từ 0 đến 999999999
  };

  const handleAddTodo = () => {
    if (!todo) {
      alert("Vui lòng nhập dữ liệu");
      return;
    }
    if (editingId !== null) {
      // Nếu đang ở chế độ chỉnh sửa, gọi hàm cập nhật
      handleUpdateTodo();
    } else {
      // Thêm mới todo
      setListTodo([...listTodo, { id: genIdNumber(), name: todo }]);
      setTodo(""); // Xóa nội dung ô input
    }
  };

  const handleUpdateTodo = () => {
    if (editingId === null) return; // Kiểm tra nếu không có id nào đang chỉnh sửa

    // Cập nhật todo dựa trên id
    const updatedTodos = listTodo.map(item =>
      item.id === editingId ? { ...item, name: todo } : item
    );

    setListTodo(updatedTodos);
    setTodo("");
    setEditingId(null); // Xóa trạng thái chỉnh sửa sau khi cập nhật
  };

  const deleteTodo = (id: number) => {
    const newTodo = listTodo.filter(item => item.id !== id);
    setListTodo(newTodo);
  };

  const startEditing = (item: ITodo) => {
    setTodo(item.name); // Đưa nội dung của todo vào ô input
    setEditingId(item.id); // Lưu id của todo đang chỉnh sửa
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.heads}>Hello World</Text>

      {/* Form - Body */}
      <View>
        <TextInput
          value={todo}
          style={styles.todoInput}
          onChangeText={(value) => setTodo(value)}
        />
        <Button title={editingId ? "Update todo" : "Add todo"} onPress={handleAddTodo} />
      </View>

      {/* List Todo App */}
      <View>
        <Text>List Todo:</Text>
        <FlatList
          data={listTodo}
          keyExtractor={(item) => item.id + ""}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => startEditing(item)}
                style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
              >
                <Text style={styles.todoItem}>Kết quả: {item.name}</Text>
                <Button title="Delete todo" onPress={() => deleteTodo(item.id)} />
              </Pressable>
            );
          }}
        />
        <Text>Debug Info: {JSON.stringify(listTodo)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
  },

  heads: {
    padding: 20,
    backgroundColor: "pink",
    textAlign: "center",
    fontSize: 50,
  },

  todoInput: {
    borderBottomWidth: 1,
    borderBottomColor: "green",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 5,
  },

  todoItem: {
    fontSize: 20,
    borderWidth: 1,
    borderStyle: "solid",
    marginBottom: 20,
  },
});
