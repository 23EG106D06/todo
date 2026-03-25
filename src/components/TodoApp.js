import React, { useEffect, useState } from "react";
import axios from "axios";

const API = https://todo-backend-quv3.onrender.com/api/todos

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const res = await axios.get(API);
        setTodos(res.data);
    };

    const addTodo = async () => {
        if (!title) return;

        await axios.post(API, {
            title,
            completed: false,
        });

        setTitle("");
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await axios.delete(`${API}/${id}`);
        fetchTodos();
    };

    const toggleComplete = async (todo) => {
        await axios.put(`${API}/${todo.id}`, {
            ...todo,
            completed: !todo.completed,
        });
        fetchTodos();
    };

    return (
        <div style={styles.container}>
            <h1>📝 To-Do List</h1>

            <div style={styles.inputBox}>
                <input
                    style={styles.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task..."
                />
                <button style={styles.addBtn} onClick={addTodo}>
                    Add
                </button>
            </div>

            <ul style={styles.list}>
                {todos.map((todo) => (
                    <li key={todo.id} style={styles.item}>
                        <span
                            onClick={() => toggleComplete(todo)}
                            style={{
                                ...styles.text,
                                textDecoration: todo.completed ? "line-through" : "none",
                            }}
                        >
                            {todo.title}
                        </span>

                        <button
                            style={styles.deleteBtn}
                            onClick={() => deleteTodo(todo.id)}
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        width: "400px",
        margin: "50px auto",
        textAlign: "center",
        fontFamily: "Arial",
    },
    inputBox: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
    },
    input: {
        padding: "10px",
        width: "70%",
    },
    addBtn: {
        padding: "10px",
        background: "green",
        color: "white",
        border: "none",
    },
    list: {
        listStyle: "none",
        padding: 0,
    },
    item: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        background: "#f4f4f4",
        marginBottom: "10px",
    },
    text: {
        cursor: "pointer",
    },
    deleteBtn: {
        background: "red",
        color: "white",
        border: "none",
    },
};

export default TodoApp;