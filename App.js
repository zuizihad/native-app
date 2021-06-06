import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import shortid from "shortid";

// components
import TodoForm from "./src/components/todoForm";
import Todos from "./src/components/todos";

export default function App() {
  // a getter and setter for each type of state
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState("");

  useEffect(() => {
    const initialTodos = [
      { id: shortid.generate(), text: "Clean room" },
      { id: shortid.generate(), text: "Do the dishes" },
    ];
    setTodos(initialTodos);
  }, []);

  const createTodo = async () => {
    setTodos([...todos, { text, id: shortid.generate() }]);
    setText("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodo ? { id: currentTodo, text } : todo
      )
    );
    setText("");
    setEditing(false);
  };

  const editTodo = ({ id, text }) => {
    setEditing(true);
    setCurrentTodo(id);
    setText(text);
    this.textInput.focus();
  };

  return (
    <SafeAreaView>
      <TodoForm
        editing={editing}
        text={text}
        setText={setText}
        createTodo={createTodo}
        updateTodo={updateTodo}
      />
      <Todos todos={todos} editTodo={editTodo} deleteTodo={deleteTodo} />
    </SafeAreaView>
  );
}
